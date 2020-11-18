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
            const pet = await Dog.findOnePet(petId);
            if (pet){
                if (request.body){
                    const pet = {
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
                        date_adopting: request.body.date_adopting
                    };
                }
            }
        }
        catch(error) {
            console.trace(error);
        }
    }

}

module.exports = petController;