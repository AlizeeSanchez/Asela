const db = require("../database");



const Pet = {

    //Afficher un animal
    findOnePet: async (id) => {
        try{
            const pets = await db.query(
                "SELECT * FROM pet WHERE id = $1;", [id]
            );
            return pets.rows[0];
        }catch (error){
            console.trace(error);
        }
    },

    //Modifier un animal
    editPet: async (pet) => {
        try{
            const editpet = await db.query('UPDATE pet SET name = $1, age = $2, amity = $3, sexe = $4, breed = $5, ide = $6, sterilised = $7, date_vaccine = $8, description = $9, weight = $10, adopt = $11, date_adopting = $12 WHERE id = $13;', [pet.name, pet.age, pet.amity, pet.sexe, pet.breed, pet.ide, pet.sterilised, pet.date_vaccine, pet.description, pet.weight, pet.adopt, pet.dat_adoptin, pet.id])
            return editpet.rows;
        }
        catch(error){
            console.trace(error)
        }

    },

    //Rechercher les animaux par leurs nom ou par son IDE
    findresearch: async (id) => {
        try{
            const pets = await db.query(
                "SELECT * FROM pet WHERE id = $1;", [id]
            );
            return pets.rows[0];
        }catch (error){
            console.trace(error);
        }
    },
    
    
}

module.exports = Pet;