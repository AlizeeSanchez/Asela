require('dotenv').config();
const cors = require('cors')
const express = require('express');
const session = require('express-session');
const multer = require('multer');

const Pet = require("../app/models/Pet");
const HostFamily = require("../app/models/HostFamily");
const QuestionnaireAdopt = require("../app/models/QuestionnaireAdopt");

const app = express();


const fileStorage = multer.diskStorage({
    destination: `${__dirname}/public/uploads/`,
    filename: (request, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    },
})

const upload = multer({storage: fileStorage});

app.post('/photos/upload/:id', upload.array('files[]'), async (req, res) => {
	try{
		const petId = parseInt(req.params.id);
    	const pet = await Pet.findOnePet(petId);
		const namefile = req.files[0].filename;
		if(namefile && pet){
			const obj = {
				namefile : namefile,
				id : petId
			}
			const newImg = await Pet.uploadImgPet(obj);
			res.redirect(`http://localhost:3030/v1/pet/${petId}`)
			}
	}catch(error){
		console.trace(error);
	}
});

const port = process.env.PORT || 3030;
const router = require('./router');

app.set('views', './app/views');
app.set('view engine', 'ejs');

// Body-parser middleware 
//app.use(bodyparser.urlencoded({ extended: false }));
//app.use(bodyparser.json());
//app.use(fileupload());
app.use(express.urlencoded({ extended: true }));
app.use(
	session({
		secret: 'les petits chats sont mignons',
		resave: false,
		saveUninitialized: true,
		cookie: {maxAge: 24 * 60 * 60 * 1000},
		//logged: true
	})
);

const publicPath = __dirname + '/public';
app.use(express.static(publicPath));
console.log(publicPath);

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