import { PrismaClient } from "@prisma/client"
import { Router } from "express"

const prisma = new PrismaClient()
const router = Router()

// Listar todas as categorias
router.get("/", async (req, res) => {
  try {
    const categorias = await prisma.categoria.findMany({
      include: { produtos: true }
    })
    res.status(200).json(categorias)
  } catch (error) {
    res.status(400).json(error)
  }
})

// Criar categoria
router.post("/", async (req, res) => {
  const { nome } = req.body

  if (!nome) {
    res.status(400).json({ erro: "Informe o nome da categoria" })
    return
  }

  try {
    const categoria = await prisma.categoria.create({
      data: { nome }
    })
    res.status(201).json(categoria)
  } catch (error) {
    res.status(400).json(error)
  }
})

// Atualizar categoria
router.put("/:id", async (req, res) => {
  const { id } = req.params
  const { nome } = req.body

  if (!nome) {
    res.status(400).json({ erro: "Nome obrigatório" })
    return
  }

  try {
    const categoria = await prisma.categoria.update({
      where: { id: Number(id) },
      data: { nome }
    })
    res.status(200).json(categoria)
  } catch (error) {
    res.status(400).json(error)
  }
})

// Deletar categoria
router.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {
    await prisma.categoria.delete({ where: { id: Number(id) } })
    res.status(204).send()
  } catch (error) {
    res.status(400).json(error)
  }
})

export default router
