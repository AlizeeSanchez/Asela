const Other = require("../models/Other")

const otherController = {

    //On récupere la page contact
    contact: async (request, response) => {
            try{
                response.render('contact');
            }
            catch(error){
                console.trace(error)
                return response.status(500).json(error.toString());
            }

    },

    support: async (request, response) => {
        try{
            response.render('helpEatch');
        }
        catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }

    },

    tearmAdopt: async (request, response) => {
        try{
            response.render('termAdopt');
        }
        catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },

    event: async (request, response) => {
        try{
            const events = await Other.allEvent();
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

    conditionAdopt: async (request, response) => {
        try{
            const conditions = await Other.allConditions();
            const tarifs = await Other.findRate();
            const breed = await Other.purebred_pet();
        
            response.render('conditions', {
                conditions, tarifs, breed
            });
        }
        catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },

    
}

module.exports = otherController;