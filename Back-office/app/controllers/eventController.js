const Event = require("../models/Event");
const multer = require('multer');
const path = require('path');

const eventController = {

    //On recupere les evenements
    allEvent: async (request, response) => {
        try{
            const events = await Event.allEvent();
            if (events) {
                response.render('event', {
                    events
                });
               // console.log(events);
                
            } else {
                 response.status(404).json(`Il n'y a aucun evenement en BDD.`);
            }
        }
        catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },

    //Ajouter un event
    addEvent: async (request, response, next) => {
        try {
            //Test si tous les champs sont renseignés 
            if(request.body.title && request.body.location && request.body.date_event && request.body.content && request.body.picture) {
                 const saveEvent = {
                    title: request.body.title,
                    location: request.body.location,
                    date_event: request.body.date_event,
                    content: request.body.content,
                    picture: request.body.picture,
                 };   

                //on transmet les informations du membre a la fonction createMember
                 await Event.addNewEvent(saveEvent);
                response.json({ saveEvent , TEXT: 'Votre évènement a bien été enregistré'});
                 next();

            } else{
                    response.json('Veuillez remplir tous les champs svp');
            }   
        } catch (error){
            console.trace(error)
            return response.status(500).json(error.toString());
        } 
    },
    // Gestion des images enregistrer image dans upload
    
    uploadevent: async (request, response) => {
        try{
        const storage = multer.diskStorage({
            destination : path.join(__dirname, '..','public','uploads'),
            filename : (request, file, callback) =>{
                callback(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
            }
        });
  
        const upload = multer({
            storage : storage,
            limits: {
                fileSize : 3000000
            },
            fileFilter : (request, file, callback)=>{
                const prExt = /jpg|jpeg|png/;
                const checkExt = prExt.test(path.extname(file.originalname));
                const checkmime = prExt.test(file.mimetype);

                if(checkExt && checkmime){
                    callback(null,true)
                }else{
                    callback('Veuillez inserez une image');
                }
            }

        }).single('event');  

        upload(request, response, error =>{
            if(error){
                response.render('event',{
                    events,
                    error: error
                })
            }else{
                  console.log(request.file);
            }
        })

        }catch(error){
        console.trace(error)
        return response.status(500).json(error.toString());
        }

    },
    
     
}

module.exports =  eventController;