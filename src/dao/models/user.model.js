const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	email: { type: String, required: true },
	password: { type: String, required: true },
	username: { type: String, required: true },
	role: { type: String, required: true, default: 'user' }
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
