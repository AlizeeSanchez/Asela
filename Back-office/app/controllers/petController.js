const Pet = require("../models/Pet");
const HostFamily = require("../models/HostFamily");
const QuestionnaireAdopt = require("../models/QuestionnaireAdopt");
const multer = require('multer');
const path = require('path');


const petController = {

    //Afficher un animal
    findOnePet: async (request, response, next) => {
        try{
            const petId = parseInt(request.params.id);
            const pet = await Pet.findOnePet(petId);
            const petHostFamilly = await Pet.findHostFamillyPet(petId);
            const allHostFamilly = await HostFamily.findAllHostFamily();
            const petAdoptant = await Pet.findAdoptantPet(petId);
            const imgPet = await Pet.findImgPet(petId);
            if (pet) {
                response.pet = pet;
                response.hostFamilly = petHostFamilly;
                response.allHostFamilly = allHostFamilly;
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
            if (questionnaire) {
                const jason = {
                    pet: response.pet,
                    hostFamilly: response.hostFamilly,
                    allHostFamilly : response.allHostFamilly,  
                    adoptant: response.adoptant,
                    imgPet: response.img,
                    comments: response.comments,
                    questionnaire
                }
                //console.log(jason.allHostFamilly);
                
                response.render('onePet', {
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
                if (request.body){
                        const editPet = {
                            id: pet.id,
                            date_supported: request.body.eventDate_supported,
                            name: request.body.eventName,
                            age: request.body.eventAge,
                            amity: request.body.eventAmity,
                            sexe: request.body.eventSexe,
                            breed: request.body.eventBreed,
                            color: request.body.eventColor,
                            ide: request.body.eventIde,
                            date_vaccine: request.body.eventDate_vaccine,
                            sterilised: request.body.eventSterilised,
                            description: request.body.eventDescription,
                            weight: request.body.eventWeight,
                        };
                
                    if(editPet.Date_supported){
                    editPet.date_supported === Date.parse(editPet.date_supported, 'D M YYYY');
                    } else {
                        editPet.date_supported  
                    }
                    if(editPet.date_vaccine){
                        editPet.date_vaccine === Date.parse(editPet.date_vaccine, 'D M YYYY');
                    } else {
                        editPet.date_supported  
                    }

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

    //On supprime un animal de la BDD
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

    //On passe l'adoption a true quand un chien est disponible à l'adoption.
    petSitePublish: async (request, response) => {
        try{
            const petId = parseInt(request.params.id);
            const pet = await Pet.findOnePet(petId);
            if(pet.site_publish === false){
                const petFalse = await Pet.publishSiteIsTrue(petId);
                response.json({petFalse, TEXT:'Cet animal est disponible a l\'adoption'});
            }
            else if(pet.site_publish === true){
                const petTrue = await Pet.publishSiteIsFalse(petId);
                response.json({petTrue, TEXT:'Cet animal n\'est plus disponible a l\'adoption'});
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
    },

    //Signaler qu'un animal est adopté
    petAdopt: async (request, response) => {
        try{
            const petId = parseInt(request.params.id);
            const pet = await Pet.findOnePet(petId);
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
    },

    editDateVaccine: async (request, response) => {
        try{
            const petId = parseInt(request.params.id);
            const pet = await Pet.findOnePet(petId);
            //console.log('Mon controller',request.body.dateVaccine);
            //console.log('ICI CEST ICI QUI FAUT QUEN JE REGHARDe',pet);
            
            if (request.body.dateVaccine) {
                const editDate = {
                    id: pet.id,
                    date_vaccine: request.body.dateVaccine
                }
                await Pet.editVaccinePet(editDate);
                response.status(200).json('La date du vaccin a bien été mise à jour');
            } else {
                response.json(`La date n'a pas pu être mise à jour`);
            }
        }catch(error){
            console.trace(error)
            return response.status(500).json(error.toString())
        }
    },

    editDateSupported: async (request, response) => {
        try{
            const petId = parseInt(request.params.id);
            const pet = await Pet.findOnePet(petId);
            console.log('Mon controller',request.body.dateSupported);
            
            if (request.body.dateSupported) {
                const editDate = {
                    id: pet.id,
                    date_supported: request.body.dateSupported
                }
                await Pet.editsupportedDate(editDate);
                response.status(200).json('La date de la prise en charge a bien été mise à jour');
            } else {
                response.json(`La date n'a pas pu être mise à jour`);
            }
        }catch(error){
            console.trace(error)
            return response.status(500).json(error.toString())
        }
    },

    putHostFamilyPet: async (request, response) => {
        try {
           console.log('Je suis ici');
           
            const petId = parseInt(request.params.id);
            const pet = await Pet.findOnePet(petId);
            const HF = parseInt(request.body.hostFamilyId);
            console.log(HF);
            
            if(request.body.hostFamilyId) {
                
                const familyHostPet = {
                    idPet: petId,
                    idHF: HF
                };
                await Pet.hostFamilyPet(familyHostPet);
                console.log('je suis loin',familyHostPet);
                
                response.status(200).json(`La famille d'accueil a bien été mise à jour`);
            }else {
                response.status(404).json('Cet animal n\'a pas de famille d\'acceuil')
            }
        }catch(error){
            console.trace(error);
        }
    },

    //uploadPhotoPet: async (request, response) => {
    //    try{
    //        
    //            
    //    } catch(error) {
    //        console.trace(error)
    //        return response.status(500).json(error.toString());
    //    }
    //}
       
}

module.exports = petController;