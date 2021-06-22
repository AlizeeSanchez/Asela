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

    //Ajouter un veterinaire
    addVeterinary: async (veterinary) => {
        try{
            const addVeterinary = `INSERT INTO veterinary ("name", "city", "postal_code", "adress", "number_phone", "email", "dog_castration", "dog_ovario_10", "dog_ovario_10_25", "dog_ovario_25_40", "dog_ovario_40", "dog_vaccine", "dog_ide", "cat_castration", "cat_castration_tatouage", "cat_ovario", "cat_ovario_tatouage", "cat_vaccine", "cat_ide") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19) RETURNING *;`;
            const data = await db.query(addVeterinary, [
                veterinary.name,
                veterinary.city,
                veterinary.postal_code,
                veterinary.adress,
                veterinary.number_phone,
                veterinary.email,
                veterinary.dog_castration,
                veterinary.dog_ovario_10,
                veterinary.dog_ovario_10_25,
                veterinary.dog_ovario_25_40,
                veterinary.dog_ovario_40,
                veterinary.dog_vaccine,
                veterinary.dog_ide,
                veterinary.cat_castration,
                veterinary.cat_castration_tatouage,
                veterinary.cat_ovario,
                veterinary.cat_ovario_tatouage,
                veterinary.cat_vaccine,
                veterinary.cat_ide
            ]); 
            return data.rows[0];
        } catch (error) {
        console.trace(error);
        }
    },

    //Modifier une famille d'acceuil
    editVeterinary: async (veterinary) => {
        try{
            console.log('dans mon model', veterinary);
            const addVeterinary = await db.query(`UPDATE veterinary SET name = $1, city= $2, postal_code= $3, adress= $4, number_phone= $5, email= $6, dog_castration= $7, dog_ovario_10= $8,dog_ovario_10_25= $9, dog_ovario_25_40= $10, dog_ovario_40= $11, dog_vaccine= $12, dog_ide= $13,cat_castration= $14, cat_castration_tatouage= $15, cat_ovario= $16,cat_ovario_tatouage= $17, cat_vaccine= $18, cat_ide= $19 WHERE id = $20;`,
            [ veterinary.name, veterinary.city, veterinary.postal_code, veterinary.adress, veterinary.number_phone, veterinary.email, veterinary.dog_castration, veterinary.dog_ovario_10,veterinary.dog_ovario_10_25, veterinary.dog_ovario_25_40, veterinary.dog_ovario_40, veterinary.dog_vaccine, veterinary.dog_ide, veterinary.cat_castration, veterinary.cat_castration_tatouage, veterinary.cat_ovario,veterinary.cat_ovario_tatouage ,veterinary.cat_vaccine , veterinary.cat_ide ,veterinary.id]
            ); 
            return addVeterinary;
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