const express = require('express');
const router = express.Router();
const Livro = require('../models/livro');

// GET /api/livros 
router.get('/livros', async (req, res) => {
    try {
        const { search } = req.query;
        let filtro = {};

        if (search) {
            const regex = new RegExp(search, 'i');
            filtro = {
                $or: [
                    { titulo: regex },
                    { autor: regex }
                ]
            };
        }

        const livros = await Livro.find(filtro);
        res.json(livros);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

// POST /api/livros
router.post('/livros', async (req, res) => {
    try {
        // Cria o documento com base no objeto enviado: titulo, autor, paginas, genero
        const novoLivro = new Livro(req.body);
        const livroSalvo = await novoLivro.save();
        res.status(201).json(livroSalvo);
    } catch (err) {
        res.status(400).json({ erro: err.message });
    }
});

// PUT /api/livros/:id
router.put('/livros/:id', async (req, res) => {
    try {
        const livroAtualizado = await Livro.findByIdAndUpdate(
            req.params.id, 
            { lido: req.body.lido },
            { new: true } // Garante o retorno do objeto modificado
        );

        if (!livroAtualizado) {
            return res.status(404).json({ mensagem: "Livro não encontrado." });
        }
        res.json(livroAtualizado);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

// DELETE /api/livros/:id 
router.delete('/livros/:id', async (req, res) => {
    try {
        const livroEliminado = await Livro.findByIdAndDelete(req.params.id);

        if (!livroEliminado) {
            return res.status(404).json({ mensagem: "Livro não encontrado." });
        }
        res.json({ mensagem: "Livro removido com sucesso.", livro: livroEliminado });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

module.exports = router;
