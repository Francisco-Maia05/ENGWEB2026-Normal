const express = require('express');
const router = express.Router();
const Jogo = require('../models/jogo');

// GET /jogos + GET /jogos?editora=EEEE
router.get('/jogos', async (req, res) => {
    try {
        const { editora } = req.query;

        if (editora) {
            const jogosEditora = await Jogo.find(
                { "editoras.name": editora }, 
                'id name year'
            );
            return res.json(jogosEditora);
        }
        const todosJogos = await Jogo.find({}, 'id name year category minPlayers');
        res.json(todosJogos);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

// GET /jogos/:id
router.get('/jogos/:id', async (req, res) => {
    try {
        const jogo = await Jogo.findOne({ id: req.params.id });
        
        if (!jogo) {
            return res.status(404).json({ mensagem: "Jogo não encontrado." });
        }

        res.json(jogo);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

// GET /autores 
router.get('/autores', async (req, res) => {
    try {
        const autores = await Jogo.aggregate([
            { $unwind: "$autores" }, 
            { $group: {
                _id: "$autores.name", 
                jogos: { $push: { id: "$id", nome: "$name" } } 
            }},
            { $project: { _id: 0, nome: "$_id", jogos: 1 } }, 
            { $sort: { nome: 1 } }
        ]);
        res.json(autores);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

// GET /categorias 
router.get('/categorias', async (req, res) => {
    try {
        const categorias = await Jogo.aggregate([
            { $group: {
                _id: "$category", 
                jogos: { $push: { id: "$id", nome: "$name" } }
            }},
            { $project: { _id: 0, categoria: "$_id", jogos: 1 } }, 
            { $sort: { categoria: 1 } }
        ]);
        res.json(categorias);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

// POST /jogos
router.post('/jogos', async (req, res) => {
    try {
        const novoJogo = new Jogo(req.body);
        const resultado = await novoJogo.save();
        res.status(201).json(resultado);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

// PUT /jogos/:id
router.put('/jogos/:id', async (req, res) => {
    try {
        const jogoAtualizado = await Jogo.findOneAndUpdate(
            { id: req.params.id }, 
            req.body,
            { new: true }
        );
        
        if (!jogoAtualizado) {
            return res.status(404).json({ mensagem: "Jogo não encontrado para atualização." });
        }
        res.json(jogoAtualizado);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

// DELETE /jogos/:id
router.delete('/jogos/:id', async (req, res) => {
    try {
        const jogoRemovido = await Jogo.findOneAndDelete({ id: req.params.id });
        
        if (!jogoRemovido) {
            return res.status(404).json({ mensagem: "Jogo não encontrado para remoção." });
        }
        res.json({ mensagem: "Jogo eliminado com sucesso.", jogo: jogoRemovido });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

module.exports = router;
