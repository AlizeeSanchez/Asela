const Pet = require("../models/Pet")
const Other = require("../models/Other");

const petController = {

    //On récupére les chiens a l'adoption
    dog: async (request, response) => {
            try{
                //On récupere recupere la date du jour et on enleve 1 ans
                const date = new Date();
                const dateCompare = date.toLocaleDateString();
                const thisYear = date.getFullYear();
                const lastYear = thisYear-1;
                const oneYear = dateCompare.toLocaleString('en-GB').substr(0, 6)+lastYear
                const pets = await Pet.findDogNotAdopted(oneYear);
                
                if (pets) {
                    response.render('allDog', {
                        pets
                    });
                } else {
                     response.status(404).json(`Il n'y a aucun chien adulte à l'adoption actuellement.`);
                }
            }
            catch(error){
                console.trace(error)
                return response.status(500).json(error.toString());
            }
    },

    //On récupére les chiots a l'adoption
    puppy: async (request, response) => {
        try{
                //On récupere recupere la date du jour et on enleve 1 ans
                const date = new Date();
                const dateCompare = date.toLocaleDateString();
                const thisYear = date.getFullYear();
                const lastYear = thisYear-1;
                const oneYear = dateCompare.toLocaleString('en-GB').substr(0, 6)+lastYear

            const pets = await Pet.findPuppyNotAdopted(oneYear);
            if (pets) {
                response.render('allPuppy', {
                    pets
                });
            } else {
                 response.status(404).json(`Il n'y a aucun chiot à l'adoption actuellement.`);
            }
        }
        catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },

    //On récupére les chats a l'adoption
    cat: async (request, response) => {
        try{
            //On récupere recupere la date du jour et on enleve 1 ans
            const date = new Date();
            const dateCompare = date.toLocaleDateString();
            const thisYear = date.getFullYear();
            const lastYear = thisYear-1;
            const oneYear = dateCompare.toLocaleString('en-GB').substr(0, 6)+lastYear
            
            const pets = await Pet.findCatNotAdopted(oneYear);
            if (pets) {
                response.render('allCat', {
                    pets
                });
            } else {
                 response.status(404).json(`Il n'y a aucun chat adulte à l'adoption actuellement.`);
            }
        }
        catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },

    //On récupére les chatons a l'adoption
    kitten: async (request, response) => {
        try{
            //On récupere recupere la date du jour et on enleve 1 ans
            const date = new Date();
            const dateCompare = date.toLocaleDateString();
            const thisYear = date.getFullYear();
            const lastYear = thisYear-1;
            const oneYear = dateCompare.toLocaleString('en-GB').substr(0, 6)+lastYear

            const pets = await Pet.findKittenNotAdopted(oneYear);
            
            if (pets) {
                response.render('allKitten', {
                    pets
                });
            } else {
                 response.status(404).json(`Il n'y a aucun chaton à l'adoption actuellement.`);
            }
        }
        catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },

    //On récupere un animal par son id
    onePet: async (request, response) => {
        try{

            const petId = request.params.id;
            const pet = await Pet.findOnePet(petId);
            const imgPet = await Pet.findImgPet(petId); 
            const participation = await Other.findRate();
            const purebred_pet = await Other.purebred_pet();

            const json = {
                pet : pet,
                tarif : participation,
                imgPet : imgPet,
                purebred_pet: purebred_pet
            }

            if (pet) {
                response.render('onePet', {
                    json
                });
            } else {
                 response.status(404).json(`Il n'y a aucun chaton à l'adoption actuellement.`);
            }
        }
        catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    }
}

module.exports = petController;