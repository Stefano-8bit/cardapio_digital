import { PrismaClient, StatusPedido } from "@prisma/client"
import { Router } from "express"

const prisma = new PrismaClient()
const router = Router()

// Criar pedido (cliente)
router.post("/", async (req, res) => {
  const { usuarioId, produtoId, valor } = req.body

  if (!usuarioId || !produtoId || !valor) {
    res.status(400).json({ erro: "Informe usuarioId, produtoId e valor" })
    return
  }

  try {
    const pedido = await prisma.pedido.create({
      data: {
        usuarioId,
        produtoId,
        valor,
        status: "PENDENTE"
      }
    })
    res.status(201).json(pedido)
  } catch (error) {
    res.status(400).json(error)
  }
})

// Listar todos os pedidos (painel/KDS)
router.get("/", async (req, res) => {
  try {
    const pedidos = await prisma.pedido.findMany({
      include: {
        usuario: true,
        produto: true
      },
      orderBy: { horario: 'desc' }
    })
    res.status(200).json(pedidos)
  } catch (error) {
    res.status(400).json(error)
  }
})

// Atualizar status (KDS)
router.put("/:id", async (req, res) => {
  const { id } = req.params
  const { status } = req.body

  const statusValido = ["PENDENTE", "CONFIRMADO", "PRONTO", "CANCELADO"]
  if (!statusValido.includes(status)) {
    res.status(400).json({ erro: "Status inválido" })
    return
  }

  try {
    const pedido = await prisma.pedido.update({
      where: { id: Number(id) },
      data: { status }
    })
    res.status(200).json(pedido)
  } catch (error) {
    res.status(400).json(error)
  }
})

// Histórico por cliente
router.get("/usuario/:usuarioId", async (req, res) => {
  const { usuarioId } = req.params

  try {
    const pedidos = await prisma.pedido.findMany({
      where: { usuarioId },
      include: { produto: true },
      orderBy: { horario: 'desc' }
    })
    res.status(200).json(pedidos)
  } catch (error) {
    res.status(400).json(error)
  }
})

export default router
