require('dotenv').config();
const cors = require('cors')
const express = require('express');
const session = require('express-session');
const multer = require('multer');
const path = require('path');
const helpers = require('./helpers');


const app = express();
const port = process.env.PORT || 3030;
const router = require('./router');

app.set('views', './app/views');
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(
	session({
		secret: 'les petits chats sont mignons',
		resave: false,
		saveUninitialized: true,
		cookie: {maxAge: 24 * 60 * 60 * 1000},
		logged: false
	})
);

const publicPath = __dirname + '/public';
app.use(express.static(publicPath));
console.log(publicPath);

/*-------------------------Partie upload photo pet----------------------*/
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

app.post('/v1/upload', (req, res) => {
    // 'profile_pic' is the name of our file input field in the HTML form
    let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).single('petPicture');

    upload(req, res, function(err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Veuillez séléctionner une image SVP');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        // Display uploaded image for user validation
        res.send(`Vous avez téléchargé cette image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`);
    });
});

// CORS
app.use((req, res, next) => {
	// on autorise explicitement le domaine du front
  
	const allowedOrigins = ['http://localhost:4040', 'http://localhost:8080'];
	const { origin } = req.headers;
	if (allowedOrigins.includes(origin)) {
	  res.setHeader('Access-Control-Allow-Origin', origin);
	}
	// res.header('Access-Control-Allow-Origin', 'http://3.127.235.222/');
	// on autorise le partage du cookie
	res.header('Access-Control-Allow-Credentials', true);
	// on autorise le partage de ressources entre origines
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
	next();
  });
app.use(express.json());

app.use('/v1',router);

app.init = () => {
    app.listen(port, () => console.log(`Running on http://localhost:${port}`));
};

module.exports = app;