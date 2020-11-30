const Dog = require("../models/Dog");

const dogController = {

    //On recupere les chiens a l'adoption
    allPetsNotAdopted: async (request, response) => {
        try{
            const pets = await Dog.findPetNotAdopted();
            if (pets) {
                response.render('dog', {
                    pets
                });
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
    petStateAdoption: async (request, response) => {
        try{
            const petId = parseInt(request.params.id);
            const pet = await Dog.findOnePet(petId);
            console.log(pet);
            if(pet.adopt === false){
                const petFalse = await Dog.adoptIsTrue(petId);
                response.json('Cet animal est disponible a l\'adoption');
            }
            if(pet.adopt ===true){
                const petTrue = await Dog.adoptIsFalse(petId);
                response.json('Cet animal n\'est pas disponible a l\'adoption');
            } else {
                response.status(404).json(`Cet animal n'existe pas.`);
            }
        }
        catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },

    //Ajouter un chien à l'adoption
    addNewPet: async (request, response) => {
        console.log(request.body);
        try{
            //Test si tous les champs sont renseignés
            if(request.body.name && request.body.age && request.body.sexe && request.body.description){
                
                // On recupere toutes les données envoyées par le body
                const pet = {
                    type: 'chien',
                    name: request.body.name,
                    age: request.body.age,
                    amity: request.body.amity,
                    sexe: request.body.sexe,
                    breed: request.body.breed,
                    ide: request.body.ide,
                    sterilised: request.body.sterilised,
                    description: request.body.description,
                    weight: request.body.weight
                };
                 //on transmet les informations de l'animal a la fonction addNewPet et on lui envois notre animal recuperer precedemment
                 const savePet = await Dog.addNewPet(pet);
                 response.json({savePet: pet, TEXT: 'L\'animal a bien été enregistré'});
                 //Redirection vers la fiche de l'animal
            } else {
                response.json('Vous n\'avez pas rempli tous les champs !');
            }
            
        }
        catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },

    //Supprimer un chien
    suppPet: async (request, response) => {
       try{
          const petId = parseInt(request.params.id);
          const pet = await Dog.findOnePet(petId);
          console.log(pet.supp);
          if(pet){
              const pet = await Dog.suppPet(petId)
              response.json('Cet animal a été supprimé avec succès.')

          } else {
            response.json('Cet animal ne peut pas etre supprimer car il n\'existe pas.');
            }
        }
        catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }  
    },
           
}

module.exports = dogController;