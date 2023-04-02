const productModel = require('./models/product.model');

class ProductManager {
	getProducts = async () => {
		try {
			const products = await productModel.find({}).lean();
			console.log(products);
			return products;
		} catch (error) {
			console.log(error);
		}
	};
	getProduct = async id => {
		try {
			const product = await productModel.findById({ _id: id }).lean();
			return product;
		} catch (error) {
			console.log(error);
		}
	};
	addProduct = async product => {
		try {
			await productModel.create(product);
		} catch (error) {
			console.log(error);
		}
	};
	updateProduct = async (id, product) => {
		try {
			await productModel.findByIdAndUpdate(id, { ...product });
		} catch (error) {
			console.log(error);
		}
	};
	deleteProduct = async id => {
		try {
			await productModel.findByIdAndDelete(id);
		} catch (error) {
			console.log(error);
		}
	};
}

module.exports = ProductManager;
