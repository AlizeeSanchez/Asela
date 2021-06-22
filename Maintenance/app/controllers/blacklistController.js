const Blacklist = require("../models/Blacklist");

const blacklistController = {
    findAllBlacklist: async (request, response) => {
        try {
            const blacklists = await Blacklist.findAllBlacklist();
            if(blacklists){
                response.render('blacklist', {
                    blacklists
                });  
                    
            }
            else {
                response.status(404).json(`Il n'y a aucun blacklister`);
            }
        }catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },

    findOneBlacklist: async (request, response) => {
        try{
            const blacklistId = parseInt(request.params.id);
            const blacklist = await Blacklist.findOneBlacklist(blacklistId);
            if(blacklist){
                response.json(blacklist)
            }else {
                response.status(404).json(`le blacklister numéro ${blacklistId} n'existe pas`)
            }
        }catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },

    addBlacklister: async (request, response) => {
        try {
             //Test si tous les champs sont renseignés 
            if(request.body.lastname && request.body.firstname && request.body.number_phone && request.body.postal_code && request.body.city && request.body.adress && request.body.email) {
                const blacklist= {
                    number_id_passport: request.body.number_id_passport,
                    lastname: request.body.lastname,
                    firstname: request.body.firstname,
                    postal_code: request.body.postal_code,
                    number_phone: request.body.number_phone,
                    city: request.body.city,
                    email: request.body.email,
                    adress: request.body.adress,
                    comment: request.body.comment,
                    date: request.body.date
                };
                //on transmet les informations du chat à la fonction addNewCat
                const saveBlacklist = await Blacklist.addBlacklister(blacklist);
                response.json({ saveBlacklist: blacklist , TEXT: 'Votre personne a bien été enregistrer dans la blacklist'});
            } else{
                response.json('Veuillez remplir tous les champs svp');
        }  
        } catch (error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }   
    },

    suppBlacklister: async (request, response) => {
        try {
            console.log('je rentre dans mon controller');
            const blacklistId = parseInt(request.params.id);
            console.log(blacklistId);
            const blacklist = await Blacklist.findOneBlacklist(blacklisttId);
            console.log('mon blacklister', blacklist);
                //Test si la personne existe existe  
            if (blacklist) {
                const blacklistToDel = {
                    id: blacklistId,
                };
            console.log('objet blacklisttodel', blacklistToDel);
                await Blacklist.suppBlacklister(blacklistToDel.id);
                response.status(200).json('Votre personne a bien été supprimer de la blacklist');
            } else {
                response.json('cette personne n\'existe pas en blacklist.');
            }
        } catch (error) {
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    }
}

module.exports = blacklistController;