const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const productSchema = new mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	category: { type: String, required: true },
	status: { type: Boolean, default: true },
	price: { type: Number, required: true },
	code: { type: Number, required: true },
	stock: { type: Number, required: true },
	thumbnails: []
});

productSchema.plugin(mongoosePaginate);
const productModel = mongoose.model('Product', productSchema);

module.exports = productModel;
