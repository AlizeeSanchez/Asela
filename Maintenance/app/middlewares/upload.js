const multer = require("multer");
const path = require('path');
/*
//type of file accepted
const extension = ["image/jpeg", "image/png", "image/svg+xml", "image/jpg"];

//filter for upload file, with array 'extension'
//if format file is not good return error
function fileFilter(request, file, cb) {
  if (!extension.includes(file.mimetype)) {
    return cb(new Error("Le fichier n'est pas au bon format"), false);
  }
  cb(null, true);
}

//config multer for upload files
exports.upload = multer({
  fileFilter,
  limits: { fileSize: 1000000 },
  storage: multer.diskStorage({
    destination: function (request, file, cb) {
      cb(null, "upload");
    },
    filename: async function (request, file, cb) {
      try {
        //file is sup of 1Mo return error
        if (request.headers["content-length"] > 1000000) {
          return cb(new Error("Le fichier est supérieur à 1Mo"), false);
        }
        
        //recover type file
        const tab = file.mimetype.split("/");
        //custom name file save
        //if we save an svg we must remove the + xml
        //else save is good
        if (tab[1] === "svg+xml") {
          const newTab = tab[1].split("+");
          cb(null, `${file.fieldname}-${Date.now()}.${newTab[0]}`);
        } else {
          cb(null, `${file.fieldname}-${Date.now()}.${tab[1]}`);
        }
      } catch (error) {
        cb(new Error("Une Erreur est survenue pendant l'enregistrement"), false);
      }
    },
  }),
});


const upload = async function (request, response) {
//storage sert a définir le dossier ou sera stocké les image avec la propriété destination ainsi que le nommage de l'image avec la propriété filename
const storage = multer.diskStorage({
  destination : path.join(__dirname, '..', 'app', 'public','images'),
});


//upload nous donne la capacité admise des fichier upload avec limits puis les fichier extension possible avec filefilter
const upload = multer({
  storage : storage,
  limits : {
      filesize : 3000000
  },
  fileFilter : (request, file, callback) => {
      const prExt = /jpg|jpeg|png/;
      const checkExt = prExt.test(path.extname(file.originalname));
      const checkmime = prExt.test(file.mimetype);        
      if(checkExt && checkmime) { 
          callback(null, true);
      }else {
          callback('Veuillez inserez une image');
      }
  }

//array permet de upload plusieurs photo en meme temps et le maxcounter permet d'en choisir 20 maximum
}).array('petPicture', {name: 'photo', maxCount: 20});

  if(request.body !== undefined){
      console.log(request.file.filename);
      response.render('onePet',{
          pet, hostFamilly, allHostFamilly, adoptant, imgPet, comments, questionnaire,
          file: request.body.filename,

      })
    
  console.log('request.file',request.body); 
    
  }else{
      response.send({   
          error: 'veuillez ajouter une image'
      })
  }
}
module.exports = upload;

//const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, path.join(__dirname, '..', 'app', 'public','images'));
  },
  filename: (request, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).array('petPicture', 20);*/

const filestorage = multer.diskStorage({
  destination: (request, file, cb) => {
      cb(null, path.join(__dirname, '..', 'app', 'public','images'))
  },
  filename: (request, file, cb) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  },
})
module.exports = multer({storage: filestorage}).array('photo', 20);

