require('dotenv').config();
const cors = require('cors')
const express = require('express');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 3030;
const router = require('./router');

app.set('views', './app/views');
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
//app.use(
//	session({
//		secret: 'les petits chats sont mignons',
//		resave: false,
//		saveUninitialized: true,
//		cookie: {maxAge: 24 * 60 * 60 * 1000},
//		logged: false
//	})
//
//);

const publicPath = __dirname + '/public';
app.use(express.static(publicPath));
console.log(publicPath);

//app.use(cors({
//	origin: 'http://localhost:8080',
//	methods: ['POST', 'GET', 'OPTIONS', 'HEAD'],
//	credentials: true
//}));

app.use(express.json());

app.use('/v1',router);

app.init = () => {
    app.listen(port, () => console.log(`Running on http://localhost:${port}`));
};

module.exports = app;