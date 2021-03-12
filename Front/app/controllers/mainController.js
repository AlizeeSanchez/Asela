const Home = require('../models/Home');

const mainController = {

    home: async (request, response) => {
        try{
            const starsCat = await Home.findStarCat();
            const starsDog = await Home.findStarDog();
            const dateDogSupport = await Home.findNumberDogSupport();
            const dateCatSupport = await Home.findNumberCatSupport();

            //On récupere l'année en cours et la précédente
            const date = new Date();
            const thisYear = date.getFullYear();
            const lastYear = thisYear-1;
                   
            const goodDog = (dateDogSupport.filter(el => el.date_supported.getFullYear() === thisYear))
            const goodDog1 = (dateDogSupport.filter(el => el.date_supported.getFullYear() === lastYear))
            const goodDog2 = (dateDogSupport.filter(el => el.date_supported.getFullYear() === lastYear -1))
       
            const goodCat = (dateCatSupport.filter(el => el.date_supported.getFullYear() === thisYear))
            const goodCat1 = (dateCatSupport.filter(el => el.date_supported.getFullYear() === lastYear))
            const goodCat2 = (dateCatSupport.filter(el => el.date_supported.getFullYear() === lastYear -1))

            //-------------------------------------
        
            const stars = {
                starsCat : starsCat,
                starsDog : starsDog
            }

            const statistics = {
                DogSupportThisYear : goodDog.length,
                DogSupportLastYear : goodDog1.length,
                DogSupportTwiceYear : goodDog2.length,
                CatSupportThisYear : goodCat.length,
                CatSupportLastYear : goodCat1.length,
                CatSupportTwiceYear : goodCat2.length
            }

            response.json({
                stars,
                statistics
            });


        }catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    }

}

module.exports = mainController;