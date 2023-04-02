const fs = require('fs');

class ProductManager {
	constructor(path) {
		this.path = path;
		this.products = [];
	}
	addProduct = async product => {
		try {
			this.products = await this.getProducts();
			const id =
				this.products.length === 0 ? 1 : this.products[this.products.length - 1].id + 1;
			this.products.push({ id, ...product });
			return await fs.promises.writeFile(this.path, JSON.stringify(this.products));
		} catch (error) {
			fs.writeFileSync(this.path, JSON.stringify(this.products));
			return error;
		}
	};
	getProducts = async () => {
		try {
			return JSON.parse(await fs.promises.readFile(this.path, 'utf-8'));
		} catch (error) {
			if (error.errno === -4058) fs.writeFileSync(this.path, JSON.stringify(this.products));
			return this.products;
		}
	};
	getProductById = async id => {
		try {
			this.products = await this.getProducts();
			return this.products.find(product => product.id === Number(id));
		} catch (error) {
			return error;
		}
	};
	updateProduct = async (id, data) => {
		try {
			this.products = await this.getProducts();
			let prodToUpd = this.products.find(prod => prod.id === id);
			if (!prodToUpd) return 'Product not found';
			let prodIndex = this.products.findIndex(prod => prod.id === id);
			this.products[prodIndex] = { ...prodToUpd, ...data };
			await fs.promises.writeFile(this.path, JSON.stringify(this.products));
			return 'Product updated successfully';
		} catch (error) {
			return error;
		}
	};
	deleteProduct = async id => {
		try {
			this.products = await this.getProducts();
			this.products = this.products.filter(prod => prod.id !== Number(id));
			await fs.promises.writeFile(this.path, JSON.stringify(this.products));
		} catch (error) {
			return error;
		}
	};
}

module.exports = ProductManager;
