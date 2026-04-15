export default function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;
    
    // Simulate lead receiving logic
    console.log('--- Новая заявка (Vercel) ---');
    console.log(`Имя: ${name}`);
    console.log(`Email/Телефон: ${email}`);
    console.log(`Сообщение: ${message}`);

    return res.status(200).json({ 
      success: true, 
      message: 'Заявка успешно получена' 
    });
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
