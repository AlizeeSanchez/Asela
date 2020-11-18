const db = require("../database");

const HostFamily = {

    //On recupere les familles d'acceuils
    findAllHostFamily: async () => {
        try{
            const hostFamily = await db.query("SELECT * FROM host_family;");   
            return hostFamily.rows;
        }catch (error){
            console.trace(error);
        }
    },

    findOneHostFamily: async (id) => {
        try{
            const hostFamily = await db.query("SELECT * FROM host_family WHERE id = $1", [id]);
            return hostFamily.rows
        }catch (error){
            console.trace(error);
        }
    },

    addHostFamily: async (hostFamily) => {
        try{
            const addHostFamily = `INSERT INTO host_family ("lastname", "firstname", "number_phone", "postal_code", "city", "adress", "email", "pet_composition", "pet_accepted", "disponibility", "pet_asela") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *;`;
            const data = await db.query(addHostFamily, [
                hostFamily.lastname,
                hostFamily.firstname,
                hostFamily.number_phone,
                hostFamily.postal_code,
                hostFamily.city,
                hostFamily.adress,
                hostFamily.email,
                hostFamily.pet_composition,
                hostFamily.pet_accepted, 
                hostFamily.disponibility,
                hostFamily.pet_asela
            ]); 
            return data.rows[0];
        } catch (error) {
        console.trace(error);
        }
    },

    suppHostFamily: async (id) => {
        try{
            const hostFamily = await db.query(`DELETE FROM host_family WHERE id = $1;`, [id]);
            return hostFamily;   
        }
        catch (error) {
            console.trace(error)
        }
    },

    //Modifier une famille d'acceuil
    editHostFamily: async (hostFamily) => {
        try{
            const editHostFamily = await db.query('UPDATE host_family SET lastname = $1, firstname = $2, number_phone = $3, postal_code = $4, city = $5, adress = $6, email = $7, pet_composition = $8, pet_accepted = $9, disponibility = $10, pet_asela = $11 WHERE id = $12;', [hostFamily.lastname, hostFamily.firstname, hostFamily.number_phone, hostFamily.postal_code, hostFamily.city, hostFamily.adress, hostFamily.email, hostFamily.pet_composition, hostFamily.pet_accepted, hostFamily.disponibility, hostFamily.pet_asela, hostFamily.id])
            return editHostFamily;
        }
        catch(error){
            console.trace(error)
        }
    },

    addCommentFamilyHost: async (comment) => {
        try {
            const commentHostFamily = ('INSERT INTO commentaire_host_familly (host_family_id, commentaire) VALUES ($1,$2) RETURNING *;');
            const data = await db.query(commentHostFamily, [
                comment.id,
                comment.commentaire
            ])
            return data.rows;
        }catch(error) {
            console.trace(error)
        }
    },

    editCommentHostFamily: async (comment) => {
        try{
            const editCommentHostFamily = await db.query('UPDATE commentaire_host_familly SET commentaire = $1 WHERE id = $2;', [comment.commentaire, comment.id])
            return editCommentHostFamily;
        }
        catch(error){
            console.trace(error)
        }

    },

    suppCommentHostFamily: async (id) => {
        try{
            const deleteCommentHostFamily = await db.query(`DELETE FROM commentaire_host_familly WHERE id = $1;`, [id]);
            return deleteCommentHostFamily;   
        }
        catch (error) {
            console.trace(error)
        }
    },
    
}

module.exports = HostFamily;