const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
	products: {
		type: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Product'
				},
				quantity: { type: Number, required: true, default: 0 }
			}
		],
		default: []
	}
});

const cartModel = mongoose.model('Cart', cartSchema);

module.exports = cartModel;
