const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 19020; 

app.use(cors());
app.use(express.json());

// Ligação à Base de Dados
const mongoUrl = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/readinglist';
mongoose.connect(mongoUrl)
    .then(() => console.log('Ligação ao MongoDB (Livros) bem sucedida!'))
    .catch(err => console.error('Erro ao ligar ao MongoDB:', err));

// Importação e registo das rotas 
const livrosRouter = require('./routes/livros');
app.use('/api', livrosRouter);

app.listen(PORT, () => {
    console.log(`API da Lista de Leituras a correr na porta ${PORT}`);
});