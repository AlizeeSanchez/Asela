const Blacklist = require("../models/Blacklist");
const Hostfamily = require("../models/HostFamily");

const blacklistController = {
    
    findAllBlacklist: async (request, response) => {
        try {
            if (request.session.user) {
                const blacklists = await Blacklist.findAllBlacklist();
                if(blacklists){
                    response.render('blacklist', {
                        blacklists
                    });  
                }else {
                    response.status(404).json(`Il n'y a aucun blacklister`);
                }
            }else{
                response.render('500');
            }
        }catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },

    findOneBlacklist: async (request, response) => {
        try{
            if (request.session.user) {
                const blacklistId = parseInt(request.params.id);
                const blacklist = await Blacklist.findOneBlacklist(blacklistId);
                if(blacklist){
                    response.json(blacklist)
                }else {
                    response.status(404).json(`le blacklister numéro ${blacklistId} n'existe pas`)
                }
            }else{
                response.render('500');
            }
        }catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },

    addBlacklister: async (request, response) => {
        try {
            if (request.session.user) {
                 //Test si la famille d'acceuil existe  
                if(request.body) {
                    const data = [{
                        number_id_passport: request.body.number_id_passport,
                        lastname: request.body.lastname,
                        firstname: request.body.firstname,
                        postal_code: request.body.postal_code,
                        city: request.body.city,
                        adress: request.body.adress,
                        number_phone: request.body.number_phone,
                        comment: request.body.comment,
                        email: request.body.email
                    }]
                   const blacklistercontrol = await Blacklist.controlBlackList(data);
                    if(!blacklistercontrol){
                        //on transmet les informations du chat à la fonction addNewCat
                        const saveBlacklist = await Blacklist.addBlacklister(data);
                        response.json({ saveBlacklist: saveBlacklist , TEXT: `${data.lastname} ${data.firstname} a bien été enregistrer dans la blacklist`});
                    }else{
                        response.json({ TEXT: `Cette personne existe déjà en blackliste`});
                    }
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

    addBlacklisterAdoptant: async (request, response) => {
        try {
            if (request.session.user) {
                const id = parseInt(request.params.id)
                const hostFamily =  await Hostfamily.findOneHostFamily(id);
                 //Test si la famille d'acceuil existe  
                if(hostFamily) {
                    data = {
                        lastname: hostFamily[0].lastname,
                        firstname: hostFamily[0].firstname,
                        postal_code: hostFamily[0].postal_code,
                        number_phone: hostFamily[0].number_phone,
                        city: hostFamily[0].city,
                        email: hostFamily[0].email
                    }
                   const blacklistercontrol = await Blacklist.controlBlackList(data);
                    if(!blacklistercontrol){
                        //on transmet les informations du chat à la fonction addNewCat
                        const saveBlacklist = await Blacklist.addBlacklister(hostFamily);
                        if(saveBlacklist || blacklistercontrol){
                            const updateFA = await Blacklist.black_list_FA(id);
                        }
                        response.json({ saveBlacklist: saveBlacklist , TEXT: `${hostFamily.lastname} ${hostFamily.firstname} a bien été enregistrer dans la blacklist`});
                    }else{
                        response.json({ TEXT: `Cette personne existe déjà en blackliste`});
                    }                } else{
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

    addBlacklisterFA: async (request, response) => {
        try {
            if (request.session.user) {
                const id = parseInt(request.params.id)
                const hostFamily =  await Hostfamily.findOneHostFamily(id);
                 //Test si la famille d'acceuil existe  
                if(hostFamily) {
                    data = {
                        lastname: hostFamily[0].lastname,
                        firstname: hostFamily[0].firstname,
                        postal_code: hostFamily[0].postal_code,
                        number_phone: hostFamily[0].number_phone,
                        city: hostFamily[0].city,
                        email: hostFamily[0].email
                    }
                   const blacklistercontrol = await Blacklist.controlBlackList(data);
                    if(!blacklistercontrol){
                        //on transmet les informations du chat à la fonction addNewCat
                        const saveBlacklist = await Blacklist.addBlacklister(hostFamily);
                        if(saveBlacklist || blacklistercontrol){
                            const updateFA = await Blacklist.black_list_FA(id);
                        }
                        response.json({ saveBlacklist: saveBlacklist , TEXT: `${hostFamily.lastname} ${hostFamily.firstname} a bien été enregistrer dans la blacklist`});
                    }else{
                        response.json({ TEXT: `Cette personne existe déjà en blackliste`});
                    }
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

    suppBlacklister: async (request, response) => {
        try {
            if (request.session.user) {
                const blacklistId = parseInt(request.params.id);
                const blacklist = await Blacklist.findOneBlacklist(blacklistId);
                if (blacklist) {
                    const delBlacklist = await Blacklist.suppBlacklister(blacklistId);
                    if(delBlacklist){
                        await Blacklist.purifedFA(blacklist.email);
                        await Blacklist.purifedAdoptant(blacklist.email);
                    }
                    response.status(200).json('Votre personne a bien été supprimer de la blacklist');
                } else {
                    response.json('cette personne n\'existe pas en blacklist.');
                }
            }else{
                response.render('500');
            }
        } catch (error) {
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    }
}

module.exports = blacklistController;