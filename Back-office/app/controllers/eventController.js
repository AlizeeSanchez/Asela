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
                
            } else {
                 response.status(404).json(`Il n'y a aucun evenement en BDD.`);
            }
        }
        catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },

     // Gestion des images enregistrer image dans upload
    
     uploadevent: async (request, response, next) => {
        try{
        const storage = multer.diskStorage({
            destination : path.join(__dirname, '..','public','uploads'),   
            filename : (request, file, callback) =>{
                callback(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
            }
        });
        console.log(storage);
        
        
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
                    console.log(request.file.filename);
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
        
        }catch(error){
        console.trace(error)
        return response.status(500).json(error.toString());
        }

    },

    //Ajouter un event
    addEvent: async (request, response, next) => {
        try {
            console.log('body JE SUISS LAAAAAAAA', request.body);
            //Test si tous les champs sont renseignés 
            if(request.body.eventTitle && request.body.eventLocation && request.body.eventDate_event && request.body.eventContent && request.eventPicture) {
                 const saveEvent = {
                    title: request.body.eventTitle,
                    location: request.body.eventLocation,
                    date_event: request.body.eventDate_event,
                    content: request.body.eventContent,
                    picture: eventPicture
                 };
                 console.log('saveEvent ICCIICIIC AUSSI', saveEvent);
                 
                 
                //on transmet les informations du membre a la fonction createMember
                 await Event.addNewEvent(saveEvent);
                response.redirect('/events')

            } else{
                    response.json('Veuillez remplir tous les champs svp');
            }   
        } catch (error){
            console.trace(error)
            return response.status(500).json(error.toString());
        } 
    }
    
}

module.exports =  eventController;