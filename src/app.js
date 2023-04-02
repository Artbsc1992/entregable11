const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const handlebars = require('express-handlebars');
const path = require('path');
const routerAuth = require('./routes/auth.router');
const routerProducts = require('./routes/products.router');
const routerCarts = require('./routes/carts.router');
const routerMessages = require('./routes/chat.router');
const { Server } = require('socket.io');
const productModel = require('./dao/models/product.model');
const ProductManager = require('./dao/productManager.mongo');
const displayRoutes = require("express-routemap");
require('dotenv').config();

const { DB_USER, DB_PASS } = process.env;
const productManager = new ProductManager();

const app = express();
const PORT = 8080;

const httpServer = app.listen(PORT, () => console.log(`Server listening on port ${PORT}`), () => displayRoutes(app));
const socketServer = new Server(httpServer);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
	session({
		store: MongoStore.create({
			mongoUrl: `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.ypqhimi.mongodb.net/?retryWrites=true&w=majority`,
			mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
			ttl: 60 * 360
		}),
		secret: 'C0d3rB4ck',
		resave: false,
		saveUninitialized: false
	})
);

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

app.use('/', routerAuth);
app.use('/api/products', routerProducts);
app.use('/api/carts', routerCarts);
app.use('/api/messages', routerMessages);

app.get('/realtimeproducts', async (req, res) => res.status(200).render('realTimeProducts'));

socketServer.on('connection', async socket => {
	console.log('Nuevo cliente conectado');

	const products = await productModel.find({});
	socket.emit('products', products);

	socket.on('addProd', async prod => await productManager.addProduct(prod));

	socket.on('delProd', async id => await productManager.deleteProduct(id));
});

mongoose.connect(
	`mongodb+srv://${DB_USER}:${DB_PASS}@ecommerce.2ubhiqd.mongodb.net/?retryWrites=true&w=majority`
);

