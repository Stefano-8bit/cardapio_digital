import { PrismaClient } from "@prisma/client"
import { Router } from "express"

const prisma = new PrismaClient()
const router = Router()

// Listar todos os produtos
router.get("/", async (req, res) => {
  try {
    const produtos = await prisma.produto.findMany({
      include: { categoria: true }
    })
    res.status(200).json(produtos)
  } catch (error) {
    res.status(400).json(error)
  }
})

// Detalhar um produto
router.get("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const produto = await prisma.produto.findUnique({
      where: { id: Number(id) },
      include: { categoria: true }
    })

    if (!produto) {
      res.status(404).json({ erro: "Produto não encontrado" })
    } else {
      res.status(200).json(produto)
    }
  } catch (error) {
    res.status(400).json(error)
  }
})

// Criar produto
router.post("/", async (req, res) => {
  const { nome, descricao, valor, foto, categoriaId } = req.body

  if (!nome || !valor || !categoriaId) {
    res.status(400).json({ erro: "Informe nome, valor e categoriaId" })
    return
  }

  try {
    const produto = await prisma.produto.create({
      data: { nome, descricao, valor, foto, categoriaId }
    })
    res.status(201).json(produto)
  } catch (error) {
    res.status(400).json(error)
  }
})

// Atualizar produto
router.put("/:id", async (req, res) => {
  const { id } = req.params
  const { nome, descricao, valor, foto, categoriaId } = req.body

  try {
    const produto = await prisma.produto.update({
      where: { id: Number(id) },
      data: { nome, descricao, valor, foto, categoriaId }
    })
    res.status(200).json(produto)
  } catch (error) {
    res.status(400).json(error)
  }
})

// Deletar produto
router.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {
    await prisma.produto.delete({ where: { id: Number(id) } })
    res.status(204).send()
  } catch (error) {
    res.status(400).json(error)
  }
})

export default router
