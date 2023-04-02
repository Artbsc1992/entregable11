const mongoose = require('mongoose');

const validateEmail = (email) => {
	const re = /\S+@\S+\.\S+/;
	return re.test(email);
};

const messageSchema = new mongoose.Schema({
	user: {
		type: String,
		required: 'Email is required',
		lowercase: true,
		trim: true,
		validate: [validateEmail, 'Please fill a valid email address'],
		match: [/\S+@\S+\.\S+/, 'is invalid']
	},
	message: String
});

const messageModel = mongoose.model('Messages', messageSchema);

module.exports = messageModel;
