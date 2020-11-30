const Adoptant = require("../models/Adoptant");

    const adoptantController = {

        findAllAdoptant: async (request, response) => {
            try{
                const adoptant = await Adoptant.findAllAdoptant();
                if(adoptant){
                    response.json(adoptant);
                    
                } else {
                    response.status(404).json(`Il n'y a aucun adoptant trouvés.`);
                }
            }
            catch(error){
                console.trace(error)
                return response.status(500).json(error.toString());
            }
        },
    
        findOneAdoptant: async (request, response, next) => {
            try{
                const adoptantId = parseInt(request.params.id);
                console.log('premier', adoptantId);
                
                const adoptant = await Adoptant.findOneAdoptant(adoptantId);
                console.log('second', adoptant);
                
                if(adoptant){
                    response.adoptant = adoptant;
                    next();
                }else {
                    response.status(404).json(`L'adoptant numéro ${adoptantId} n'existe pas`);
                }
            }catch(error){
                console.trace(error)
                return response.status(500).json(error.toString());
            }
        },

        // ca recupere les animaux de l'adoptant (next) (pet.adoptant_id = id de l'adoptant)
        findAllPetAdoptant: async (request, response, next) => {
            try {
                const petId = parseInt(request.params.id);
                console.log('troisieme', petId);
                
                const petAdoptant = await Adoptant.findAllPetToAdoptant(petId);
                console.log('quatrieme', petAdoptant);
                
                if(petAdoptant){
                    response.petAdoptant = petAdoptant;
                    next();
                }else {
                    response.status(404).json(`L'adoptant numéro ${petId} n'existe pas`);
                }
            }catch(error){
                console.trace(error)
                return response.status(500).json(error.toString());
            }
        },

        // recupere les commentaires de l'adoptant 
        findAllCommentAdoptant: async (request, response) => {
            try {
                const commentId = parseInt(request.params.id);
                console.log('sixieme', commentId);
                
                const commentAdoptant = await Adoptant.findAllCommentToAdoptant(commentId);
                console.log('septieme'), commentAdoptant;
                
                if(commentAdoptant){
                    const json = {
                        adoptant: response.adoptant,
                        petAdoptant: response.petAdoptant,
                        commentAdoptant
                    }
                    response.json({json, TEXT: 'Voila ce qui concerne notre adoptant'});
                    console.log(json);
                    
                }else {
                    response.status(404).json(`L'adoptant numéro ${petId} n'existe pas`);
                }
            }catch(error){
                console.trace(error)
                return response.status(500).json(error.toString());
            }
        },

        // commenter une famille d'adoptant
        commentAdoptant: async (request, response) => {
            try {
                const commentAdoptantId = parseInt(request.params.id);
                const commentAdoptant = await Adoptant.findOneAdoptant(commentAdoptantId);
                if(commentAdoptant) {
                    const comment = {
                        id: commentAdoptantId,
                        commentaire: request.body.commentaire
                    };
                    const adoptantComment = await Adoptant.addCommentAdoptant(comment);
                    response.status(200).json({ adoptantComment, TEXT: `Votre commentaire à bien été ajouter à l'adoptant ${commentAdoptantId}`});
                }else {
                    response.status(404).json('Cette famille d\'adoptant n\'a pas de commentaire')
                }
            }catch(error){
                console.trace(error);
            }
        },

        deleteCommentAdoptant: async(request, response) => {
            try {
                const deleteCommentAdoptantId = parseInt(request.params.id);
                const deleteCommentAdoptant = await Adoptant.findOneAdoptant(deleteCommentAdoptantId); 
                if (deleteCommentAdoptant) {
                    const commentAdoptantToDel = {
                        id: deleteCommentAdoptantId,
                    };
                    await Adoptant.suppCommentAdoptant(commentAdoptantToDel.id);
                    response.status(200).json('Votre commentaire de l\'adoptant a bien été supprimée');
                } else {
                    response.json('ce commentaire de l\'adoptant n\'existe pas.');
                }
            } catch (error) {
                console.trace(error)
                return response.status(500).json(error.toString());
            }
        },
    
    }

module.exports = adoptantController;