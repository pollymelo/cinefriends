import express from 'express';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Middleware
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);
app.use(express.json());

// Conexão com MySQL
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', //
  database: 'cinefriends',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Registro
app.post('/api/auth/register', async (req, res) => {
  try {
    console.log('Body recebido:', req.body);

    const { nome, genero, data_nascimento, email, telefone, usuario, senha } =
      req.body;

    if (
      !nome ||
      !data_nascimento ||
      !email ||
      !telefone ||
      !usuario ||
      !senha
    ) {
      return res.status(400).json({ message: 'Campos obrigatórios faltando' });
    }

    // Verificar se email já existe
    const [emailRows] = await pool.query(
      'SELECT id FROM usuario WHERE email = ?',
      [email],
    );
    if (emailRows.length > 0) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    // Verificar se usuário já existe
    const [userRows] = await pool.query(
      'SELECT id FROM usuario WHERE usuario = ?',
      [usuario],
    );
    if (userRows.length > 0) {
      return res.status(400).json({ message: 'Nome de usuário já existe' });
    }

    // Hash da senha
    const hashedSenha = await bcrypt.hash(senha, 10);

    // Inserir usuário
    const [result] = await pool.query(
      `INSERT INTO usuario (nome, genero, data_nascimento, email, telefone, usuario, senha)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [nome, genero, data_nascimento, email, telefone, usuario, hashedSenha],
    );

    res.status(201).json({
      id: result.insertId,
      nome,
      genero,
      data_nascimento,
      email,
      telefone,
      usuario,
    });
  } catch (err) {
    console.error('Erro no registro:', err);
    // Envia a mensagem de erro para facilitar o debug no frontend
    res
      .status(500)
      .json({ message: 'Erro interno do servidor', error: err.message });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { usuario, senha } = req.body;

    if (!usuario || !senha) {
      return res
        .status(400)
        .json({ message: 'Usuário e senha são obrigatórios' });
    }

    const [rows] = await pool.query('SELECT * FROM usuario WHERE usuario = ?', [
      usuario,
    ]);

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Usuário ou senha inválidos' });
    }

    const user = rows[0];

    const senhaValida = await bcrypt.compare(senha, user.senha);

    if (!senhaValida) {
      return res.status(401).json({ message: 'Usuário ou senha inválidos' });
    }

    // Retornar dados do usuário (sem senha)
    const { senha: _, ...userSemSenha } = user;

    res.json(userSemSenha);
  } catch (err) {
    console.error('Erro no login:', err);
    res
      .status(500)
      .json({ message: 'Erro interno do servidor', error: err.message });
  }
});

// Atualizar telefone
app.put('/api/auth/update-phone', async (req, res) => {
  try {
    const { usuario, telefone } = req.body;

    if (!usuario || !telefone) {
      return res
        .status(400)
        .json({ message: 'Usuário e telefone são obrigatórios' });
    }

    // Atualiza telefone do usuário
    const [result] = await pool.query(
      'UPDATE usuario SET telefone = ? WHERE usuario = ?',
      [telefone, usuario],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json({ message: 'Telefone atualizado com sucesso' });
  } catch (err) {
    console.error('Erro ao atualizar telefone:', err);
    res
      .status(500)
      .json({ message: 'Erro interno do servidor', error: err.message });
  }
});
// Middleware de erro (último)
app.use((err, req, res, next) => {
  console.error('Erro capturado:', err.stack);
  res
    .status(500)
    .json({ message: 'Erro interno do servidor', error: err.message });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
