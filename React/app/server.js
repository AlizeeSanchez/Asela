require("dotenv").config();
const userMiddleware = require('./middlewares/useMiddlewares');
const express = require("express");
const router = require("./router");
const session = require("express-session");
const app = express();

const port = process.env.PORT || 4040;

// Session
app.use(session({
	secret: 'les chats oui je confirme sont les maitres du monde',
	resave: true,
	saveUninitialized: true,
	cookie: {
	  httpOnly: true, // empêche l'accès au cookie depuis du javascript côté front
	  secure: false, // HTTPS est nécessaire si l'on veut passer l'option à true
	  maxAge: 1000 * 60 * 60 * 24, // durée de vie du cookie en milliseconds, ici ça donne 1 jour
	},
}));

//app.use(userMiddleware);

app.set('views', './app/views');
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



const publicPath = __dirname + '/public';
app.use(express.static(publicPath));
console.log(publicPath);

app.use('/v1', router);

app.init = () => {
    app.listen(port, () => console.log(`Running on http://localhost:${port}`));
};

module.exports = app;