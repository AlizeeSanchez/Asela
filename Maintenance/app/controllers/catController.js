const Cat = require("../models/Cat");

const catController = {

    //On recupere les chiens a l'adoption
    allPetsNotAdopted: async (request, response, next) => {
        try{
            if (request.session.user) {
                const pets = await Cat.findCatNotAdopted();
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
                const petsAdopt = await Cat.findCatAdopted();
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
                const petsDead = await Cat.findAllCatDeceaded();  
                if (petsDead) {
                    const jason = {
                        pets: response.pets,
                        petsAdopt: response.petsAdopt,
                        petsDead
                    }
                    response.render('cat', {
                        jason
                    });   
                } else {
                    response.status(404).json(`Il n'y a aucun chat qui a été adopté en bdd.`);
                }
            }else{
                response.render('500');
            }
        }catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },

    //On passe l'adoption a true quand un chien est disponible à l'adoption.
    petStateAdoption: async (request, response) => {
        try{
            if (request.session.user) {
                const petId = parseInt(request.params.id);
                const pet = await Cat.findOneCat(petId);
                if(pet.adopt === false){
                    const petFalse = await Cat.adoptCatIsFalse(petId);
                    response.json('Cet animal est disponible a l\'adoption');
                }
                if(pet.adopt ===true){
                    const petTrue = await Cat.adoptCatIsFalse(petId);
                    response.json('Cet animal n\'est pas disponible a l\'adoption');
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

    AddNewCatToAdopt: async (request, response) => {
        try {
            if (request.session.user) {
                //Test si tous les champs sont renseignés 
                if(request.body.eventName && request.body.eventAge && request.body.eventDescription) {  
                    const cat= {
                        type: 'chat',
                        name: request.body.eventName,
                        age: request.body.eventAge,
                        sexe: request.body.eventSexe,
                        amity: request.body.eventAmity,
                        color: request.body.eventColor,
                        ide: request.body.eventIde,
                        sterilized: request.body.eventSterilized,
                        description: request.body.eventDescription,
                        race: request.body.eventRace
                    };
                    //on transmet les informations du chat à la fonction addNewCat
                    const saveCat = await Cat.addNewCat(cat);
                    response.json({ saveCat: cat , TEXT: 'Votre chat a bien été enregistrer dans la liste des adoptés'});
                } else{
                        response.json('Veuillez remplir tous les champs svp');
                } 
            }else{
                response.render('500');
            }
        }catch (error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }                 
    },

    deleteCat: async(request, response) => {
        try {
            if (request.session.user) {
                const catId = parseInt(request.params.id);
                const cat = await Cat.findOneCat(catId);
                if (cat) {
                    const catToDel = {
                        id: catId,
                    };
                    await Cat.suppCat(catToDel.id);
                    response.status(200).json('Votre chat a bien été supprimer');
                } else {
                    response.json('ce chat n\'existe pas.');
                }
            }else{
                response.render('500');
            }
        }catch (error) {
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },

    // On veux voir la fiche d'un chat
    findOneCat: async (request, response) => {
        try{
            if (request.session.user) {
                const catId = parseInt(request.params.id);
                const cat = await Cat.findOneCat(catId);
                if(cat){
                    response.json(cat)
                }else {
                    response.status(404).json(`le chat numéro ${catId} n'existe pas`)
                }
            }else{
                response.render('500');
            }
        }catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    }
}

module.exports = catController;