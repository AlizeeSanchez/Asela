const Event = require("../models/Event");
const multer = require('multer');
const path = require('path');

const eventController = {

    //On recupere les evenements
    allEvent: async (request, response) => {
        try{


            if (request.session.user) {            
                const session = request.session.user;
                const events = await Event.allEvent();
                if (events) {
                    response.render('event', {
                        events, session
                    });
                } else {
                     response.status(404).json(`Il n'y a aucun evenement en BDD.`);
                }
            }else{
            response.render('500');
            }
        }catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },

     // Gestion des images enregistrer image dans upload
    
     uploadevent: async (request, response, next) => {
        try{
            if (request.session.user) {
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
                upload(request, response, error => {    
                    if(request.file !== undefined){
                        response.send({
                            file : request.file.filename
                        })
                    
                    }else{
                        response.send({   
                            error: 'veuillez ajouter une image'
                        })
                        next();
                    }
                })  
            }else{
                response.render('500');
            }
        
        }catch(error){
        console.trace(error)
        return response.status(500).json(error.toString());
        }

    },

    //Ajouter un event
    addEvent: async (request, response, next) => {
        try {
            if (request.session.user) {
                if(request.body.eventTitle && request.body.eventLocation && request.body.eventDate_event && request.body.eventContent && request.eventPicture) {
                     const saveEvent = {
                        title: request.body.eventTitle,
                        location: request.body.eventLocation,
                        date_event: request.body.eventDate_event,
                        content: request.body.eventContent,
                        picture: eventPicture
                     };
                     await Event.addNewEvent(saveEvent);
                    response.redirect('/events')

                } else{
                        response.json('Veuillez remplir tous les champs svp');
                }
            }else{
                response.render('500');
            }
        } catch (error){
            console.trace(error)
            return response.status(500).json(error.toString());
        } 
    },  
}

module.exports =  eventController;