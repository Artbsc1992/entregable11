const userModel = require('../dao/models/user.model');
const isLogged = require('../middleware/auth');
const { createHash, isValidPassword } = require('../utils/utils');

const router = require('express').Router();

router.get('/register', (req, res) => {
	res.render('register');
});

router.post('/register', async (req, res) => {
	const { username, email, password, role } = req.body;
	const userExists = await userModel.findOne({ email });
	if (userExists) return res.status(409).json({ msg: 'Email already registered' });
	await userModel.create({ username, email, role, password: createHash(password) });
	res.redirect('/login');
});

router.get('/login', (req, res) => {
	if (req.session?.user) return res.redirect('/api/products');
	res.render('login');
});

router.post('/login', async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) return res.status(400).json({ msg: '[!] All field are required' });
	const userFound = await userModel.findOne({ email }).lean();
	if (!userFound) return res.status(404).json({ msg: 'Usuario no encontrado' });
	if (!isValidPassword(userFound, password))
		return res.status(409).json({ msg: 'Contraseña inválida' });
	delete userFound.password;
	req.session.user = userFound;
	res.redirect('/api/products');
});

router.get('/logout', (req, res) => {
	req.session.destroy(err => {
		if (!err) res.status(200).redirect('/login');
	});
});

module.exports = router;
