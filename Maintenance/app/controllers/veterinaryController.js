const Veterinary = require('../models/Veterinary');
const { message } = require('../schema/asela_validate');

const veterinaryController = {
    
    FindVeterinaryByDpt: async (request, response) => {
        try{
            if (request.session.user) {
                const veterinary = await Veterinary.findAllVeterinary();
                const veterinaryGard = await Veterinary.findVeterinaryByDpt30();
                const veterinaryHerault = await Veterinary.findVeterinaryByDpt34();
                const veterinaryAutre = await Veterinary.findVeterinaryByDptAutre();
                const session = request.session.user;

                if(veterinary){
                    const allveterinary = {
                        gard: veterinaryGard,
                        herault: veterinaryHerault,
                        autre: veterinaryAutre
                    }
                    response.render('veterinary', {
                        allveterinary,
                        session
                    });
                }
                else {
                    res.status(404).send({ error: 'Il n\'y a aucun veterinaire dans ces departements' });
                }
            }else{
                response.render('500');
            } 
        }catch (error){
            console.trace(error);
        } 
    }, 
    
    addVeterinary: async (request, response) => {
        try {
            if (request.session.user) {
                //Test si tous les champs sont renseignés 
                if(request.body.name && request.body.number_phone && request.body.postal_code && request.body.city && request.body.adress && request.body.email) {  
                    const dataVeterinary= request.body;
                    console.log(dataVeterinary);
                    const veterinary = await Veterinary.addVeterinary(dataVeterinary);
                    response.json({ saveVeterinary: veterinary , TEXT: 'Votre Vétérinaire à bien été enregistrer dans la liste des vétérinaires'});
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
    
    deleteVeterinary: async(request, response) => {
        try {
            if (request.session.user) {
                const veterinaryId = parseInt(request.params.id);
                const veterinary = await Veterinary.findOneVeterinary(veterinaryId);
                //Test si le veterinaire existe  
                if (veterinary) {
                    const vetToDel = {
                        id: veterinaryId
                    };
                    await Veterinary.suppVeterinary(vetToDel.id);
                    response.status(200).json('Votre vétérinaire a bien été supprimer');
                } else {
                    response.json('ce veterinaire n\'existe pas.');
                }
            }else{
                response.render('500');
            }
        }catch (error) {
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },
    
    //Modifier une famille d'acceuil
    editVeterinary: async (request, response) => {
        try {
            if (request.session.user) {
                const veterinaryId = request.body.id
                const veterinary = await Veterinary.findOneVeterinary(veterinaryId);
                if (veterinary){
                    if (request.body){
                        
                        const dataVeterinary= request.body;
                        const veterinaryEdit = await Veterinary.editVeterinary(dataVeterinary);
                        response.json({ saveVeterinary: veterinaryEdit , TEXT: 'Votre Vétérinaire a bien été mis à jours'});
                    } else{
                        response.status(404).json('Il n\' y a rien à modifier');
                    }
                } else {
                    response.status(404).json(`Ce vétérinaire numéro ${hostFamilyId} n\'existe pas`);
                }
            }else{
                response.render('500');
            }
        }catch(error) {
            console.trace(error);
        }
    },
    
    findOneVeterinary: async (request, response, next) => {
        
        try{
            if (request.session.user) {            
                const veterinaryId = parseInt(request.params.id);
                const veterinary = await Veterinary.findOneVeterinary(veterinaryId);
                if(veterinary){
                    response.veterinary = veterinary;
                    next();
                }else {
                    response.status(404).json(`le vétérinaire numéro ${veterinaryId} n'existe pas`)
                }
            }else{
                response.render('500');
            }
        }catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },
    
    
}

module.exports = veterinaryController;