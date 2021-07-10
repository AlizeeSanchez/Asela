const Waitinglist = require('../models/Waitinglist');

const waitinglistController = {

    //Afficher les questionnaires en liste d'attente 
    findAllWaitinglist : async (request, response) => {
        
        try {   
            if (request.session.user) {
                const waitingCat = await Waitinglist.findAllWaitingCat();
                const waitingDog = await Waitinglist.findAllWaitingDog();
                const session = request.session.user;
                response.render('waitinglist', {
                    waitingCat,
                    waitingDog,
                    session
                });
            }else{
                response.render('500');
            }    
        }catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
        
    },
    
    
}

module.exports = waitinglistController;