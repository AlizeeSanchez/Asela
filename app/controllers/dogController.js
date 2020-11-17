const Dog = require("../models/Dog");

const dogController = {

    //On recupere les chiens a l'adoption
    allPetsNotAdopted: async (request, response) => {
        try{
            const pets = await Dog.findPetNotAdopted();
            if (pets) {
                response.json(pets);
            } else {
                response.status(404).json(`Il n'y a aucun animal à l'adoption en BDD.`);
            }
        }
        catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },

    //On recupere les chiens adoptés
    allPetsAdopted: async (request, response) => {
        try{
            const pets = await Dog.findAllPetAdopt();
            if (pets) {
                response.json(pets);
            } else {
                response.status(404).json(`Il n'y a aucun animal qui a été adopté en bdd.`);
            }
        }
        catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },

    //On passe l'adoption a true quand un chien est disponible à l'adoption.
    petAvailable: async (request, response) => {
        try{
            const petId = parseInt(request.params.id);
            const pet = await Dog.adoptIsTrue(petId);
            if (pet) {
                response.json(pet);
            } else {
                response.status(404).json(`Cet animal n'existe pas.`);
            }
        }
        catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },

    //On passe l'adoption a false quand un chien est disponible à l'adoption.
    petAvailable: async (request, response) => {
        try{
            const petId = parseInt(request.params.id);
            const pet = await Dog.adoptIsFalse(petId);
            if (pet) {
                response.json(pet);
            } else {
                response.status(404).json(`Cet animal n'existe pas.`);
            }
        }
        catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    }
}

module.exports = dogController;