const messageModel = require('./models/message.model');

class Message {
	addMessage = async (user, message) => {
		await messageModel.create({ user, message });
	};
	getMessages = async () => {
		const msgs = await messageModel.find({}).lean();
		return msgs;
	};
}

module.exports = Message;
