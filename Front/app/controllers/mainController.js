const Home = require('../models/Home');

const mainController = {

    home: async (request, response) => {
        try{
            const starsCat = await Home.findStarCat();
            console.log(starsCat);
            const starsDog = await Home.findStarDog();
            const dateDogSupport = await Home.findNumberDogSupport();
            const dateCatSupport = await Home.findNumberCatSupport();

            //On recupere le nom de jours ecoulé entre la date de prise en charge et maintenant
            const date1 = new Date("01/01/2020"); 
            const date2 = new Date("07/04/2020"); 
            const Diff_temps = date2.getTime() - date1.getTime(); 
            const Diff_jours = Diff_temps / (1000 * 3600 * 24); 


            //On récupere l'année en cours et la précédente
            const date = new Date();
            const thisYear = date.getFullYear(); 
            const lastYear = thisYear-1; 
            const twolastYear = lastYear-1; 
                   
            const goodDog = (dateDogSupport.filter(el => el.date_supported.getFullYear() === thisYear))
            const goodDog1 = (dateDogSupport.filter(el => el.date_supported.getFullYear() === lastYear))
            const goodDog2 = (dateDogSupport.filter(el => el.date_supported.getFullYear() === twolastYear))
            const goodDog3 = (dateDogSupport.filter(el => el.date_supported.getFullYear() === twolastYear -1))
       
            const goodCat = (dateCatSupport.filter(el => el.date_supported.getFullYear() === thisYear))
            const goodCat1 = (dateCatSupport.filter(el => el.date_supported.getFullYear() === lastYear))
            const goodCat2 = (dateCatSupport.filter(el => el.date_supported.getFullYear() === twolastYear))
            const goodCat3 = (dateCatSupport.filter(el => el.date_supported.getFullYear() === twolastYear -1))

            
            const json = {
                starsCat : starsCat,
                starsDog : starsDog,
                DogSupportThisYear : goodDog.length,
                DogSupportLastYear : goodDog1.length,
                DogSupportTwiceYear : goodDog2.length,
                DogSupportTwoLastYear : goodDog3.length,
                CatSupportThisYear : goodCat.length,
                CatSupportLastYear : goodCat1.length,
                CatSupportTwiceYear : goodCat2.length,
                CatSupportTwoLastYear : goodCat3.length,
            }
            console.log('json:' ,json);
            
            response.render('home',{
                json
            });


        }catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },



}

module.exports = mainController;