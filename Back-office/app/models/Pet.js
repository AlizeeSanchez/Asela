const db = require("../database");



const Pet = {

    //Afficher un animal
    findOnePet: async (id) => {
        try{
            const pet = await db.query(
                "SELECT * FROM pet WHERE id = $1;", [id]
            );
            return pet.rows[0];
        }catch (error){
            console.trace(error);
        }
    },

    //Afficher un animal
    findAdoptantPet: async (id) => {
        try{
            const pet = await db.query(
                "SELECT * FROM host_family INNER JOIN pet ON host_family.id = pet.host_family_id WHERE host_family.id = $1;", [id]
            );
            return pet.rows;
        }catch (error){
            console.trace(error);
        }
    },

    //Afficher la famille d'accueil d'un animal
    findHostFamillyPet: async (id) => {
        try{
            const pet = await db.query(
                "SELECT host_family.lastname, host_family.firstname, host_family.adress, host_family.postal_code, host_family.city, host_family.number_phone, host_family.email FROM host_family INNER JOIN pet ON host_family.id = pet.host_family_id WHERE pet.id = $1;", [id]
            );
            return pet.rows;
        }catch (error){
            console.trace(error);
        }
    },

    //Afficher l'adoptant d'un animal
    findAdoptantPet: async (id) => {
        try{
            const pet = await db.query(
                "SELECT pet.date_adopting, adoptant.lastname, adoptant.firstname, adoptant.adress, adoptant.postal_code, adoptant.city, adoptant.number_phone, adoptant.email FROM adoptant INNER JOIN pet ON adoptant.id = pet.adoptant_id WHERE pet.id = $1;", [id]
            );
            return pet.rows;
        }catch (error){
            console.trace(error);
        }
    },

    //Afficher les animaux décédés
    findPetDead: async () => {
        try{
            const pets = await db.query(
                "SELECT * FROM pet WHERE deceased = true;"
            );
            return pets.rows;
        }catch (error){
            console.trace(error);
        }
    },

    //Modifier un animal pour le déclarer décédé
    editDeadPetTrue: async (id) => {
        try{
            const editpet = await db.query(`UPDATE pet SET deceased = true WHERE id = $1;`, [id]);
            return editpet;
        }
        catch(error){
            console.trace(error)
        }
    },


    //Modifier un animal pour le déclarer non décédé en cas d'erreur
    editDeadPetFalse: async (id) => {
        try{
            const editpet = await db.query(`UPDATE pet SET deceased = false WHERE id = $1;`, [id]);
            return editpet;
        }
        catch(error){
            console.trace(error)
        }
    },


    //Modifier un animal
    editPet: async (pet) => {
        console.log(pet);
        
        try{
            const editpet = await db.query(`UPDATE pet SET name = $1, age = $2, amity = $3, sexe = $4, breed = $5, color = $6, ide = $7, sterilised = $8, description = $9, weight = $10 WHERE id = $11;`, [pet.name, pet.age, pet.amity, pet.sexe, pet.breed, pet.color, pet.ide, pet.sterilised, pet.description, pet.weight, pet.id]);
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

    //Recuperer un commentaire
    findOneComment: async (id) => {
        try{
            const comment = await db.query(
                "SELECT * FROM commentaire_pet WHERE id = $1;", [id]
            );
            return comment.rows[0];
        }catch (error){
            console.trace(error);
        }
    },

    //Afficher tout les commentaires
    findAllCommentPet: async (id) => {
        try{
            const comment = await db.query(
                "SELECT * FROM commentaire_pet WHERE pet_id = $1;", [id]
            );
            return comment.rows;
        }catch (error){
            console.trace(error);
        }
    },

    //ajouter un commentaire sur un animal
    addNewCommentPet: async (comment) => {
        try{
        const addcomment = `INSERT INTO commentaire_pet ("pet_id", "commentaire") VALUES ($1, $2) RETURNING *;`;
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
    suppPetComment: async (id) => {
        try{
        const suppPet = await db.query('DELETE FROM commentaire_pet WHERE id = $1;',[id])
        }
        catch (error) {
            console.trace(error);
        }
        
    },

    //affecter une famille d'accueil dans la colone : host_family_id
    affectFamilyHost: async(petToFamilly) => {
        try {
            const petId = await db.query( 
                "UPDATE pet SET host_family_id = $1 WHERE id = $2", [petToFamilly.host_family_id, petToFamilly.id]
            );
            console.log('mon console de model', petId);
            return petId;

        }
        catch (error) {
            console.trace(error);
        }
    },

    //On passe l'animal à publié sur FB si true 
    publishFacebookIsTrue: async (id) => {
        try{
            const publishpet = await db.query('UPDATE pet SET facebook_publish = true WHERE id = $1;', [id])
            return publishpet.rows;
        }
        catch(error){
            console.trace(error)
        }

    },

    //On passe l'animal à non publié sur FB si false
    publishFacebookIsFalse: async (id) => {
        try{
            const publishpet = await db.query('UPDATE pet SET facebook_publish = false WHERE id = $1 ;', [id])
            return publishpet.rows;
        }
        catch(error){
            console.trace(error)
        }

    },

    //On passe l'animal à publié sur Seconde chancesi true 
    publishSecondeChanceIsTrue: async (id) => {
        try{
            const publishpet = await db.query('UPDATE pet SET seconde_chance_publish = true WHERE id = $1;', [id])
            return publishpet.rows;
        }
        catch(error){
            console.trace(error)
        }
    },

    //On passe l'animal à non publié sur Seconde chance si false
    publishSecondeChanceIsFalse: async (id) => {
        try{
            const publishpet = await db.query('UPDATE pet SET seconde_chance_publish = false WHERE id = $1 ;', [id])
            return publishpet.rows;
        }
        catch(error){
            console.trace(error)
        }

    },

    //On passe l'animal à publié sur FB si true 
    publishSiteIsTrue: async (id) => {
        try{
            const publishpet = await db.query('UPDATE pet SET site_publish = true WHERE id = $1;', [id])
            return publishpet.rows;
        }
        catch(error){
            console.trace(error)
        }

    },

    //On passe l'animal à non publié sur FB si false
    publishSiteIsFalse: async (id) => {
        try{
            const publishpet = await db.query('UPDATE pet SET site_publish = false WHERE id = $1 ;', [id])
            return publishpet.rows;
        }
        catch(error){
            console.trace(error)
        }
    },

    //Signaler qu'un animal est reservé
    reserveIsTrue: async (id) => {
        try{
            const publishpet = await db.query('UPDATE pet SET reserve = true WHERE id = $1;', [id])
            return publishpet.rows;
        }
        catch(error){
            console.trace(error)
        }
    },

    //La reservation est annulé
    reserveIsFalse: async (id) => {
        try{
            const publishpet = await db.query('UPDATE pet SET reserve = false WHERE id = $1 ;', [id])
            return publishpet.rows;
        }
        catch(error){
            console.trace(error)
        }
    },

    findImgPet: async (id) => {
        try {
            const imgPet = await db.query('SELECT * FROM picture_pet WHERE pet_id = $1;', [id])
            return imgPet.rows;
        }catch(error) {
            console.log(error)
        }
    },

    //Modifier un animal
    editVaccinePet: async (editDate) => {
        try{
            const editVaccinDate = await db.query(`UPDATE pet SET date_vaccine = $1 WHERE id = $2;`, [editDate.date_vaccine, editDate.id]);
            return editVaccinDate;
        }
        catch(error){
            console.trace(error)
        }
    },

    editsupportedDate: async (editDate) => {
        try{
            const editSupportedDate = await db.query(`UPDATE pet SET date_supported = $1 WHERE id = $2;`, [editDate.date_supported, editDate.id]);
            return editSupportedDate;
        }
        catch(error){
            console.trace(error)
        }
    },

    hostFamilyPet: async (pet) => {
        try{
            const hostFamilyPet = await db.query(`UPDATE pet SET host_family_id = $1 WHERE id = $2;`, [pet.idHF, pet.idPet])
            return hostFamilyPet;
        }
        catch(error){
            console.trace(error)
        }
    }
}

module.exports = Pet;