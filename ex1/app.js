const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const PORT = 17000;

app.use(cors());
app.use(express.json());

// Swagger 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Ligação ao MongoDB
const mongoUrl = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/jogostabuleiro';
mongoose.connect(mongoUrl)
    .then(() => console.log('Ligação ao MongoDB bem sucedida!'))
    .catch(err => console.error('Erro de ligação ao MongoDB:', err));

// Rotas
const jogosRouter = require('./routes/jogos');
app.use('/', jogosRouter);

app.listen(PORT, () => {
    console.log(`API a correr na porta ${PORT}`);
    console.log(`Swagger disponível em http://localhost:${PORT}/api-docs`);
});