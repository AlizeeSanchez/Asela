const Cat = require("../models/Cat");

const catController = {

    allCatsNotAdopted: async (request, response) => {
        try{
            const cats = await Cat.findCatNotAdopted();
            if(cats){
                response.json(cats);
            } else {
                response.status(404).json(`Il n'y a aucun chats trouvés qui ne sont pas adoptés.`);
            }
        }
        catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },

    allCatsDead: async (request, response) => {
        try{
            const cats = await Cat.findPetDead();
            if(cats){
                response.json(cats);
            } else {
                response.status(404).json(`Il n'y a aucun chat décédé en bdd.`);
            }
        }
        catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },

    allCatsAdopted: async (request, response) => {
        try{
            const cats = await Cat.findCatAdopted();
            if (cats) {
                response.json(cats);
            } else {
                response.status(404).json(`Il n'y a aucun chats trouvés qui sont adoptés.`);
            }
        }
        catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },

     //On passe l'adoption a true quand un chat est disponible à l'adoption.
     catNotAvailable: async (request, response) => {
        try{
            const catId = parseInt(request.params.id);
            const cat = await Cat.adoptCatIsTrue(catId);
            if (cat) {
                response.json('Ce chat à bien étais mis dans la liste d\'adoption');
            } else {
                response.status(404).json(`Ce chat n'est pas disponible pour une adoption.`);
            }
        }
        catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },

     //On passe l'adoption a false quand un chat est de retour à l'adoption.
     catAvailableToAdopt: async (request, response) => {
        try{
            const catId = parseInt(request.params.id);
            const cat = await Cat.adoptCatIsFalse(catId);
            if (cat) {
                response.json('Ce chat à étais bien enlevé de la liste d\'adoption');
            } else {
                response.status(404).json(`Ce chat est de nouveau disponible pour une adoption.`);
            }
        }
        catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },

    AddNewCatToAdopt: async (request, response) => {
        try {
            //Test si tous les champs sont renseignés 
            if(request.body.name && request.body.age && request.body.sexe && request.body.description) {  
                const cat= {
                    type: 'chat',
                    name: request.body.name,
                    age: request.body.age,
                    amity: request.body.amity,
                    sexe: request.body.sexe,
                    breed: request.body.breed,
                    ide: request.body.ide,
                    sterilized: request.body.sterilized,
                    description: request.body.description,
                    weight: request.body.weight,
                };
                //on transmet les informations du membre a la fonction createMember
                const saveCat = await Cat.addNewCat(cat);
                response.json({ saveCat: cat , TEXT: 'Votre chat a bien été enregistrer dans la liste des adoptés'});
                //response.json('Votre chat a bien été enregistrer dans la liste des adoptés');

            } else{
                    response.json('Veuillez remplir tous les champs svp');
            }   
        } catch (error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }                 
    },

    deleteCat: async(request, response) => {
        try {
            const catId = parseInt(request.params.id);
            console.log('id:',catId);
            
            const cat = await Cat.findOneCat(catId);
            console.log('chat',cat);
            
                //Test si le chat existe  
            if (cat) {
                const catToDel = {
                    id: catId,
                };
                console.log('objet cat', catToDel);
                
                await Cat.suppCat(catToDel.id);
                response.status(200).json('Votre chat a bien été supprimer');
            } else {
                response.json('ce chat n\'existe pas.');
            }
        } catch (error) {
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },

    findOneCat: async (request, response) => {
        try{
            const catId = parseInt(request.params.id);
            const cat = await Cat.findOneCat(catId);
            if(cat){
                response.json(cat)
            }else {
                response.status(404).json(`le chat numéro ${catId} n'existe pas`)
            }
        }catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    }
}

module.exports = catController;