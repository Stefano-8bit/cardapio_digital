import { PrismaClient } from "@prisma/client"
import { Router } from "express"
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()
const router = Router()

function validaSenha(senha: string) {
  const erros: string[] = []
  if (senha.length < 8) erros.push("Senha deve ter no mínimo 8 caracteres")

  let min = 0, mai = 0, num = 0, simb = 0
  for (const letra of senha) {
    if (/[a-z]/.test(letra)) min++
    else if (/[A-Z]/.test(letra)) mai++
    else if (/[0-9]/.test(letra)) num++
    else simb++
  }

  if (!min || !mai || !num || !simb) {
    erros.push("Senha precisa de minúsculas, maiúsculas, números e símbolos")
  }

  return erros
}

router.post("/", async (req, res) => {
  const { nome, cpf, senha } = req.body
  if (!nome || !cpf || !senha) return res.status(400).json({ erro: "Informe nome, cpf e senha" })

  try {
    const jaExiste = await prisma.usuario.findUnique({ where: { cpf } })
    if (jaExiste) return res.status(400).json({ erro: "CPF já cadastrado" })

    const erros = validaSenha(senha)
    if (erros.length > 0) return res.status(400).json({ erro: erros.join("; ") })

    const hash = bcrypt.hashSync(senha, 12)
    const usuario = await prisma.usuario.create({ data: { nome, cpf, senha: hash } })
    res.status(201).json({ id: usuario.id, nome: usuario.nome, cpf: usuario.cpf })
  } catch (error) {
    res.status(500).json({ erro: "Erro interno ao criar usuário" })
  }
})

router.post("/login", async (req, res) => {
  const { cpf, senha } = req.body
  if (!cpf || !senha) return res.status(400).json({ erro: "CPF ou senha inválidos" })

  try {
    const usuario = await prisma.usuario.findUnique({ where: { cpf } })
    if (!usuario || !bcrypt.compareSync(senha, usuario.senha)) {
      return res.status(400).json({ erro: "CPF ou senha inválidos" })
    }

    res.status(200).json({ id: usuario.id, nome: usuario.nome, cpf: usuario.cpf })
  } catch {
    res.status(500).json({ erro: "Erro interno ao autenticar" })
  }
})

export default router
