const Dog = require("../models/Dog");

const dogController = {

    //On recupere les chiens a l'adoption
    allPetsNotAdopted: async (request, response, next) => {
        try{
            if (request.session.user) {
                const pets = await Dog.findPetNotAdopted();
                if (pets) {
                    response.pets = pets;
                    next();
                } else {
                     response.status(404).json(`Il n'y a aucun animal à l'adoption en BDD.`);
                }
            }else{
                response.render('500');
            }
        }catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },

    //On recupere les chiens adoptés
    allPetsAdopted: async (request, response, next) => {
        try{
            if (request.session.user) {
                const petsAdopt = await Dog.findAllPetAdopt();
                if (petsAdopt) {
                    response.petsAdopt = petsAdopt;
                    next();
                } else {
                    response.status(404).json(`Il n'y a aucun animal qui a été adopté en bdd.`);
                }
            }else{
            response.render('500');
            }
        }catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },

    allPetsDeceaded: async (request, response) => {
        try{
            if (request.session.user) {
                const petsDead = await Dog.findAllPetDeceaded();  
                const session = request.session.user;
                if (petsDead) {
                    const jason = {
                        pets: response.pets,
                        petsAdopt: response.petsAdopt,
                        petsDead
                    }
                    response.render('dog', {
                        jason, session
                    });
                } else {
                    response.status(404).json(`Il n'y a aucun chien qui a été adopté en bdd.`);
                }
            }else{
            response.render('500');
            }
        }catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },


    //On passe l'adoption a true quand un chien est disponible à l'adoption et false quand il ne l'est pas .
    petStateSitePublish: async (request, response) => {
        try{
            if (request.session.user) {
                const petId = parseInt(request.params.id);
                const pet = await Dog.findOnePet(petId);
                if(pet.adopt === false){
                    const petFalse = await Dog.adoptIsTrue(petId);
                    response.json('Cet animal est disponible a l\'adoption');
                }
                if(pet.adopt ===true){
                    const petTrue = await Dog.adoptIsFalse(petId);
                    response.json('Cet animal n\'est pas disponible à l\'adoption');
                } else {
                    response.status(404).json(`Cet animal n'existe pas.`);
                }
            }else{
            response.render('500');
            }  
        }catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },

    //Ajouter un chien à l'adoption
    addNewPet: async (request, response) => {
        try{
            if (request.session.user) {
                //Test si tous les champs sont renseignés
                if(request.body.eventName && request.body.eventAge && request.body.eventSexe && request.body.eventDescription){

                    // On recupere toutes les données envoyées par le body
                    const pet = {
                        type: 'chien',
                        name: request.body.eventName,
                        age: request.body.eventAge,
                        sexe: request.body.eventSexe,
                        breed: request.body.eventRace,
                        amity: request.body.eventAmity,
                        color: request.body.eventColor,
                        weight: request.body.eventWeight,
                        ide: request.body.eventIde,
                        sterilised: request.body.eventSterilised,
                        date_vaccine: request.body.eventVaccineDate,
                        description: request.body.eventDescription,    
                    };

                     //on transmet les informations de l'animal a la fonction addNewPet et on lui envois notre animal recuperer precedemment
                     const savePet = await Dog.addNewPet(pet);

                     response.json({savePet: pet, TEXT: 'L\'animal a bien été enregistré'});
                     //Redirection vers la fiche de l'animal
                } else {
                    response.json('Vous n\'avez pas rempli tous les champs !');
                }

            }else{
            response.render('500');
            }
        }catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },          
}

module.exports = dogController;