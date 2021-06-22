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
            return priceOfAdopt.rows[0];
        } catch (error) {
            console.trace(error);
        }
    },

    //Modifier un prix
    editPriceDog: async (price) => {
        console.log(price);
        try{
            const editPrice = await db.query(`UPDATE price_adopt SET dog_female = $1, dog_male = $2, puppy = $3, caution_puppy = $4 WHERE id = $5;`, [price.dog_female, price.dog_male, price.puppy, price.caution_puppy, price.id]);
            return editPrice;
        }
        catch(error){
            console.trace(error)
        }

    },
}

module.exports = Price;