const Condition = require("../models/Condition");
const Price = require("../models/Price");


const conditionController = {

    //Afficher la liste des prix d'adoption
    findCondition: async (request, response) => {
        try{
            const priceOfAdopt = await Price.findPriceAdopt();
            const condition = await Condition.findCondition();
            const purebred_pet = await Condition.purebred_pet();
            const session = request.session.user;
                response.render('reglages', {
                    priceOfAdopt,
                    condition,
                    purebred_pet,
                    session
                });
        }catch(error){
            console.trace(error);
        }
    },


    //Modifier un prix
    editPriceDog: async (request, response) => {
        try {
            const id = parseInt(request.body.id);
            const priceOfAdopt = await Price.findOnePriceAdopt(id);
            if (priceOfAdopt){
                if (request.body){
                    const editPrice = {
                        id: request.body.id,
                        dog_female: request.body.dog_female,
                        dog_male: request.body.dog_male,
                        puppy: request.body.puppy,
                        caution_puppy: request.body.caution_puppy
                    };
                    //on transmet les informations de l'animal à la fonction editPet
                    await Price.editPriceDog(editPrice);
                    response.status(200).json({editPrice});
                } else {
                    response.status(404).json('Il n\' y a rien à modifier');
                }
            } else {
                 response.status(404).json(`Ce prix numéro ${petId} n\'existe pas`);
            }
        }
        catch(error) {
            console.trace(error);
        }
    },

    editPriceCat: async (request, response) => {
        try {
            const id = parseInt(request.body.id);
            const priceOfAdopt = await Price.findOnePriceAdopt(id);
            if (priceOfAdopt){
                if (request.body){
                    const editPrice = {
                        id: request.body.id,
                        cat_female: request.body.cat_female,
                        cat_male: request.body.cat_male,
                        kitten: request.body.kitten,
                        caution_kitten: request.body.caution_kitten
                    };
                    //on transmet les informations de l'animal à la fonction editPet
                    await Price.editPriceCat(editPrice);
                    response.status(200).json({editPrice});
                } else {
                    response.status(404).json('Il n\' y a rien à modifier');
                }
            } else {
                 response.status(404).json(`Ce prix numéro ${petId} n\'existe pas`);
            }
        }
        catch(error) {
            console.trace(error);
        }
    },

    breedPet: async (request, response) => {
        try {
            const priceOfBreed = await Price.findOnePriceBreed();
            if (priceOfBreed){
                if (request.body){

                    const editPriceBreed = {
                        id: request.body.id,
                        extra: request.body.extra,
                        extra_charge: request.body.extra_charge
                    };
                    //on transmet les informations de l'animal à la fonction editPet
                    await Price.editPriceBreedPet(editPriceBreed);
                    response.status(200).json({editPriceBreed});
                } else {
                    response.status(404).json('Il n\' y a rien à modifier');
                }
            } else {
                 response.status(404).json(`Ce prix numéro ${id} n\'existe pas`);
            }
        }
        catch(error) {
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
        try{
            if(request.body.description){
                const condition = {
                    description: request.body.description
                };
                const saveCondition = await Condition.addNewCondition(condition);
                response.json({saveCondition: condition, TEXT: 'La condition a bien été enregistrée'});
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
            const conditionId = parseInt(request.body.id);
            const condition = await Condition.findOneCondition(conditionId);
            if (condition){
                if (request.body){
                    const editCondition = {
                        id: request.body.id,
                        description: request.body.description
                    };
                    //on transmet les informations de la condition à la fonction editCondition
                    await Condition.editCondition(editCondition);
                    response.status(200).json({editCondition});
                } else {
                    response.status(404).json('Il n\' y a rien à modifier');
                }
            } else {
                 response.status(404).json(`Cette condition numéro ${conditionId} n\'existe pas`);
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