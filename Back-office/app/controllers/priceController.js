const Price = require("../models/Price");

const priceController = {

    //Afficher la liste des prix d'adoption
    findPriceAdopt: async (request, response) => {
        try{
            const priceOfAdopt = await Price.findPriceAdopt();
            if (priceOfAdopt) {
                response.json(priceOfAdopt);
            } else {
                response.status(404).json(`Ce prix n'existe pas.`);
            }
        }catch(error){
            console.trace(error);
        }
    },

    //Aficher un seul prix 
    findOnePriceAdopt: async (request, response) => {
        try{
            const priceOfAdoptId = parseInt(request.params.id);
            const priceOfAdopt = await Price.findOnePriceAdopt(priceOfAdoptId);
            if (priceOfAdopt) {
                response.json(priceOfAdopt);
            } else {
                response.status(404).json(`Ce prix n'existe pas.`);
            }
        }catch(error){
            console.trace(error);
        }
    },

    //Ajouter un prix
    addNewPrice: async (request, response) => {
        console.log(request.body);
        try{
            //Test si tous les champs sont renseignés
            if(request.body.type_pet && request.body.sexe_pet && request.body.price && request.body.caution){
                
                // On recupere toutes les données envoyées par le body
                const priceOfAdopt = {

                    type_pet: request.body.type_pet,
                    sexe_pet: request.body.sexe_pet,
                    price: request.body.price,
                    caution: request.body.caution

                };
                const savePrice = await Price.addNewPrice(priceOfAdopt);
                response.json({savePrice: priceOfAdopt, TEXT: 'Le prix a bien été enregistré'});
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

    //Modifier un prix
    editPrice: async (request, response) => {
        try {
            const priceId = parseInt(request.params.id);
            const priceOfAdopt = await Price.findOnePriceAdopt(priceId);
            
            if (priceOfAdopt){
                console.log('mon body', request.body)
                if (request.body){
                    const editPrice = {

                        id: priceOfAdopt.id,
                        type_pet: request.body.type_pet,
                        sexe_pet: request.body.sexe_pet,
                        price: request.body.price,
                        caution: request.body.caution,
                        
                    };
                    console.log('log', editPrice)
                    //on transmet les informations de l'animal à la fonction editPet
                    await Price.editPrice(editPrice);
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

    //Supprimer un prix
    suppPrice: async (request, response) => {
        try{
           const priceId = parseInt(request.params.id);
           const priceOfAdopt = await Price.findOnePriceAdopt(priceId);
           console.log(priceOfAdopt.supp);
           if(priceOfAdopt){
               const priceOfAdopt = await Price.suppPrice(priceId)
               response.json('Ce prix a été supprimé avec succès.')
 
           } else {
             response.json('Ce prix ne peut pas etre supprimé car il n\'existe pas.');
             }
         }
         catch(error){
             console.trace(error)
             return response.status(500).json(error.toString());
         }  
     }




}

module.exports = priceController;