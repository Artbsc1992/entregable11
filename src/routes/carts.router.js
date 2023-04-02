const router = require('express').Router();
const CartManager = require('../dao/cartManager.mongo');

const cartManager = new CartManager();

router.post('/', async (req, res) => {
	await cartManager.addCart();
	res.status(200).json({ message: 'Cart added successfully' });
});

router.get('/:cid', async (req, res) => {
	const cart = await cartManager.getProdsByCartId(req.params.cid);
	res.status(200).render('cart', { cart });
});

router.post('/:cid/product/:pid', async (req, res) => {
	await cartManager.addProdToCart(req.params.cid, req.params.pid);
	res.status(200).json({ message: 'Product added successfully' });
});

router.delete('/:cid/products/:pid', async (req, res) => {
	await cartManager.delProdFromCart(req.params.cid, req.params.pid);
	res.status(200).json({ message: 'Product removed successfully' });
});

router.put('/:cid', async (req, res) => {
	// NO ENTIENDO LO QUE SE PIDE EN EL DESAFÍO: "deberá actualizar el carrito con un arreglo de productos con el formato especificado arriba."
	// CUAL SERÍA EL FORMATO? Y SI EL FORMATO ES EL QUE SE INDICA EN EL MÉTODO GET NO TIENE SENTIDO YA QUE NO CONCUERDAN LAS PROPIEDADES DEL OBJETO CON LAS PROPIEDADES QUE DEBERÍA TENER UN CARRITO
});

router.put('/:cid/products/:pid', async (req, res) => {
	await cartManager.updateQuantity(req.params.cid, req.params.pid, req.body.quantity);
	res.status(200).json({ message: 'Quantity updated successfully' });
});

router.delete('/:cid', async (req, res) => {
	await cartManager.delProds(req.params.cid);
	res.status(200).json({ message: 'Cart empty' });
});

module.exports = router;
