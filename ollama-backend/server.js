const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.json());

const OLLAMA_API = 'http://127.0.0.1:11434/api/generate';

app.post('/api/chat', async (req, res) => {
    console.log('Поступил запрос:', req.body.prompt);
    try {
        const response = await axios.post(OLLAMA_API, {
            model: 'tinydolphin',
            prompt: req.body.prompt,
            stream: false,
        });
        res.json({ text: response.data.response });
    } catch (error) {
        console.error('Ошибка Ollama:', error.message);
        res.status(500).json({ error: 'Ollama не отвечает' });
    }
});

const PORT = 5001; 

app.listen(PORT, () => {
    console.log(`✅ Сервер ОЖИЛ на http://localhost:${PORT}`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`❌ ОШИБКА: Порт ${PORT} занят другим приложением!`);
    } else {
        console.error('❌ Произошла ошибка при запуске:', err);
    }
});