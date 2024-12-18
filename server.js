const express = require('express');
const { initializeDatabase, getAllHouses } = require('./database');
const { spawn } = require('child_process');

const app = express();
const port = 3000;

app.use(express.json());

function predictPrice(data) {
    return new Promise((resolve, reject) => {
        const python = spawn('python', ['predict.py', JSON.stringify(data)]);
        let result = '';

        python.stdout.on('data', (data) => {
            result += data.toString();
        });

        python.stderr.on('data', (data) => {
            console.error(`Error: ${data}`);
        });

        python.on('close', (code) => {
            if (code !== 0) {
                reject('Erro ao executar a previsão');
                return;
            }
            try {
                resolve(JSON.parse(result));
            } catch (e) {
                reject('Erro ao processar resultado');
            }
        });
    });
}

async function startServer() {
    try {
        await initializeDatabase();
        console.log('Banco de dados inicializado com sucesso');

        // Rota para obter todos os dados
        app.get('/houses', async (req, res) => {
            try {
                const houses = await getAllHouses();
                res.json(houses);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        // Rota para previsão
        app.post('/predict', async (req, res) => {
            try {
                const prediction = await predictPrice(req.body);
                res.json(prediction);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        app.listen(port, () => {
            console.log(`Servidor rodando na porta ${port}`);
        });
    } catch (error) {
        console.error('Erro ao inicializar:', error);
    }
}

startServer();