import { PrismaClient } from "@prisma/client"
import { Router } from "express"
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()
const router = Router()

function validaSenha(senha: string) {
  const erros: string[] = []
  if (senha.length < 8) {
    erros.push("Senha deve ter no mínimo 8 caracteres")
  }

  let min = 0, mai = 0, num = 0, simb = 0
  for (const letra of senha) {
    if (/[a-z]/.test(letra)) min++
    else if (/[A-Z]/.test(letra)) mai++
    else if (/[0-9]/.test(letra)) num++
    else simb++
  }

  if (min == 0 || mai == 0 || num == 0 || simb == 0) {
    erros.push("Senha precisa de minúsculas, maiúsculas, números e símbolos")
  }

  return erros
}

router.post("/", async (req, res) => {
  const { nome, cpf, senha } = req.body

  if (!nome || !cpf || !senha) {
    res.status(400).json({ erro: "Informe nome, cpf e senha" })
    return
  }

  const erros = validaSenha(senha)
  if (erros.length > 0) {
    res.status(400).json({ erro: erros.join("; ") })
    return
  }

  const salt = bcrypt.genSaltSync(12)
  const hash = bcrypt.hashSync(senha, salt)

  try {
    const usuario = await prisma.usuario.create({
      data: { nome, cpf, senha: hash }
    })
    res.status(201).json({ usuario })
  } catch (error) {
    res.status(400).json(error)
  }
})

router.post("/login", async (req, res) => {
  const { cpf, senha } = req.body
  const erroPadrao = "CPF ou senha inválidos"

  if (!cpf || !senha) {
    res.status(400).json({ erro: erroPadrao })
    return
  }

  try {
    const usuario = await prisma.usuario.findUnique({ where: { cpf } })
    if (!usuario || !bcrypt.compareSync(senha, usuario.senha)) {
      res.status(400).json({ erro: erroPadrao })
      return
    }

    // Aqui encapsula os dados dentro de `usuario`
    res.status(200).json({
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        cpf: usuario.cpf
      }
    })
  } catch (error) {
    res.status(400).json(error)
  }
})

router.get("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const usuario = await prisma.usuario.findUnique({
      where: { id }
    })

    if (!usuario) {
      res.status(404).json({ erro: "Usuário não encontrado" })
    } else {
      res.status(200).json({
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          cpf: usuario.cpf
        }
      })
    }
  } catch (error) {
    res.status(400).json(error)
  }
})

export default router
