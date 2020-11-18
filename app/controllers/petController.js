const Pet = require("../models/Pet");

const petController = {

    //Afficher un animal
    findOnePet: async (request, response) => {
        try{
            const petId = request.params.petId
            const pet = await Dog.findOnePet(petId);
            if (pet) {
                response.json(pet);
            } else {
                response.status(404).json(`Cet animal n'existe pas.`);
            }
        }catch(error){
            console.trace(error);
        }
    },
    
    //Modifier un animal
    editPet: async (request, response) => {
        try {
            const petId = request.params.petId
            const pet = await Pet.findOnePet(petId);
            if (pet){
                if (request.body){
                    const editPet = {
                        name: request.body.name,
                        age: request.body.age,
                        amity: request.body.amity,
                        sexe: request.body.sexe,
                        breed: request.body.breed,
                        ide: request.body.ide,
                        date_vaccine: request.body.date_vaccine,
                        sterilised: request.body.sterilised,
                        description: request.body.description,
                        weight: request.body.weight,
                        adopt: request.body.adopt,
                        date_adopting: request.body.date_adopting,
                        host_family_id : request.body.host_family_id,
                        adoptant_id: request.body.adoptant_id
                    };
                    //on transmet les informations de l'animal à la fonction editPet
                    const petEdit = await Pet.editPet(editPet);
                    response.status(200).json({petEdit});
                } else{
                    response.status(404).json('Il n\' y a rien à modifier');
                }
            } else {
                 response.status(404).json(`Cet animal numéro ${petId} n\'existe pas`);
            }
        }
        catch(error) {
            console.trace(error);
        }
    }

}

module.exports = petController;