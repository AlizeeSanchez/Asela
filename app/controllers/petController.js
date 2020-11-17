const Pet = require("../models/Pet");

const petController = {

    allPets: async (request, response) => {
        try{
            const pets = await Pet.findAllPet();
            if (pets) {
                response.json(pets);
            } else {
                response.status(404).json(`Il n'y a aucun animal en BDD.`);
            }
        }
        catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    }
}

module.exports = petController;