const router = require('express').Router();
const MessageManager = require('../dao/chatManager.mongo');

const chatManager = new MessageManager();

router.post('/', async (req, res) => {
	const { user, message } = req.body;
	await chatManager.addMessage(user, message);
	res.status(200).json({ message: 'Message sent' });
});

router.get('/', async (req, res) => {
	const messages = await chatManager.getMessages();
	res.render('chat', { messages });
});

module.exports = router;
