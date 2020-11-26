const Cat = require("../models/Cat");

const catController = {


    //On liste les chats a l'adoption
    allCatsNotAdopted: async (request, response) => {
        try{
            const cats = await Cat.findCatNotAdopted();
            if(cats){
                response.render('cat', {
                    cats
                });
            } else {
                response.status(404).json(`Il n'y a aucun chats trouvés qui ne sont pas adoptés.`);
            }
        }
        catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },

    //On liste les chats adoptésss
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

    //On passe l'adoption a true quand un chien est disponible à l'adoption.
    petStateAdoption: async (request, response) => {
        try{
            const petId = parseInt(request.params.id);
            const pet = await Cat.findOneCat(petId);
            console.log(pet.name);
            if(pet.adopt === false){
                const petFalse = await Cat.adoptCatIsFalse(petId);
                response.json('Cet animal est disponible a l\'adoption');
            }
            if(pet.adopt ===true){
                const petTrue = await Cat.adoptCatIsFalse(petId);
                response.json('Cet animal n\'est pas disponible a l\'adoption');
            } else {
                response.status(404).json(`Cet animal n'existe pas.`);
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
                //on transmet les informations du chat à la fonction addNewCat
                const saveCat = await Cat.addNewCat(cat);
                response.json({ saveCat: cat , TEXT: 'Votre chat a bien été enregistrer dans la liste des adoptés'});

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

    // On veux voir la fiche d'un chat
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