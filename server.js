const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './')));

// Contact API
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    
    console.log('--- Новая заявка ---');
    console.log(`Имя: ${name}`);
    console.log(`Email/Телефон: ${email}`);
    console.log(`Сообщение: ${message}`);
    console.log('--------------------');

    // Here you would typically send an email via Nodemailer
    // For now, we simulate success
    res.status(200).json({ success: true, message: 'Заявка получена' });
});

// Fallback to index.html for any layout requests
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
    console.log('Для остановки нажмите Ctrl + C');
});
