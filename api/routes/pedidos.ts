import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const prisma = new PrismaClient();
const router = Router();

// Criar múltiplos pedidos (cliente)
router.post("/", async (req, res) => {
  const { usuarioId, itens } = req.body;

  console.log("➡️ POST /pedidos - Body recebido:", req.body);

  if (!usuarioId || !Array.isArray(itens) || itens.length === 0) {
    console.log("❌ Dados inválidos");
    return res.status(400).json({ erro: "Informe usuarioId e itens do pedido" });
  }

  try {
    const pedidosExistentes = await prisma.pedido.findMany({
      where: {
        usuarioId,
        NOT: {
          status: {
            in: ["PRONTO", "CANCELADO", "RETIRADO"],
          },
        },
      },
    });

    if (pedidosExistentes.length > 0) {
      console.log("⚠️ Pedido já em andamento:", pedidosExistentes);
      return res.status(400).json({ erro: "Você já possui um pedido em andamento" });
    }

    const pedidosCriados = await Promise.all(
      itens.map((item) => {
        console.log("🛒 Criando pedido para item:", item);
        return prisma.pedido.create({
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

    console.log("✅ Pedidos criados:", pedidosCriados);
    res.status(201).json(pedidosCriados);
  } catch (error) {
    console.error("❌ Erro ao criar pedidos:", error);
    res.status(400).json({ erro: "Erro ao criar pedidos", detalhes: error });
  }
});

// Listar todos os pedidos (KDS)
router.get("/", async (req, res) => {
  console.log("➡️ GET /pedidos");

  try {
    const pedidos = await prisma.pedido.findMany({
      include: {
        usuario: true,
        produto: true,
      },
      orderBy: { horario: "desc" },
    });

    console.log("📦 Lista de pedidos:", pedidos.length);
    res.status(200).json(pedidos);
  } catch (error) {
    console.error("❌ Erro ao listar pedidos:", error);
    res.status(400).json(error);
  }
});

// Atualizar status (KDS e Cliente)
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  console.log(`➡️ PUT /pedidos/${id} - Novo status:`, status);

  const statusValido = ["PENDENTE", "CONFIRMADO", "PRONTO", "CANCELADO", "RETIRADO"];
  if (!statusValido.includes(status)) {
    console.log("❌ Status inválido:", status);
    return res.status(400).json({ erro: "Status inválido" });
  }

  try {
    const pedido = await prisma.pedido.update({
      where: { id: Number(id) },
      data: { status },
    });

    console.log("✅ Pedido atualizado:", pedido);
    res.status(200).json(pedido);
  } catch (error) {
    console.error("❌ Erro ao atualizar status:", error);
    res.status(400).json(error);
  }
});

// Histórico por cliente
router.get("/usuario/:usuarioId", async (req, res) => {
  const { usuarioId } = req.params;
  console.log(`➡️ GET /pedidos/usuario/${usuarioId}`);

  try {
    const pedidos = await prisma.pedido.findMany({
      where: { usuarioId },
      include: { produto: true },
      orderBy: { horario: "desc" },
    });

    console.log("📦 Pedidos do usuário:", pedidos.length);
    res.status(200).json(pedidos);
  } catch (error) {
    console.error("❌ Erro ao buscar histórico:", error);
    res.status(400).json(error);
  }
});

// Buscar status de um pedido por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(`➡️ GET /pedidos/${id}`);

  try {
    const pedido = await prisma.pedido.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        status: true,
      },
    });

    if (!pedido) {
      console.log("❌ Pedido não encontrado:", id);
      return res.status(404).json({ erro: "Pedido não encontrado" });
    }

    console.log("✅ Pedido encontrado:", pedido);
    res.status(200).json(pedido);
  } catch (error) {
    console.error("❌ Erro ao buscar pedido:", error);
    res.status(400).json({ erro: "Erro ao buscar pedido", detalhes: error });
  }
});

export default router;
