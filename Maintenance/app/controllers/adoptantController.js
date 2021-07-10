const Adoptant = require("../models/Adoptant");

    const adoptantController = {
      // on recupere tous les adoptants[0]
        findAllAdoptant: async (request, response) => {
            try {
                if (request.session.user) {
                    const session = request.session.user;
                    const adoptant = await Adoptant.findAllAdoptant();
                    if(adoptant){
                        response.render('adoptants', {
                            adoptant, session
                        });        
                    }else{
                        response.status(404).json(`Il n'y a aucun adoptant`);
                    }
                }else {
                    response.render('500');
                }
            }catch(error){
                console.trace(error)
                return response.status(500).json(error.toString());
            }
        },

        //On récupere tout les animaux adoptés par un adoptant
        findAllPetAdoptant: async (request, response) => {
            try {
                if (request.session.user) {
                    const session = request.session.user;
                    const id = parseInt(request.params.id);
                    const adoptant = await Adoptant.findOneAdoptant(id);
                    const petAdopt = await Adoptant.findAllPetToAdoptant(id);
                    const commentAdoptant = await Adoptant.findAllCommentToAdoptant(id);
                    const correspondance = await Adoptant.correspondanceSearch(adoptant);
                    if(adoptant){          
                        response.render('oneAdoptant', {
                            petAdopt, commentAdoptant, adoptant, correspondance, session
                        }); 
                    }else {
                    response.status(404).json(`Il n'y a aucun adoptant`);
                    }
                }else{
                response.render('500');
                }
            }catch(error){
                console.trace(error)
                return response.status(500).json(error.toString());
            }
        },

        // commenter une famille d'adoptant
        commentAdoptant: async (request, response) => {
            try {
                if (request.session.user) {
                    const adoptantId = parseInt(request.params.id);
                    const commentAdoptant = await Adoptant.findOneAdoptant(adoptantId);
                    if(commentAdoptant) {
                        const comment = {
                            adoptant_id: adoptantId,
                            commentaire: request.body.commentAdoptant,
                        };
                        const adoptantComment = await Adoptant.addCommentAdoptant(comment);
                        response.status(200).json({ adoptantComment, TEXT: `Votre commentaire à bien été ajouter à l'adoptant ${adoptantId}`});
                    }else {
                        response.status(404).json('Cette famille d\'adoptant n\'a pas de commentaire')
                    }
                }else{
                    response.render('500');
                }
            }catch(error){
                console.trace(error);
            }
        },

        // commenter une famille d'adoptant
        editComment: async (request, response) => {
            try {
                if (request.session.user) {
                    const commentId = parseInt(request.params.id);
                    const commentaire = await Adoptant.findOneComment(commentId);
                    if(commentaire) {
                        const comment = {
                            id: commentId,
                            commentaire: request.body.commentaire,
                        };
                        const editComment = await Adoptant.editCommentAdoptant(comment);
                        response.status(200).json({ editComment, TEXT: `Votre commentaire à bien été modifié`});
                    }else {
                        response.status(404).json('Cette famille d\'adoptant n\'a pas de commentaire')
                    }
                }else{
                    response.render('500');
                }
            }catch(error){
                console.trace(error);
            }
        },

        deleteCommentAdoptant: async(request, response) => {
            try {
                if (request.session.user) {
                    const commentId = parseInt(request.params.id);
                    const commentaire = await Adoptant.findOneComment(commentId);
                    if (commentaire) {
                        await Adoptant.suppCommentAdoptant(commentId);
                        response.status(200).json('Votre commentaire de l\'adoptant a bien été supprimée');
                    } else {
                        response.json('ce commentaire de l\'adoptant n\'existe pas.');
                    }
                }else{
                    response.render('500');
                }
            } catch (error) {
                console.trace(error)
                return response.status(500).json(error.toString());
            }
        },

        addAdoptant: async (request, response) => {
            try {
                if (request.session.user) {
                    //Test si tous les champs sont renseignés 
                    if(request.body.lastname && request.body.firstname && request.body.number_phone && request.body.postal_code && request.body.city && request.body.adress && request.body.email) {  
                        const dataAdoptant= request.body;
                        const adoptant = await Adoptant.addAdoptant(dataAdoptant);
                        response.json({ saveAdoptant: adoptant , TEXT: 'Votre adoptant a bien été enregistrer dans la liste des adoptants'});
                    
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
    
    }

module.exports = adoptantController;