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
  const { nome, senha } = req.body
  if (!nome || !senha) return res.status(400).json({ erro: "Informe nome e senha" })

  try {
    const jaExiste = await prisma.empresa.findFirst({ where: { nome } })
    if (jaExiste) return res.status(400).json({ erro: "Empresa já cadastrada" })

    const erros = validaSenha(senha)
    if (erros.length > 0) return res.status(400).json({ erro: erros.join("; ") })

    const hash = bcrypt.hashSync(senha, 12)
    const empresa = await prisma.empresa.create({ data: { nome, senha: hash } })
    res.status(201).json({ id: empresa.id, nome: empresa.nome })
  } catch {
    res.status(500).json({ erro: "Erro interno ao cadastrar empresa" })
  }
})

router.post("/login", async (req, res) => {
  const { nome, senha } = req.body
  if (!nome || !senha) return res.status(400).json({ erro: "Nome ou senha inválidos" })

  try {
    const empresa = await prisma.empresa.findFirst({ where: { nome } })
    if (!empresa || !bcrypt.compareSync(senha, empresa.senha)) {
      return res.status(400).json({ erro: "Nome ou senha inválidos" })
    }

    res.status(200).json({ id: empresa.id, nome: empresa.nome })
  } catch {
    res.status(500).json({ erro: "Erro interno ao autenticar empresa" })
  }
})

export default router
