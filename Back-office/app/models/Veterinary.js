const db = require('../database');

const Veterinary = {

    // On recupere tous les veterinaires
    findAllVeterinary: async () => {
        try{
            const veterinary = await db.query("SELECT * FROM veterinary;");   
            return veterinary.rows;
        }catch (error){
            console.trace(error);
        }
    },

    //On recupere les veterinaires par departement du Gard
    findVeterinaryByDpt30: async () => {
        try{
            const veterinary30 = await db.query("SELECT * FROM veterinary WHERE postal_code ~* '3[0][0-9]{3}';");   
            return veterinary30.rows
        }catch (error){
            console.trace(error);
        }
    },

    //On recupere les veterinaires par departement de l'herault
    findVeterinaryByDpt34: async () => {
        try{
            const veterinary34 = await db.query("SELECT * FROM veterinary WHERE postal_code ~* '3[4][0-9]{3}';");   
            return veterinary34.rows;
        }catch (error){
            console.trace(error);
        }
    },

    //On recupere les veterinaires par departement du vaucluse
    findVeterinaryByDptAutre: async () => {
        try{
            const veterinaryAutre = await db.query("SELECT * FROM veterinary WHERE postal_code ~* '[0][1-9][0-9]{3}|[1-2][0-9][0-9]{3}|[3][1-3][0-9]{3}|[3][5-9][0-9]{3}|[4-9][0-9][0-9]{3}';");   
            return veterinaryAutre.rows;
        }catch (error){
            console.trace(error);
        }
    },

    //Ajouter un chat a l'adoption
    addVeterinary: async (veterinary) => {
        try{
            const addVeterinary = `INSERT INTO veterinary ("name", "number_phone", "postal_code", "city", "adress", "email", "price_ide_eval", "price_vaccine_eval", "price_cat_eval", "price_litledog_eval", "price_bigdog_eval") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *;`;
            const data = await db.query(addVeterinary, [
                veterinary.name,
                veterinary.number_phone,
                veterinary.postal_code,
                veterinary.city,
                veterinary.adress,
                veterinary.email,
                veterinary.price_ide_eval,
                veterinary.price_vaccine_eval,
                veterinary.price_cat_eval, 
                veterinary.price_litledog_eval,
                veterinary.price_bigdog_eval
            ]); 
            return data.rows[0];
        } catch (error) {
        console.trace(error);
        }
    },

    findOneVeterinary: async (id) => {
        try{
            const veterinary = await db.query("SELECT * FROM veterinary WHERE id = $1", [id]);
            return veterinary.rows
        }catch (error){
            console.trace(error);
        }
    },

      //Supprimer un chat a l'adoption
      suppVeterinary: async (id) => {
        try{
            const veterinary = await db.query(`DELETE FROM veterinary WHERE id = $1;`, [id]);
            return veterinary;   
        }
        catch (error) {
            console.trace(error)
        }
    },

    //Modifier une famille d'acceuil
    editVeterinary: async (veterinary) => {
        try{
            const editVeterinary = await db.query('UPDATE veterinary SET name = $1, number_phone = $2, postal_code = $3, city = $4, adress = $5, email = $6, price_ide_eval = $7, price_vaccine_eval = $8, price_cat_eval= $9, price_litledog_eval = $10, price_bigdog_eval = $11 WHERE id = $12;', [veterinary.name, veterinary.number_phone, veterinary.postal_code, veterinary.city, veterinary.adress, veterinary.email, veterinary.price_ide_eval, veterinary.price_vaccine_eval, veterinary.price_cat_eval, veterinary.price_litledog_eval, veterinary.price_bigdog_eval, veterinary.id])
            return editVeterinary;
        }
        catch(error){
            console.trace(error)
        }
    },

    findAllPrice: async () => {
        try {
            const priceVeterinary = await db.query('SELECT * FROM price_veterinary');
            return priceVeterinary;
        }
        catch(error){
            console.trace(error)
        }
    },

    findOneVeterinaryPrice: async (id) => {
        try {
            const priceVeterinary = await db.query('SELECT * FROM price_veterinary WHERE ID = $1', [id]);
            return priceVeterinary;
        }
        catch(error){
            console.trace(error)
        }
    },

    addPriceVeterinary: async (priceVeterinary) => {
        try{
            const addPriceVeterinary = `INSERT INTO price_veterinary ("veterinary_id", "price") VALUES ($1, $2) RETURNING *;`;
            const data = await db.query(addPriceVeterinary, [
                priceVeterinary.veterinary_id,
                priceVeterinary.price,
            ]); 
            return data.rows[0];
        } catch (error) {
        console.trace(error);
        }
    },

    suppVeterinaryPrice: async (id) => {
        try{
            const veterinaryPrice = await db.query(`DELETE FROM price_veterinary WHERE id = $1;`, [id]);
            return veterinaryPrice;   
        }
        catch (error) {
            console.trace(error)
        }
    },

    editVeterinaryPrice: async (veterinaryPrice) => {
        try{
            const editPriceVeterinary = await db.query('UPDATE price_veterinary SET veterinary_id = $1, price = $2 WHERE id = $3;', [veterinaryPrice.veterinary_id, veterinaryPrice.price, veterinaryPrice.id])
            return editPriceVeterinary;
        }
        catch(error){
            console.trace(error)
        }
    }
    

}

module.exports = Veterinary;