const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config(); // <-- Importa e carrega as variáveis de ambiente do .env

// 1. Inicializa o PrismaClient
const prisma = new PrismaClient();

// 2. Inicializa o Express
const app = express();

// 3. Define a porta do servidor
const PORT = process.env.PORT || 3001; // Usando a porta 3001 para o backend como padrão

// --- Middleware ---
// Configuração do CORS para permitir requisições do seu frontend
app.use(
  cors({
    origin: 'http://localhost:5173/', // <- ESTE DEVE SER O SEU ENDEREÇO DO FRONTEND
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

// Middleware para parsear o corpo das requisições JSON
app.use(express.json());

// --- Authentication middleware ---
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  try {
    // process.env.JWT_SECRET deve estar definido no seu arquivo .env do backend
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user; // Adiciona os dados do usuário decodificados ao objeto de requisição
    next();
  } catch (err) {
    console.error('Erro na verificação do token:', err.message); // Log mais detalhado
    return res.status(403).json({ message: 'Token inválido ou expirado' });
  }
};

// --- Routes ---

// Rota de Registro de Usuário
app.post('/api/auth/register', async (req, res) => {
  try {
    // Extrai todos os campos necessários do corpo da requisição
    const { username, email, password, telefone, genero, datanascimento } =
      req.body;

    // Validação básica de entrada (pode ser expandida com bibliotecas como Joi ou Yup)
    if (
      !username ||
      !email ||
      !password ||
      !telefone ||
      !genero ||
      !datanascimento
    ) {
      return res
        .status(400)
        .json({ message: 'Todos os campos são obrigatórios.' });
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Usuário ou email já existe.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        telefone,
        genero, //
        datanascimento: new Date(datanascimento),
      },
    });

    res
      .status(201)
      .json({ success: true, message: 'Usuário criado com sucesso!' });
  } catch (error) {
    console.error('Erro ao registrar:', error);
    res.status(500).json({ message: 'Erro interno ao registrar usuário.' });
  }
});

// Rota de Login de Usuário
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET, // <-- Acessa a variável de ambiente
      { expiresIn: '24h' },
    );

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        telefone: user.telefone, // Inclua outros campos se quiser enviar para o frontend
        genero: user.genero,
        datanascimento: user.datanascimento,
      },
    });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ message: 'Erro interno ao fazer login.' });
  }
});

// Rota Protegida de Perfil do Usuário
app.get('/api/users/profile', authenticateToken, async (req, res) => {
  try {
    // req.user é definido pelo middleware authenticateToken
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: {
        id: true,
        username: true,
        email: true,
        telefone: true,
        genero: true,
        datanascimento: true,
        createdAt: true, // Data de criação do registro
        updatedAt: true, // Data da última atualização
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.json(user);
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    res
      .status(500)
      .json({ message: 'Erro interno ao buscar perfil do usuário.' });
  }
});

// Rota para Atualizar Perfil do Usuário (Exemplo)
app.put('/api/users/update', authenticateToken, async (req, res) => {
  try {
    const { username, email, telefone, genero, datanascimento } = req.body;
    const userId = req.user.userId; // ID do usuário do token

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        username: username || undefined, // Atualiza se fornecido, senão mantém o antigo
        email: email || undefined,
        telefone: telefone || undefined,
        genero: genero || undefined,
        datanascimento: datanascimento ? new Date(datanascimento) : undefined,
      },
      select: {
        id: true,
        username: true,
        email: true,
        telefone: true,
        genero: true,
        datanascimento: true,
      },
    });

    res.json({
      success: true,
      message: 'Perfil atualizado com sucesso!',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    res
      .status(500)
      .json({ message: 'Erro interno ao atualizar perfil do usuário.' });
  }
});

// --- Start server ---
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
