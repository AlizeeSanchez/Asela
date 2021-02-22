const HostFamily = require("../models/HostFamily");

const hostFamilyController = {

    //On trie par dpt les familles d'acceuil

    findHostFamilyByDpt: async (request, response) => {
        try{
            const hostFamilyAll = await HostFamily.findAllHostFamily();
            const hostFamilyGard = await HostFamily.findHostFamilyByDpt30();
            const hostFamilyHerault = await HostFamily.findHostFamilyByDpt34();
            const hostFamilyAutre = await HostFamily.findHostFamilyByDptAutre();

            if(hostFamilyAll){
                const allHostFamilly = {
                    all: hostFamilyAll,
                    gard: hostFamilyGard,
                    herault: hostFamilyHerault,
                    autre: hostFamilyAutre
                }
                response.render('hostFamily',{
                    allHostFamilly
                });
            }

            else {
                 response.status(404).json('Il n\'y a aucune famille d\'acceuil dans ces departements')
             }
        }catch (error){
            console.trace(error);
        } 
    }, 

    findAllCommentHostFamily: async (request, response) => {
        try{
            const commentHostFamily = await HostFamily.findAllCommentHostFamily();
            if(commentHostFamily){
                const allHostFamilly = {
                    gard: response.hostFamilyGard,
                    herault: response.hostFamilyHerault,
                    autre: response.hostFamilyAutre,
                    comments: commentHostFamily 
                }
                response.render('hostFamily',{
                    allHostFamilly
                });    
                
            } else {
                response.status(404).json(`Il n'y a aucun commentaire pour cette famille d'acceuil trouvés.`);
            }
        }
        catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },

    addHostFamily: async (request, response) => {
        try {
            //Test si tous les champs sont renseignés 
            if(request.body.lastname && request.body.firstname && request.body.number_phone && request.body.postal_code && request.body.city && request.body.adress && request.body.email && request.body.pet_composition && request.body.pet_accepted && request.body.disponibility && request.body.pet_asela) {
                 const saveHostFamily = {
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
                    pet_asela:request.body.pet_asela
                 };   

                //on transmet les informations du membre a la fonction createMember
                 await HostFamily.addHostFamily(saveHostFamily);
                response.json({ saveHostFamily , TEXT: 'Votre famille d\'acceuil a bien été enregistrer'});
             

            } else{
                    response.json('Veuillez remplir tous les champs svp');
            }   
        } catch (error){
            console.trace(error)
            return response.status(500).json(error.toString());
        } 
    }, 
    
    deleteHostFamily: async(request, response) => {
        try {
            const hostFamilyId = parseInt(request.params.id);
            const hostFamily = await HostFamily.findOneHostFamily(hostFamilyId);
                //Test si le chat existe  
            if (hostFamily) {
                const hostFamilyToDel = {
                    id: hostFamilyId,
                };
                await HostFamily.suppHostFamily(hostFamilyToDel.id);
                response.status(200).json('Votre famille d\'acceuil a bien été supprimée');
            } else {
                response.json('cette famille d\'acceuil n\'existe pas.');
            }
        } catch (error) {
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },

    //Modifier une famille d'acceuil
    editHostFamily: async (request, response) => {
        try {
            const hostFamilyId = request.params.id
            const hostFamily = await HostFamily.findOneHostFamily(hostFamilyId);
            
            if (hostFamily){
                if (request.body){
                    console.log('request.body =',request.body);
                    
                    const editHostFamily = {
                        id: hostFamilyId,
                        lastname: request.body.eventLastname,
                        firstname: request.body.eventFirstname,
                        number_phone: request.body.eventNumberPhone,
                        postal_code: request.body.eventPostalCode,
                        city: request.body.eventCity,
                        adress: request.body.eventAdress,
                        email: request.body.eventEmail,
                        pet_composition: request.body.eventComposition,
                        pet_accepted: request.body.eventAcceptedPet,
                        disponibility: request.body.eventDisponibility,
                        pet_asela: request.body.eventPetAsela,
                    };
                    console.log('troisieme',editHostFamily);
                    //on transmet les informations de l'animal à la fonction editPet
                    const hostFamilyEdit = await HostFamily.editHostFamily(editHostFamily);
                    response.status(200).json({hostFamilyEdit});
                } else{
                    response.status(404).json('Il n\' y a rien à modifier');
                }
            } else {
                 response.status(404).json(`Cette famille d\'acceuil numéro ${hostFamilyId} n\'existe pas`);
            }
        }
        catch(error) {
            console.trace(error);
        }
    },

    commentHostFamily: async (request, response) => {
        try {
            const commentHostFamilyId = parseInt(request.params.id);
            const commentHostFamily = await HostFamily.findOneHostFamily(commentHostFamilyId);
            if(commentHostFamily) {
                const comment = {
                    id: commentHostFamilyId,
                    commentaire: request.body.commentaire
                };
                const hostFamilyComment = await HostFamily.addCommentFamilyHost(comment);
                response.status(200).json({ hostFamilyComment, TEXT: `Votre commentaire à bien été ajouter à la famille d\'acceuil ${commentHostFamilyId}`});
            }else {
                response.status(404).json('Cette famille d\'acceuil n\'a pas de commentaire')
            }
        }catch(error){
            console.trace(error);
        }
    },

    editCommentHostFamily: async (request, response) => {
        try {
            const editCommentHostFamilyId = parseInt(request.params.id);
            console.log('premier',editCommentHostFamilyId);
            
            const editCommentHostFamily = await HostFamily.findOneHostFamily(editCommentHostFamilyId);
            console.log('deuxieme', editCommentHostFamily);
            
            if(editCommentHostFamily) {
                if(request.body) {
                    const editComment = {
                        id: editCommentHostFamilyId,
                        commentaire: request.body.commentaire
                    };
                    const hostFamilyEdit = await HostFamily.editCommentHostFamily(editComment);
                    response.status(200).json({ hostFamilyEdit, TEXT: `Votre commentaire à bien été modifié sur la famille d\'acceuil numero ${editCommentHostFamilyId}` });  
                }
                else {
                    response.status(404).json('Ce commentaire n\'a pas été modifié');
                }
                response.status(404).json(`Cette famille d\'acceuil numéro ${hostFamilyId} n\'existe pas`);
            }
        } catch(error){
            console.trace(error);
        }
    },

    deleteCommentHostFamily: async(request, response) => {
        try {
            const deleteCommentHostFamilyId = parseInt(request.params.id);
            const deleteCommentHostFamily = await HostFamily.findOneHostFamily(deleteCommentHostFamilyId); 
            if (deleteCommentHostFamily) {
                const commentHostFamilyToDel = {
                    id: deleteCommentHostFamilyId,
                };
                await HostFamily.suppCommentHostFamily(commentHostFamilyToDel.id);
                response.status(200).json('Votre commentaire de la famille d\'acceuil a bien été supprimée');
            } else {
                response.json('ce commentaire de la famille d\'acceuil n\'existe pas.');
            }
        } catch (error) {
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },

    putPetHostFamily: async (request, response) => {
        try {
            const petHostFamily = [];
            const hostFamilyId = parseInt(request.params.id);
            const hostFamily = await HostFamily.findOneHostFamily(hostFamilyId);
            console.log('cinquieme', hostFamily);
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
        }catch(error){
            console.trace(error);
        }
    }

}

module.exports = hostFamilyController;