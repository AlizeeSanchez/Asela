const db = require("../database");

const Price = {

    //Lister les prix d'adoption
    findPriceAdopt: async () => {
        try{
            const priceOfAdopt = await db.query(
                "SELECT * FROM price_adopt;"
         );
            return priceOfAdopt.rows;
        }catch (error){
            console.trace(error);
        }
    },

    //Afficher un seul prix
    findOnePriceAdopt: async (id) => {
        try{
            const priceOfAdopt = await db.query(
                "SELECT * FROM price_adopt WHERE id = $1;", [id]
            );
            console.log(priceOfAdopt);
            return priceOfAdopt.rows[0];
        } catch (error) {
            console.trace(error);
        }
    },

    //Ajouter un prix
    addNewPrice: async (priceOfAdopt) => {
        try{
        const addPrice = `INSERT INTO price_adopt ("type_pet", "sexe_pet", "price", "caution") VALUES ( $1, $2, $3, $4) RETURNING *;`;
        const data = await db.query(addPrice, [

            priceOfAdopt.type_pet,
            priceOfAdopt.sexe_pet,
            priceOfAdopt.price,
            priceOfAdopt.caution

        ]);
        console.log("monconsole log add priceOfAdopt :", priceOfAdopt);
        return data.rows[0];
        }   
        catch (error) {
            console.trace(error);
        }
    },

    //Modifier un prix
    editPrice: async (priceOfAdopt) => {
        console.log('dans mon model:', priceOfAdopt)
        console.log('dans mon model:', priceOfAdopt.id)

        try{
            const editPrice = await db.query(`UPDATE price_adopt SET type_pet = $1, sexe_pet = $2, price = $3, caution = $4 WHERE id = $5;`, [priceOfAdopt.type_pet, priceOfAdopt.sexe_pet, priceOfAdopt.price, priceOfAdopt.caution, priceOfAdopt.id]);
            return editPrice;
        }
        catch(error){
            console.trace(error)
        }

    },

    //Supprimer un prix
    suppPrice: async (priceOfAdopt) => {
        try{
        const suppPrice = await db.query('DELETE FROM price_adopt WHERE id = $1;',[priceOfAdopt])
        }
        catch (error) {
            console.trace(error);
        }
        
    }



}

module.exports = Price;