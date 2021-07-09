const db = require("../database");

const HostFamily = {

    //On recupere les fa par departement du Gard
    findHostFamilyByDpt30: async () => {
        try{
            const hostFamily30 = await db.query("SELECT * FROM host_family WHERE black_list = false AND nolongercontact = false AND postal_code ~* '3[0][0-9]{3}' ORDER by firstname;");   
            return hostFamily30.rows;
        }catch (error){
            console.trace(error);
        }
    },

    //On recupere les fa par departement de l'herault
    findHostFamilyByDpt34: async () => {
        try{
            const hostFamily34 = await db.query("SELECT * FROM host_family WHERE black_list = false AND nolongercontact = false AND postal_code ~* '3[4][0-9]{3}' ORDER by firstname;");   
            return hostFamily34.rows;
        }catch (error){
            console.trace(error);
        }
    },

    //On recupere les fa par departement du vaucluse
    findHostFamilyByDptAutre: async () => {
        try{
            const hostFamilyAutre = await db.query("SELECT * FROM host_family WHERE black_list = false AND nolongercontact = false AND postal_code ~* '[0][1-9][0-9]{3}|[1-2][0-9][0-9]{3}|[3][1-3][0-9]{3}|[3][5-9][0-9]{3}|[4-9][0-9][0-9]{3}' ORDER by firstname;");   
            return hostFamilyAutre.rows;
        }catch (error){
            console.trace(error);
        }
    },

    //On recupere les fa par departement du vaucluse
    findHostFamilyNoContact: async () => {
        try{
            const hostFamilyAutre = await db.query("SELECT * FROM host_family WHERE nolongercontact = true ORDER by firstname;");   
            return hostFamilyAutre.rows;
        }catch (error){
            console.trace(error);
        }
    },

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
            console.log('je rentre dans le model');
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
    editHostFamily: async (body) => {
        try{
            const editHostFamily = await db.query('UPDATE host_family SET number_phone = $1, postal_code = $2, city = $3, people_date_accueil = $4, adress = $5, facebook = $6, disponibility = $7, new = $8, nolongercontact = $9, pet_asela = $10, comment = $11 WHERE id = $12;', [
                body.number_phone, 
                body.postal_code, 
                body.city,
                body.people_date_accueil,
                body.adress,
                body.facebook, 
                body.disponibility, 
                body.new, 
                body.nolongercontact, 
                body.pet_asela, 
                body.comment,
                body.id
            ])
            return editHostFamily;
        }
        catch(error){
            console.trace(error)
        }
    },

    addCommentFamilyHost: async (comment) => {
        try {
            console.log(comment);
            const commentHostFamily = ('UPDATE host_family SET comment = $1 WHERE id = $2 RETURNING *;');
            const data = await db.query(commentHostFamily, [
                comment.comment,
                comment.id
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

    petFamilyHost: async (hostFamily) => {
        try{
            const petHostFamily = await db.query(`UPDATE host_family SET pet_asela = pet_asela || $1 WHERE id = $2;`, [hostFamily.pet_asela, hostFamily.id])
            return petHostFamily;
        }
        catch(error){
            console.trace(error)
        }

    },

    findAllPetFamillyHost: async (id) =>{
        try{
            const petHostFamily = await db.query('SELECT * FROM pet WHERE host_family_id = $1', [id]);
            console.log('JE SUIS BIEN ENTREE',petHostFamily);
            return petHostFamily.rows;
            
            
        }catch(error){
            console.trace(error)
        }
    }
}

module.exports = HostFamily;