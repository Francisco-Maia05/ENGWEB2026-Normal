const mongoose = require('mongoose');

const jogoSchema = new mongoose.Schema({
    id: String,
    name: String,
    year: Number,
    category: String,
    minPlayers: Number,
    maxPlayers: Number,
    playingTimeMinutes: Number,
    descriptionEN: String,
    autores: [{ id: String, name: String }],
    editoras: [{ id: String, name: String, country: String }],
    mecanicas: [{ id: String, name: String }],
    premios: [{ id: String, name: String, year: Number }]
}, { versionKey: false, collection: 'jogos' });

module.exports = mongoose.model('jogo', jogoSchema);
