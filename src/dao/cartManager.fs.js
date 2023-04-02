const fs = require('fs');
const ProductManager = require('./productManager.fs');

const productManager = new ProductManager('src/db/products.json');

class CartManager {
	constructor(path) {
		this.path = path;
		this.carts = [];
	}
	addCart = async () => {
		try {
			this.carts = await this.getCarts();
			const id = this.carts.length === 0 ? 1 : this.carts[this.carts.length - 1].id + 1;
			this.carts.push({ id, products: [] });
			return await fs.promises.writeFile(this.path, JSON.stringify(this.carts));
		} catch (error) {
			fs.writeFileSync(this.path, JSON.stringify(this.carts));
			return error;
		}
	};
	getCarts = async () => {
		try {
			return JSON.parse(await fs.promises.readFile(this.path, 'utf-8'));
		} catch (error) {
			if (error.errno === -4058) fs.writeFileSync(this.path, JSON.stringify(this.products));
			return this.products;
		}
	};
	getProdsByCartId = async id => {
		try {
			this.carts = await this.getCarts();
			return this.carts.find(cart => cart.id === id).products;
		} catch (error) {
			return error;
		}
	};
	addProdToCart = async (cid, pid) => {
		const prod = await productManager.getProductById(pid);
		const cart = await this.getProdsByCartId(cid);
		if (cart.some(item => item.product === prod.id)) {
			const index = cart.findIndex(item => item.product === prod.id);
			cart[index].quantity++;
		} else {
			cart.push({ product: prod.id, quantity: 1 });
		}
		return await fs.promises.writeFile(this.path, JSON.stringify(this.carts));
	};
}

module.exports = CartManager;
