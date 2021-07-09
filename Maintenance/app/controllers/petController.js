const Pet = require("../models/Pet");
const HostFamily = require("../models/HostFamily");
const QuestionnaireAdopt = require("../models/QuestionnaireAdopt");

const petController = {
    
    //Afficher tout les questionnaires de l'animal
    findOnePetWhithAllData: async (request, response) => {
        try{
            if (request.session.user) {
                const petId = parseInt(request.params.id);
                const pet = await Pet.findOnePet(petId);
                const hostFamilly = await Pet.findHostFamillyPet(petId);
                const allHostFamilly = await HostFamily.findAllHostFamily();
                const adoptant = await Pet.findAdoptantPet(petId);
                const imgPet = await Pet.findImgPet(petId);
                const comments = await Pet.findAllCommentPet(petId);
                const questionnaire = await QuestionnaireAdopt.findOneQuestAdoptByPetID(petId);
                if (pet) {                
                    response.render('onePet', {
                        pet, hostFamilly, allHostFamilly, adoptant, imgPet, comments, questionnaire
                    });
                }else{
                    response.render('500');
                }
            } else {
                response.status(404).json(`Cet animal n'existe pas.`);
            }
        }catch(error){
            console.trace(error);
        }
    },
    
    //On déclare un animal décédé
    declarationDead: async (request, response) => {
        try{
            if (request.session.user) {
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
            }else{
                response.render('500');
            }
        }catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },
    
    
    //Modifier un animal
    editPet: async (request, response) => {
        try {
            if (request.session.user) {
                const petId = parseInt(request.params.id);
                const pet = await Pet.findOnePet(petId);
                
                if (pet){
                    if (request.body){
                        const editPet = {
                            id: pet.id,
                            name: request.body.eventName,
                            age: request.body.eventAge,
                            amity: request.body.eventAmity,
                            sexe: request.body.eventSexe,
                            breed: request.body.eventBreed,
                            color: request.body.eventColor,
                            ide: request.body.eventIde,
                            sterilised: request.body.eventSterilised,
                            description: request.body.eventDescription,
                            weight: request.body.eventWeight,
                            avatar: request.body.eventAvatar
                        };
                        //on transmet les informations de l'animal à la fonction editPet
                        await Pet.editPet(editPet);
                        response.status(200).json({editPet});
                        
                        
                    } else {
                        response.status(404).json('Il n\' y a rien à modifier');
                    }
                } else {
                    response.status(404).json(`Cet animal numéro ${petId} n\'existe pas`);
                }
            }else{
                response.render('500');
            }
        }catch(error) {
            console.trace(error);
        }
    },
    
    //Afficher un commentaire
    findOneComment: async (request, response) => {
        
        try{
            if (request.session.user) {
                const commentId = parseInt(request.params.id);
                const comment = await Pet.findOneComment(commentId);
                if (comment) {
                    response.json(comment);
                } else {
                    response.status(404).json(`Cet animal n'existe pas.`);
                }
            }else{
                response.render('500');
            }
        }catch(error){
            console.trace(error);
        }
    },
    
    //ajouter un commentaire a un animal
    addComment: async (request, response) => {
        
        try{ 
            if (request.session.user) {
                const petId = parseInt(request.params.id);
                const pet = await Pet.findOnePet(petId);
                //Test si tous les champs sont renseignés
                if(pet && request.body.commentPet){
                    // On recupere toutes les données envoyées par le body
                    const petCommentary = {
                        pet_id: petId,
                        commentaire: request.body.commentPet,
                    };
                    //on transmet les informations de l'animal a la fonction addNewPet et on lui envois notre animal recuperer precedemment
                    const savePet = await Pet.addNewCommentPet(petCommentary);
                    response.json({savePet: petCommentary, TEXT: 'Le commentaire a bien été enregistré'});
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
    
    //On supprime un animal de la BDD
    deleteCommentPet: async(request, response) => {
        try {
            if (request.session.user) {
                const deleteCommentPetId = parseInt(request.params.id);
                const deleteCommentPet = await Pet.findOnePet(deleteCommentPetId); 
                if (deleteCommentPet) {
                    await Pet.suppPetComment(deleteCommentPetId);
                    response.status(200).json('Votre commentaire de l\'animal a bien été supprimée');
                } else {
                    response.json('ce commentaire de l\'animal n\'existe pas.');
                }
            }else{
                response.render('500');
            }
        }catch (error) {
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },
    
    //assigne une famille d'accueil a un animal
    affectFamilyHost:async (request, response) => {
        try{
            if (request.session.user) {
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
            }else{
                response.render('500');
            }
        }catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },
    
    //On passe l'adoption a true quand un chien est disponible à l'adoption.
    petSitePublish: async (request, response) => {
        try{
            if (request.session.user) {
                const petId = parseInt(request.params.id);
                const pet = await Pet.findOnePet(petId);
                if(pet.site_publish === false){
                    const petFalse = await Pet.publishSiteIsTrue(petId);
                    response.json({petFalse, TEXT:'Cet animal est disponible a l\'adoption'});
                    
                }else if(pet.site_publish === true){
                    const petTrue = await Pet.publishSiteIsFalse(petId);
                    response.json({petTrue, TEXT:'Cet animal n\'est plus disponible a l\'adoption'});
                } else {
                    response.status(404).json(`Cet animal n'existe pas.`);
                }
            }else{
                response.render('500');
            }
        }
        catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },
    
    //Signaler qu'un animal est Reservé
    petBooked: async (request, response) => {
        try{
            if (request.session.user) {
                const petId = parseInt(request.params.id);
                const pet = await Pet.findOnePet(petId);
                const file = {
                    id: petId,
                    name: request.body.name
                }
                if(pet.booked === false){
                    //test if file exist and supprime file for save new file
                    if(file) {
                        const bookFalse = await Pet.bookedIsTrue(file);
                        response.json({bookFalse, TEXT:'Cet animal est reservé'});
                        return;
                    }            
                } else if(pet.booked === true){
                    const bookTrue = await Pet.bookedIsFalse(file);
                    response.json({bookTrue, TEXT:'Cet animal n\' est plus reservé'});
                } else {
                    response.status(404).json(`Une erreur c'est produite.`);
                }
            }else{
                response.render('500');
            }
        }catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },
    
    //Signaler qu'un animal est adopté
    petAdopt: async (request, response) => {
        try{
            if (request.session.user) {
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
            }else{
                response.render('500');
            }
        }catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },
    
    editDateVaccine: async (request, response) => {
        try{
            if (request.session.user) {
                const petId = parseInt(request.params.id);
                const pet = await Pet.findOnePet(petId);
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
            }else{
                response.render('500');
            }
        }catch(error){
            console.trace(error)
            return response.status(500).json(error.toString())
        }
    },
    
    editDateSupported: async (request, response) => {
        try{
            if (request.session.user) {
                const petId = parseInt(request.params.id);
                const pet = await Pet.findOnePet(petId);
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
            }else{
                response.render('500');
            }
        }catch(error){
            console.trace(error)
            return response.status(500).json(error.toString())
        }
    },
    
    putHostFamilyPet: async (request, response) => {
        try {
            if (request.session.user) {
                const petId = parseInt(request.params.id);
                const pet = await Pet.findOnePet(petId);
                const HF = parseInt(request.body.hostFamilyId);
                if(request.body.hostFamilyId) {
                    const familyHostPet = {
                        idPet: petId,
                        idHF: HF
                    };
                    await Pet.hostFamilyPet(familyHostPet);
                    
                    response.status(200).json(`La famille d'accueil a bien été mise à jour`);
                }else {
                    response.status(404).json('Cet animal n\'a pas de famille d\'acceuil')
                }
            }else{
                response.render('500');
            }
            
        }catch(error){
            console.trace(error);
        }
    },
    
    suppPet: async (request, response) => {
        try{
            if (request.session.user) {
                const petId = parseInt(request.params.id);
                const pet = await Pet.findOnePet(petId);
                if(pet){
                    const pet = await Pet.suppPet(petId)
                    response.json('Cet animal a été supprimé avec succès.')
                    
                } else {
                    response.json('Cet animal ne peut pas etre supprimer car il n\'existe pas.');
                }
            }else{
                response.render('500');
            }
        }catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }  
    },
    
    suppPhoto: async (request, response) => {
        try{
            if (request.session.user) {
                const imgId = parseInt(request.params.id);
                const img = await Pet.suppPhoto(imgId)   
                response.json('Cet photo a été supprimé avec succès.')  
            }else{
                response.render('500');
            }
        }
        catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }  
    },
    
    suppComment : async (request, response) => {
        try{
            if (request.session.user) {
                const commentId = parseInt(request.params.id);
                const suppComment = await Pet.suppComment(commentId)
                response.json('Ce commentaire a été supprimé avec succès.')
            }else{
                response.render('500');
            }
        }
        catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }  
    },
    
    
    
    
    
}
module.exports = petController;