import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const prisma = new PrismaClient();
const router = Router();

// Criar múltiplos pedidos (cliente)
router.post("/", async (req, res) => {
  const { usuarioId, itens } = req.body;

  if (!usuarioId || !Array.isArray(itens) || itens.length === 0) {
    return res.status(400).json({ erro: "Informe usuarioId e itens do pedido" });
  }

  try {
    const pedidosCriados = await Promise.all(
      itens.map(async (item) => {
        return await prisma.pedido.create({
          data: {
            usuarioId,
            produtoId: item.produtoId,
            valor: item.valor,
            quantidade: item.quantidade,
            status: "PENDENTE",
          },
        });
      })
    );

    res.status(201).json(pedidosCriados);
  } catch (error) {
    res.status(400).json({ erro: "Erro ao criar pedidos", detalhes: error });
  }
});

// Listar todos os pedidos (painel/KDS)
router.get("/", async (req, res) => {
  try {
    const pedidos = await prisma.pedido.findMany({
      include: {
        usuario: true,
        produto: true,
      },
      orderBy: { horario: "desc" },
    });
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(400).json(error);
  }
});

// Atualizar status (KDS)
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const statusValido = ["PENDENTE", "CONFIRMADO", "PRONTO", "CANCELADO"];
  if (!statusValido.includes(status)) {
    res.status(400).json({ erro: "Status inválido" });
    return;
  }

  try {
    const pedido = await prisma.pedido.update({
      where: { id: Number(id) },
      data: { status },
    });
    res.status(200).json(pedido);
  } catch (error) {
    res.status(400).json(error);
  }
});

// Histórico por cliente
router.get("/usuario/:usuarioId", async (req, res) => {
  const { usuarioId } = req.params;

  try {
    const pedidos = await prisma.pedido.findMany({
      where: { usuarioId },
      include: { produto: true },
      orderBy: { horario: "desc" },
    });
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(400).json(error);
  }
});

// Buscar pedido por ID (cliente)
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const pedido = await prisma.pedido.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        status: true,
      },
    });

    if (!pedido) {
      return res.status(404).json({ erro: "Pedido não encontrado" });
    }

    res.status(200).json(pedido);
  } catch (error) {
    res.status(400).json({ erro: "Erro ao buscar pedido", detalhes: error });
  }
});

// Buscar status de um pedido por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const pedido = await prisma.pedido.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        status: true,
      },
    });

    if (!pedido) {
      return res.status(404).json({ erro: "Pedido não encontrado" });
    }

    res.status(200).json(pedido);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar pedido", detalhes: error });
  }
});

export default router;
