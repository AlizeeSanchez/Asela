const Condition = require("../models/Condition");


const conditionController = {

    //Afficher la liste des conditions d'adoption
    findCondition: async (request, response) => {
        try{
            const condition = await Condition.findCondition();
            if (condition) {
                response.json(condition);
            } else {
                response.status(404).json(`Cette condition n'existe pas.`);
            }
        }catch(error){
            console.trace(error);
        }
    },

    //Afficher une condition
    findOneCondition: async (request, response) => {
        try{
            const conditionId = parseInt(request.params.id);
            const condition = await Condition.findOneCondition(conditionId);
            if (condition) {
                response.json(condition);
            } else {
                response.status(404).json(`Cette condition n'existe pas.`);
            }
        }catch(error){
            console.trace(error);
        }
    },

    //Ajouter une condition d'adoption
    addNewCondition: async (request, response) => {
        console.log(request.body);
        try{
            //Test si tous les champs sont renseignés
            if(request.body.description){
                
                // On recupere toutes les données envoyées par le body
                const condition = {
                    description: request.body.description
                };
                const saveCondition = await Condition.addNewCondition(condition);
                response.json({saveCondition: condition, TEXT: 'La condition a bien été enregistrée'});
                 //Redirection 
            } else {
                response.json('Vous n\'avez pas rempli tous les champs !');
            }
            
        }
        catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },

    //Modifier une condition d'adoption
    editCondition: async (request, response) => {
        try {
            const conditionId = parseInt(request.params.id);
            const condition = await Condition.findOneCondition(conditionId);
            
            if (condition){
                console.log('ma condition a modifier', condition)
                if (request.body){
                    const editCondition = {
                        id: condition.id,
                        description: request.body.description
                    };
                    console.log('log', editCondition)
                    //on transmet les informations de la condition à la fonction editCondition
                    await Condition.editCondition(editCondition);
                    response.status(200).json({editCondition});
                } else {
                    response.status(404).json('Il n\' y a rien à modifier');
                }
            } else {
                 response.status(404).json(`Cette condition numéro ${petId} n\'existe pas`);
            }
        }
        catch(error) {
            console.trace(error);
        }
    },

    //Supprimer une condition d'adoption
    suppCondition: async (request, response) => {
        try{
           const conditionId = parseInt(request.params.id);
           const condition = await Condition.findOneCondition(conditionId);
           console.log(condition.supp);
           if(condition){
               const condition = await Condition.suppCondition(conditionId)
               response.json('Cette condition a été supprimée avec succès.')
 
           } else {
             response.json('Cette condition ne peut pas etre supprimée car elle n\'existe pas.');
             }
         }
         catch(error){
             console.trace(error)
             return response.status(500).json(error.toString());
         }  
     }



}

module.exports = conditionController;