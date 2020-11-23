const db = require("../database");



const Pet = {

    //Afficher un animal
    findOnePet: async (id) => {
        try{
            const pet = await db.query(
                "SELECT * FROM pet WHERE pet.id = $1;", [id]
            );
            return pet.rows;
        }catch (error){
            console.trace(error);
        }
    },


    //Modifier un animal
    editPet: async (pet) => {
        console.log('dans mon model:', pet)
        console.log('dans mon model:', pet.id)

        try{
            const editpet = await db.query(`UPDATE pet SET name = $1, age = $2, amity = $3, sexe = $4, breed = $5, ide = $6, sterilised = $7, date_vaccine = $8, description = $9, weight = $10, adopt = $11, date_adopting = $12, adoptant_id = $13, host_family_id = $14 WHERE id = $15;`, [pet.name, pet.age, pet.amity, pet.sexe, pet.breed, pet.ide, pet.sterilised, pet.date_vaccine, pet.description, pet.weight, pet.adopt, pet.date_adopting, pet.adoptant_id, pet.host_family_id, pet.id]);
            return editpet;
        }
        catch(error){
            console.trace(error)
        }

    },

    //Rechercher les animaux par leurs nom ou par son IDE
    findresearch: async (research) => {
        try{
            console.log('Le console log de ma recherche coté model',research)
        const pets = await db.query("SELECT * FROM pet WHERE name = $1 OR ide = $1;", [research]);
        return pets.rows[0];
        }catch (error){          
            console.trace(error);
        }
    },

    findOneComment: async (id) => {
        try{
            const comment = await db.query(
                "SELECT * FROM commentaires_pet WHERE id = $1;", [id]
            );
            return comment.rows[0];
        }catch (error){
            console.trace(error);
        }
    },

    findAllCommentPet: async (id) => {
        try{
            const comment = await db.query(
                "SELECT * FROM commentaires_pet WHERE pet_id = $1;", [id]
            );
            return comment.rows;
        }catch (error){
            console.trace(error);
        }
    },

    //ajouter un commentaire sur un animal
    addNewCommentPet: async (comment) => {
        try{
        const addcomment = `INSERT INTO commentaires_pet ("pet_id", "commentaire") VALUES ($1, $2) RETURNING *;`;
        const data = await db.query(addcomment, [
            comment.pet_id,
            comment.commentaire
        ]);
        return data.rows[0];
        }   
        catch (error) {
            console.trace(error);
        }
    },


    //supprimer un commentaire sur un animal
    
}

module.exports = Pet;