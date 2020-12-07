const Veterinary = require('../models/Veterinary');

const veterinaryController = {

    FindVeterinaryByDpt: async (request, response) => {
        try{
            const veterinary = await Veterinary.findAllVeterinary();
            const veterinaryGard = await Veterinary.findVeterinaryByDpt30();
            const veterinaryHerault = await Veterinary.findVeterinaryByDpt34();
            const veterinaryAutre = await Veterinary.findVeterinaryByDptAutre();

            if(veterinary){
                const allveterinary = {
                    gard: veterinaryGard,
                    herault: veterinaryHerault,
                    autre: veterinaryAutre
                }
                response.render('veterinary', {
                    allveterinary
                });
            }
            else {
                 response.status(404).json('Il n\'y a aucun veterinaire dans ces departements')
             }
        }catch (error){
            console.trace(error);
        } 
    }, 
    
    addVeterinary: async (request, response) => {
        try {
            //Test si tous les champs sont renseignés 
            if(request.body.name && request.body.number_phone && request.body.postal_code && request.body.city && request.body.adress && request.body.email && request.body.price_ide_eval && request.body.price_vaccine_eval && request.body.price_cat_eval && request.body.price_litledog_eval && request.body.price_bigdog_eval) {  
                const veterinary= {
                    name: request.body.name,
                    number_phone: request.body.number_phone,
                    postal_code: request.body.postal_code,
                    city: request.body.city,
                    adress: request.body.adress,
                    email: request.body.email,
                    price_ide_eval: request.body.price_ide_eval,
                    price_vaccine_eval: request.body.sterilized,
                    description: request.body.price_vaccine_eval,
                    price_cat_eval: request.body.price_cat_eval,
                    price_littledog_eval: request.body.price_littledog_eval,
                    price_bigdog_eval: request.body.price_bigdog_eval,
                };
                //on transmet les informations du membre a la fonction createMember
                const saveVeterinary = await Veterinary.addVeterinary(veterinary);
                response.json({ saveVeterinary: saveVeterinary , TEXT: 'Votre Vétérinaire a bien été enregistrer dans la liste des vétérinaires'});
                //response.json('Votre chat a bien été enregistrer dans la liste des adoptés');

            } else{
                    response.json('Veuillez remplir tous les champs svp');
            }   
        } catch (error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }                 
    },

    deleteVeterinary: async(request, response) => {
        try {
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
        } catch (error) {
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },

    //Modifier une famille d'acceuil
    editVeterinary: async (request, response) => {
        try {
            const veterinaryId = request.params.id
            const veterinary = await Veterinary.findOneVeterinary(veterinaryId);
            if (veterinary){
                if (request.body){
                    const editVeterinary = {
                        id: veterinaryId,
                        name: request.body.name,
                        number_phone: request.body.number_phone,
                        postal_code: request.body.postal_code,
                        city: request.body.city,
                        adress: request.body.adress,
                        email: request.body.email,
                        price_ide_eval: request.body.price_ide_eval,
                        price_vaccine_eval: request.body.price_vaccine_eval,
                        price_cat_eval: request.body.price_cat_eval,
                        price_litledog_eval: request.body.price_litledog_eval,
                        price_bigdog_eval: request.body.price_bigdog_eval,
                    };
                    //on transmet les informations du veterinaire à la fonction editVeterinary
                    const veterinaryEdit = await Veterinary.editVeterinary(editVeterinary);
                    response.status(200).json({veterinaryEdit});
                } else{
                    response.status(404).json('Il n\' y a rien à modifier');
                }
            } else {
                 response.status(404).json(`Ce vétérinaire numéro ${hostFamilyId} n\'existe pas`);
            }
        }
        catch(error) {
            console.trace(error);
        }
    },

    findOneVeterinary: async (request, response, next) => {
        try{
            const veterinaryId = parseInt(request.params.id);
            const veterinary = await Veterinary.findOneVeterinary(veterinaryId);
            if(veterinary){
                response.veterinary = veterinary;
                next();
            }else {
                response.status(404).json(`le vétérinaire numéro ${veterinaryId} n'existe pas`)
            }
        }catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },

    findAllPrice: async (request, response) => {
        try{
            const priceVeterinary = await Veterinary.findAllPrice();
            if(priceVeterinary){
                const json = {
                    veterinary: response.veterinary,
                    price: priceVeterinary
                }
                response.json(json);   
                
            } else {
                response.status(404).json(`Il n'y a aucun prix pour ce vétérinaire trouvés.`);
            }
        }
        catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },

    addPriceVeterinary: async (request, response) => {
        try {
            //Test si tous les champs sont renseignés 
            if(request.body.veterinary_id && request.body.price) {  
                const priceVeterinary= {
                    veterinary_id: request.body.veterinary_id,
                    price: request.body.price,
                };
                //on transmet les informations du membre a la fonction createMember
                const savePriceVeterinary = await Veterinary.addPriceVeterinary(priceVeterinary);
                response.json({ savePriceVeterinary: savePriceVeterinary , TEXT: 'Votre Prix de ce Vétérinaire a bien été enregistrer dans la liste des prix du vétérinaires'});
            } else{
                    response.json('Veuillez remplir tous les champs svp');
            }   
        } catch (error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }                 
    },

    deletePriceVeterinary: async(request, response) => {
        try {
            const veterinaryPriceId = parseInt(request.params.id);
            const veterinaryPrice = await Veterinary.findOneVeterinary(veterinaryPriceId);
                //Test si le prix du veterinaire existe  
            if (veterinaryPrice) {
                const veterinaryPriceToDel = {
                    id: veterinaryPriceId
                };
                await Veterinary.suppVeterinaryPrice(veterinaryPriceToDel.id);
                response.status(200).json('Votre prix de ce vétérinaire a bien été supprimé');
            } else {
                response.json('ce prix de ce vétérinaire n\'existe pas.');
            }
        } catch (error) {
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },

    editPriceVeterinary: async (request, response) => {
        try {
            const veterinaryPriceId = request.params.id
            const veterinaryPrice = await Veterinary.findOneVeterinaryPrice(veterinaryPriceId);
            if (veterinaryPrice){
                if (request.body){
                    const editPriceVeterinary = {
                        id: veterinaryPriceId,
                        veterinary_id: request.body.veterinary_id,
                        price: request.body.price 
                    };
                    console.log('tableaux a modifier', editPriceVeterinary);
                    
                    //on transmet les informations du veterinaire à la fonction editVeterinary
                    const veterinaryPriceEdit = await Veterinary.editVeterinaryPrice(editPriceVeterinary);
                    console.log('modification',veterinaryPriceEdit);
                    response.status(200).json({veterinaryPriceEdit});
                } else{
                    response.status(404).json('Il n\' y a rien à modifier');
                }
            } else {
                 response.status(404).json(`Ce prix de ce vétérinaire numéro ${veterinaryPriceId} n\'existe pas`);
            }
        }
        catch(error) {
            console.trace(error);
        }
    }
    
}

module.exports = veterinaryController;