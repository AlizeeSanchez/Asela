const Form = require('../models/Form.js');

const formController = {

    formAdopt: async (request, response) => {
        try{
            response.render('form');
        }
        catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },

    host_family: async (request, response) => {
        try{
            const date = new Date().toISOString().substr(0, 10);
            console.log(date);
            response.render('hostFamilly',{
                date
            });
        }
        catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }

    },


    AddNewFormHostFamilly: async (request, response) => {
        try {
            console.log('je rentre ds mon controller et je vois',request.body);
            //Test si tous les champs obligatoires sont renseignés 
            if(request.body.email && request.body.lastname) {  
                
                const dataFormHostFamily= request.body;

                //on transmet les informations de la fa à la fonction writeFormHostFamily
                const hostFamilly = await Form.writeFormHostFamily(dataFormHostFamily);
                response.json({ saveHostFamilly: hostFamilly , TEXT: 'Votre questionnaire a bien été enregistrer '});

            } else{
                    response.json('Veuillez remplir tous les champs svp');
            }   
        } catch (error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }                 
    },

    AddNewFormAdopt: async (request, response) => {
        try {
            console.log('je rentre ds mon controller et je vois',request.body.email);
            //Test si tous les champs obligatoires sont renseignés 
            if(request.body.email && request.body.lastname) {  
                
                const dataFormAdopt = request.body;
                console.log(dataFormAdopt);
                //on transmet les informations de la fa à la fonction writeFormHostFamily
                const formAdopt = await Form.writeFormAdopt(dataFormAdopt);
                response.json({ saveFormAdopt: formAdopt , TEXT: 'Votre questionnaire a bien été enregistrer '});

            } else{
                    response.json('Veuillez remplir tous les champs svp');
            }   
        } catch (error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }                 
    },
}

module.exports = formController;