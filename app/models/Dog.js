const db = require("../database");

const Dog = {

    //On recupere les chiens a l'adoption
    findPetNotAdopted: async () => {
        try{
            const pets = await db.query(
                "SELECT * FROM pet WHERE adopt = false AND deceased = false AND type = 'chien';"
            );
            return pets.rows;
        }catch (error){
            console.trace(error);
        }
    },

    //On recupere les chiens décédés
    findPetDead: async () => {
        try{
            const pets = await db.query(
                "SELECT * FROM pet WHERE deceased = true AND type = 'chien';"
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
                "SELECT * FROM pet WHERE adopt = true AND type = 'chien';"
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
                "SELECT * FROM pet WHERE id = $1;", [id]
            );
            return pets.rows[0];
        }catch (error){
            console.trace(error);
        }
    },

    //On passe l'adoption a true quand un chien est disponible à l'adoption.
    adoptIsTrue: async (id) => {
        try{
            const editpet = await db.query('UPDATE pet SET adopt = true WHERE id = $1;', [id])
            return editpet.rows;
        }
        catch(error){
            console.trace(error)
        }

    },

    //On passe l'adoption a false quand un chien est indisponible à l'adoption.
    adoptIsFalse: async (id) => {
        try{
            const editpet = await db.query('UPDATE pet SET adopt = false WHERE id = $1 ;', [id])
            return editpet.rows;
        }
        catch(error){
            console.trace(error)
        }

    },

    //Ajouter un chien a l'adoption
    addNewPet: async (pet) => {
        try{
        const addPet = `INSERT INTO pet ("type", "name", "age", "amity", "sexe", "breed", "ide", "sterilised", "description", "weight") VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;`;
        const data = await db.query(addPet, [
            pet.type,
            pet.name,
            pet.age,
            pet.amity,
            pet.sexe,
            pet.breed,
            pet.ide,
            pet.sterilised,
            pet.description, 
            pet.weight
        ]);
        console.log("monconsole log add pet :", pet);
        return data.rows[0];
        }   
        catch (error) {
            console.trace(error);
        }
    },

    //Supprimer un chien a l'adoption
    suppPet: async (pet) => {
        try{
        const suppPet = await db.query('DELETE FROM pet WHERE id = $1;',[pet])
        }
        catch (error) {
            console.trace(error);
        }
        
    }

};

module.exports = Dog;