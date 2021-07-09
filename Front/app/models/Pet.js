const db = require("../database");

const Pet = {

    
    //On recupere les chiens a l'adoption
    findDogNotAdopted: async (date) => {
        try{
            const pets = await db.query(
            "SELECT * FROM pet WHERE adopt = false AND deceased = false AND type = 'chien' AND site_publish = true AND age <= $1;", [date]
           );
            return pets.rows;
        }catch (error){
            console.trace(error);
        }
    },

    //On récupére les chiots a l'adoption
    findPuppyNotAdopted: async (date) => {
        try{
            const pets = await db.query(
                "SELECT * FROM pet WHERE adopt = false AND deceased = false AND type = 'chien' AND site_publish = true AND age >= $1 ORDER BY id;", [date]
            );
            return pets.rows;
        }catch (error){
            console.trace(error);
        }
    },

    //On récupére les chats a l'adoption
    findCatNotAdopted: async (date) => {
        try{
            const pets = await db.query(
                "SELECT * FROM pet WHERE adopt = false AND deceased = false AND type = 'chat' AND site_publish = true AND age <= $1 ORDER BY id;", [date]
            );
            return pets.rows;
        }catch (error){
            console.trace(error);
        }
    },

    //On récupére les chatons a l'adoption
    findKittenNotAdopted: async (date) => {
        try{
            const pets = await db.query(
                "SELECT * FROM pet WHERE adopt = false AND deceased = false AND type = 'chat' AND site_publish = true AND age >= $1 ORDER BY id;", [date]
            );
            return pets.rows;
        }catch (error){
            console.trace(error);
        }
    },

    //On récupére un animal par son ID
    findOnePet: async (id) => {
        try{
            const pets = await db.query(
                "SELECT * FROM pet WHERE id = $1 AND site_publish = true and adopt = false;", [id]
            );
            return pets.rows;
        }catch (error){
            console.trace(error);
        }
    },

    findImgPet: async (id) => {
        try{
            const pets = await db.query(
                "SELECT * FROM picture_pet WHERE pet_id = $1;", [id]
            );
            return pets.rows;
        }catch (error){
            console.trace(error);
        }
    }

}

module.exports = Pet;