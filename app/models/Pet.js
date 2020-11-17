const db = require("../database");

const Pet = {

    findAllPet: async () => {
        try{
            const pets = await db.query(
                "SELECT * FROM pet;"
            );
            return pets.rows;
        }catch (error){
            console.trace(error);
        }
    }



};

module.exports = Pet;