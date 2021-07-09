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

    //Afficher un seul prix
    findOnePriceBreed: async (id) => {
        try{
            const priceOfBreed = await db.query(
                "SELECT * FROM purebred_pet;"
            );
            return priceOfBreed.rows[0];
        } catch (error) {
            console.trace(error);
        }
    },

    //Modifier un prix chien
    editPriceDog: async (price) => {
        try{
            const editPrice = await db.query(`UPDATE price_adopt SET dog_female = $1, dog_male = $2, puppy = $3, caution_puppy = $4 WHERE id = $5;`, [price.dog_female, price.dog_male, price.puppy, price.caution_puppy, price.id]);
            return editPrice;
        }
        catch(error){
            console.trace(error)
        }

    },

    //Modifier un prix chat
    editPriceCat: async (price) => {
        try{
            const editPrice = await db.query(`UPDATE price_adopt SET cat_female = $1, cat_male = $2, kitten = $3, caution_kitten = $4 WHERE id = $5;`, [price.cat_female, price.cat_male, price.kitten, price.caution_kitten, price.id]);
            return editPrice;
        }
        catch(error){
            console.trace(error)
        }
    },

    editPriceBreedPet: async (price) => {
        try{
            const editPriceBreedPet = await db.query(`UPDATE purebred_pet SET extra = $1, extra_charge = $2 WHERE id = $3;`, [price.extra, price.extra_charge, price.id]);
            return editPriceBreedPet;
        }
        catch(error){
            console.trace(error)
        }
    }
}

module.exports = Price;