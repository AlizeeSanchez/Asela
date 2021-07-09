const db = require("../database");

const Dog = {

    //On recupere les chiens a l'adoption
    findPetNotAdopted: async () => {
        try{
            const pets = await db.query(
                "SELECT * FROM pet WHERE adopt = false AND deceased = false AND type = 'chien' ORDER BY id;"
            );
            return pets.rows;
        }catch (error){
            console.trace(error);
        }
    },
    
    //On recupere les chiens adoptés
    findAllPetAdopt: async () => {
        try{
            const pets = await db.query(
                "SELECT pet.id, pet.name, pet.breed, pet.last_name_pet, pet.age, pet.sexe, pet.date_adopting , pet.last_name_pet,  pet.date_supported, pet.ide , adoptant.lastname, adoptant.firstname, adoptant.number_phone, adoptant.city, adoptant.postal_code, adoptant.adress FROM pet JOIN adoptant ON pet.adoptant_id = adoptant.id WHERE pet.adopt = true AND pet.type = 'chien';"
            );
            return pets.rows;
        }catch (error){
            console.trace(error);
        }
    },

    findAllPetDeceaded: async () => {
        try{
            const pets = await db.query(
                "SELECT * FROM pet WHERE deceased = true AND type = 'chien' ORDER BY id;"
            );
            return pets.rows;
        }catch (error){
            console.trace(error);
        }
    },

    //On recupere un chien
    findOnePet: async (id) => {
        try{
            const pets = await db.query(
                "SELECT * FROM pet WHERE id = $1 ;", [id]
            );
            return pets.rows[0];
        }catch (error){
            console.trace(error);
        }
    },
    

    //Ajouter un chien a l'adoption
    addNewPet: async (pet) => {      
        try{
        const addPet = `INSERT INTO pet ("type", "name", "age", "sexe", "breed", "amity", "color", "weight", "ide", "sterilised", "date_vaccine", "description") VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *;`;
        const data = await db.query(addPet, [
            pet.type,
            pet.name,
            pet.age,
            pet.sexe,
            pet.breed,
            pet.amity,
            pet.color,
            pet.weight,
            pet.ide,
            pet.sterilised,
            pet.date_vaccine,
            pet.description,    
        ]);
        return data.rows[0];
        }   
        catch (error) {
            console.trace(error);
        }
    },

    

};

module.exports = Dog;