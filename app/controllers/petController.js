const Pet = require("../models/Pet");

const petController = {

    //Afficher un animal
    findOnePet: async (request, response, next) => {
        try{
            const petId = parseInt(request.params.id);
            const pet = await Pet.findOnePet(petId);
            if (pet) {
                //charactPet = pet;
                response.pet = pet;
                console.log('mon charactPet:', pet)
                next();
            } else {
                response.status(404).json(`Cet animal n'existe pas.`);
            }
        }catch(error){
            console.trace(error);
        }
    },

    //On recupere les chiens a l'adoption
    allPetDead: async (request, response) => {
        try{
            const pets = await Pet.findPetDead();
            if (pets) {
                response.json(pets);
            } else {
                response.status(404).json(`Il n'y a aucun animal décédé en BDD.`);
            }
        }
        catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },

    //Afficher un commentaire
    findAllComment: async (request, response) => {
        try{
        const petId = parseInt(request.params.id);
        const comments = await Pet.findAllCommentPet(petId);
        console.log(comments)
            if (comments) {
                const jason = {
                    pet: response.pet,
                    comments: comments
                }
                response.json(jason);
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
            const petId = parseInt(request.params.id);
            const pet = await Pet.findOnePet(petId);
            
            if (pet){
                console.log('mon body', request.body)
                if (request.body){
                    const editPet = {
                        id: pet.id,
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
                    console.log('log', editPet)
                    //on transmet les informations de l'animal à la fonction editPet
                    await Pet.editPet(editPet);
                    response.status(200).json({editPet});
                } else {
                    response.status(404).json('Il n\' y a rien à modifier');
                }
            } else {
                 response.status(404).json(`Cet animal numéro ${petId} n\'existe pas`);
            }
        }
        catch(error) {
            console.trace(error);
        }
    },

    //Rechercher un animal par son nom ou son ide
    findresearch: async (request, response) => {
        try {            
            if(request.body) {
                const research = {
                    valeur: request.body.research
                }
                const pets = await Pet.findresearch(request.body.research);
                if(pets){
                    response.json(pets);
                }else {
                    response.status(404).json(`Je ne trouve pas !`);
                }
            } else {
                response.status(404).json(`Cet animal n'existe pas.`);
            }
        }
        catch (error) {
            console.trace(error);
        }
    },

    //Afficher un commentaire
    findOneComment: async (request, response) => {
        try{
        const commentId = parseInt(request.params.id);
        const comment = await Pet.findOneComment(commentId);
            if (comment) {
                response.json(comment);
            } else {
                response.status(404).json(`Cet animal n'existe pas.`);
            }
        }catch(error){
            console.trace(error);
        }
    },
    
    //ajouter un commentaire a un animal
    addComment: async (request, response) => {
        const petId = parseInt(request.params.id);
        const pet = await Pet.findOnePet(petId);
        try{
            //Test si tous les champs sont renseignés
            if(pet && request.body.commentaire){
                // On recupere toutes les données envoyées par le body
                const petCommentary = {
                    pet_id: pet.id,
                    commentaire: request.body.commentaire
                };
                 //on transmet les informations de l'animal a la fonction addNewPet et on lui envois notre animal recuperer precedemment
                 const savePet = await Pet.addNewCommentPet(petCommentary);
                 response.json({savePet: petCommentary, TEXT: 'Le commentaire a bien été enregistré'});
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

    //Modifier un commentaire
    editComment:async (request, response) => {
        //const commentId = parseInt(request.params.id);
        //const comment = await Pet.findOneComment(commentId);
    }
    //
    

}

module.exports = petController;