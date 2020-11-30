const Pet = require("../models/Pet");
const Host_family = require("../models/HostFamily");
const QuestionnaireAdopt = require("../models/QuestionnaireAdopt");

const petController = {

    //Afficher un animal
    findOnePet: async (request, response, next) => {
        try{
            const petId = parseInt(request.params.id);
            const pet = await Pet.findOnePet(petId);
            const petHostFamilly = await Pet.findHostFamillyPet(petId);
            const petAdoptant = await Pet.findAdoptantPet(petId);
            const imgPet = await Pet.findImgPet(petId);
            if (pet) {
                response.pet = pet;
                response.hostFamilly = petHostFamilly;
                response.adoptant = petAdoptant;
                response.img = imgPet;
                next();
            } else {
                response.status(404).json(`Cet animal n'existe pas.`);
            }
        }catch(error){
            console.trace(error);
        }
    },

    //Afficher tout les commentaires
    findAllComment: async (request, response, next) => {
        try{
        const petId = parseInt(request.params.id);
        const comments = await Pet.findAllCommentPet(petId);
        console.log(comments)
            if (comments) {
                response.comments = comments;
                next();
            } else {
                response.status(404).json(`Cet animal n'existe pas.`);
            }
        }catch(error){
            console.trace(error);
        }
    },

    //Afficher tout les questionnaires de l'animal
    findAllQuestAdoptForOnePet: async (request, response) => {
        try{
        const PetId = parseInt(request.params.id);
        const questionnaire = await QuestionnaireAdopt.findOneQuestAdoptByPetID(PetId);
        console.log(questionnaire)
            if (questionnaire) {
                const jason = {
                    pet: response.pet,
                    hostFamilly: response.hostFamilly,
                    adoptant: response.adoptant,
                    imgPet: response.img,
                    comments: comments,
                    questionnaires: questionnaire
                }
                console.log(jason);
                
                response.render('oneDog', {
                    jason
                });
            } else {
                response.status(404).json(`Cet animal n'existe pas.`);
            }
        }catch(error){
            console.trace(error);
        }
    },

    //On recupere les ANIMAUX décédés
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

    //On déclare un animal décédé
    declarationDead: async (request, response) => {
        try{
            const petId = parseInt(request.params.id);
            const pet = await Pet.findOnePet(petId);
            console.log(pet)
            if(pet.deceased === true){
                const petFalse = await Pet.editDeadPetFalse(petId);
                response.json('Cet animal a été résusité, il est de nouveau a l\'adoption');
            }
            if(pet.deceased === false){
                const petTrue = Pet.editDeadPetTrue(petId);
                response.status(200).json(`Cet animal à bien été enregistré comme décédé et dépublié.`);
            } else {
                response.status(404).json(`Cet animal numéro ${petId} n\'existe pas`);
            }
        }
        catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
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
                        date_supported: request.body.date_supported,
                        name: request.body.name,
                        age: request.body.age,
                        amity: request.body.amity,
                        sexe: request.body.sexe,
                        breed: request.body.breed,
                        color: request.body.color,
                        ide: request.body.ide,
                        date_vaccine: request.body.date_vaccine,
                        sterilised: request.body.sterilised,
                        description: request.body.description,
                        weight: request.body.weight,
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

    deleteCommentPet: async(request, response) => {
        try {
            const deleteCommentPetId = parseInt(request.params.id);
            const deleteCommentPet = await Pet.findOnePet(deleteCommentPetId); 
            if (deleteCommentPet) {
                await Pet.suppPetComment(deleteCommentPetId);
                response.status(200).json('Votre commentaire de l\'animal a bien été supprimée');
            } else {
                response.json('ce commentaire de l\'animal n\'existe pas.');
            }
        } catch (error) {
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },

    //assigne une famille d'accueil a un animal
    affectFamilyHost:async (request, response) => {
        try{
        //recuperer l'id de l'animal
        const petId = parseInt(request.params.id);
         //recuperer l'animal
        const pet = await Pet.findOnePet(petId);
        // creer une methode qui injecte dans la colone pet.host_family_id le host_family.id selectionné ( request.body.host_family_id )
        if(pet){
            const famillyId = request.body.host_family_id;
            const petToFamilly = {
                id: pet.id,
                host_family_id: parseInt(famillyId)
            };
            console.log(pet.id);
            console.log(famillyId);
            console.log(petToFamilly);
            await Pet.affectFamilyHost(petToFamilly);
            response.status(200).json(`Cet animal à bien été affecté à une FA.`);
        } else {
            response.status(404).json(`Cet animal n'existe pas.`);
        }

        }catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }

    },

    //On puisse signaler que l'animal est publié ou non sur facebook
    petStatePublishFB: async (request, response) => {
        try{
            const petId = parseInt(request.params.id);
            const pet = await Pet.findOnePet(petId);
            console.log(pet);
            if(pet.facebook_publish === false){
                const publishFacebookFalse = await Pet.publishFacebookIsTrue(petId);
                response.json('Cet animal est bien publié sur facebook');
            }
            if(pet.facebook_publish === true){
                const publishFacebookTrue = await Pet.publishFacebookIsFalse(petId);
                response.json('Cet animal n\'est pas publié sur facebook');
            } else {
                response.status(404).json(`Cet animal n'existe pas.`);
            }
        }
        catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },

    //Signaler qu'un animal est publié sur Seconde chance
    petStatePublishSC: async (request, response) => {
        try{
            const petId = parseInt(request.params.id);
            const pet = await Pet.findOnePet(petId);
            console.log(pet);
            if(pet.seconde_chance_publish === false){
                const petFalse = await Pet.publishSecondeChanceIsTrue(petId);
                response.json('Cet animal est publié sur seconde chance');
            }
            if(pet.seconde_chance_publish === true){
                const petTrue = await Pet.publishSecondeChanceIsFalse(petId);
                response.json('Cet animal n\'est pas publié sur seconde chance');
            } else {
                response.status(404).json(`Cet animal n'existe pas.`);
            }
        }
        catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },

    //Signaler qu'un animal est Reservé
    petReserve: async (request, response) => {
        try{
            const petId = parseInt(request.params.id);
            const pet = await Pet.findOnePet(petId);
            console.log(pet);
            if(pet.reserve === false){
                const petFalse = await Pet.reserveIsTrue(petId);
                response.json('Cet animal est réservé par un adoptant');
            }
            if(pet.reserve === true){
                const petTrue = await Pet.reserveIsFalse(petId);
                response.json('Cet animal n\'est pas reservé');
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

module.exports = petController;