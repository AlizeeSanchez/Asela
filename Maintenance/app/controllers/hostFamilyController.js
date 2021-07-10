const HostFamily = require("../models/HostFamily");

const hostFamilyController = {
    
    //On trie par dpt les familles d'acceuil
    
    findHostFamilyByDpt: async (request, response) => {
        try{
            if (request.session.user) {
                const hostFamilyAll = await HostFamily.findAllHostFamily();
                const hostFamilyGard = await HostFamily.findHostFamilyByDpt30();
                const hostFamilyHerault = await HostFamily.findHostFamilyByDpt34();
                const hostFamilyAutre = await HostFamily.findHostFamilyByDptAutre();
                const noLongerContact = await HostFamily.findHostFamilyNoContact();
                const session = request.session.user;

                if(hostFamilyAll){
                    const allHostFamilly = {
                        all: hostFamilyAll,
                        gard: hostFamilyGard,
                        herault: hostFamilyHerault,
                        autre: hostFamilyAutre,
                        ancienne: noLongerContact
                    }
                    response.render('hostFamily',{
                        allHostFamilly, session
                    });
                }else {
                    response.status(404).json('Il n\'y a aucune famille d\'acceuil dans ces departements')
                }
            }else{
                response.render('500');
            }
        }catch (error){
            console.trace(error);
        } 
    }, 
    
    addHostFamily: async (request, response) => {
        try {
            if (request.session.user) {
                if(request.body.lastname && request.body.firstname && request.body.number_phone && request.body.postal_code && request.body.city && request.body.adress && request.body.email && request.body.pet_composition && request.body.pet_accepted && request.body.disponibility && request.body.pet_asela) {
                    const saveHostFamily = {
                        lastname: request.body.lastname,
                        firstname: request.body.firstname,
                        number_phone: request.body.numberPhone,
                        postal_code: request.body.postalCode,
                        city: request.body.city,
                        adress: request.body.adress,
                        email: request.body.email,
                        pet_composition: request.body.composition,
                        pet_accepted: request.body.acceptedPet,
                        pet_asela:request.body.petAsela
                    };   
                    const addCommentHostfamilly = await HostFamily.addHostFamily(saveHostFamily);
                    response.json({ addCommentHostfamilly, TEXT: 'Votre famille d\'acceuil a bien été enregistrer'});
                } else{
                    response.json('Veuillez remplir tous les champs svp');
                }   
            }else{
                response.render('500');
            }
        } catch (error){
            console.trace(error)
            return response.status(500).json(error.toString());
        } 
    }, 
    
    deleteHostFamily: async(request, response) => {
        try {
            if (request.session.user) {
                const hostFamilyId = parseInt(request.params.id);
                const hostFamily = await HostFamily.findOneHostFamily(hostFamilyId);
                if (hostFamily) {
                    const hostFamilyToDel = {
                        id: hostFamilyId,
                    };
                    await HostFamily.suppHostFamily(hostFamilyToDel.id);
                    response.status(200).json('Votre famille d\'acceuil a bien été supprimée');
                } else {
                    response.json('cette famille d\'acceuil n\'existe pas.');
                }
            }else{
                response.render('500');
            }
            
        } catch (error) {
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },
    
    //Modifier une famille d'acceuil
    editHostFamily: async (request, response) => {
        try {
            if (request.session.user) {
                const hostFamilyId = request.params.id
                const hostFamily = await HostFamily.findOneHostFamily(hostFamilyId);
                if (hostFamily){
                    if (request.body){
                        
                        const hostFamilyEdit = await HostFamily.editHostFamily(request.body);
                        response.status(200).json({hostFamilyEdit});
                    } else{
                        response.status(404).json('Il n\' y a rien à modifier');
                    }
                } else {
                    response.status(404).json(`Cette famille d\'acceuil numéro ${hostFamilyId} n\'existe pas`);
                }
            }else{
                response.render('500');
            }
        }catch(error) {
            console.trace(error);
        }
    },
    
    commentHostFamily: async (request, response) => {
        try {
            if (request.session.user) {
                const commentHostFamilyId = parseInt(request.params.id);
                const commentHostFamily = await HostFamily.findOneHostFamily(commentHostFamilyId);
                if(commentHostFamily) {
                    const comment = {
                        id: commentHostFamilyId,
                        comment: request.body.commentHostfamilly
                    };
                    const hostFamilyComment = await HostFamily.addCommentFamilyHost(comment);
                    response.status(200).json({ hostFamilyComment, TEXT: `Votre commentaire à bien été ajouter à la famille d\'acceuil ${commentHostFamilyId}`});
                }else {
                    response.status(404).json('Cette famille d\'acceuil n\'a pas de commentaire')
                }
            }else{
                response.render('500');
            }
        }catch(error){
            console.trace(error);
        }
    },
    
    putPetHostFamily: async (request, response) => {
        try {
            if (request.session.user) {
                const petHostFamily = [];
                const hostFamilyId = parseInt(request.params.id);
                const hostFamily = await HostFamily.findOneHostFamily(hostFamilyId);
                if(hostFamily) {
                    const petFamilyHost = {
                        id: hostFamilyId,
                        lastname: request.body.lastname,
                        firstname: request.body.firstname,
                        number_phone: request.body.number_phone,
                        postal_code: request.body.postal_code,
                        city: request.body.city,
                        adress: request.body.adress,
                        email: request.body.email,
                        pet_composition: request.body.pet_composition,
                        pet_accepted: request.body.pet_accepted,
                        disponibility: request.body.disponibility, 
                        pet_asela: ' '+request.body.pet_asela
                    };
                    const hostFamilyPet = await HostFamily.petFamilyHost(petFamilyHost);
                    response.status(200).json({ petHostFamily, TEXT: `Votre animal à bien été affecté à la famille d\'acceuil ${hostFamilyId}`});
                }else {
                    response.status(404).json('Cette famille d\'acceuil n\'a pas d\'animaux')
                }
            }else{
                response.render('500');
            }
        }catch(error){
            console.trace(error);
        }
    }
}

module.exports = hostFamilyController;