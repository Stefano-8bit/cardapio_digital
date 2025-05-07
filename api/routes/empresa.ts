import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const router = Router();

function validaSenha(senha: string) {
  const erros: string[] = [];
  if (senha.length < 8) {
    erros.push("Senha deve ter no mínimo 8 caracteres");
  }

  let min = 0, mai = 0, num = 0, simb = 0;
  for (const letra of senha) {
    if (/[a-z]/.test(letra)) min++;
    else if (/[A-Z]/.test(letra)) mai++;
    else if (/[0-9]/.test(letra)) num++;
    else simb++;
  }

  if (min == 0 || mai == 0 || num == 0 || simb == 0) {
    erros.push("Senha precisa de minúsculas, maiúsculas, números e símbolos");
  }

  return erros;
}

// Registro de empresa
router.post("/", async (req, res) => {
  const { nome, senha } = req.body;

  if (!nome || !senha) {
    res.status(400).json({ erro: "Informe nome e senha" });
    return;
  }

  const erros = validaSenha(senha);
  if (erros.length > 0) {
    res.status(400).json({ erro: erros.join("; ") });
    return;
  }

  const salt = bcrypt.genSaltSync(12);
  const hash = bcrypt.hashSync(senha, salt);

  try {
    const empresa = await prisma.empresa.create({
      data: { nome, senha: hash }
    });
    res.status(201).json({ id: empresa.id, nome: empresa.nome });
  } catch (error) {
    res.status(400).json(error);
  }
});

// Login da empresa
router.post("/login", async (req, res) => {
  const { nome, senha } = req.body;
  const erroPadrao = "Nome ou senha inválidos";

  if (!nome || !senha) {
    res.status(400).json({ erro: erroPadrao });
    return;
  }

  try {
    const empresa = await prisma.empresa.findFirst({ where: { nome } });
    if (!empresa || !bcrypt.compareSync(senha, empresa.senha)) {
      res.status(400).json({ erro: erroPadrao });
      return;
    }

    res.status(200).json({
      id: empresa.id,
      nome: empresa.nome
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

// Buscar empresa por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const empresa = await prisma.empresa.findUnique({
      where: { id: Number(id) }
    });

    if (!empresa) {
      res.status(404).json({ erro: "Empresa não encontrada" });
    } else {
      res.status(200).json({
        id: empresa.id,
        nome: empresa.nome
      });
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router;
