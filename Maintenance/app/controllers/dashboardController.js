const Dashboard = require('../models/Dashboard');

const dashboardController = {

    //On récupere la dashboard
    home: async (request, response) => {
        try{
            if (request.session.user) {
                const session = request.session.user;
                const date = new Date();
                const thisYear = date.getFullYear(); 
                const lastYear = thisYear-1; 

                const catRescue = (await Dashboard.catRescue()).length;
                const dogRescue = (await Dashboard.dogRescue()).length;
                const newQuest = (await Dashboard.newQuest()).length;

                //Tout les animaux pris en charge ( type + date )
                const catSupport = await Dashboard.findNumberCatSupport();
                const dogSupport = await Dashboard.findNumberDogSupport();

                //Connaitre le nombre d'animaux pris en charge l'an dernier
                const dogsNumberLastYear = (dogSupport.filter(el => el.date_supported.getFullYear() === lastYear).length);
                const catsNumberLastYear = (catSupport.filter(el => el.date_supported.getFullYear() === lastYear).length);

                const dogStatThisYear = {
                    January : dogSupport.filter(el => el.date_supported.toLocaleString('en-GB').substr(3,7) === '01/'+thisYear).length,
                    February : dogSupport.filter(el => el.date_supported.toLocaleString('en-GB').substr(3,7) === '02/'+thisYear).length,
                    March : dogSupport.filter(el => el.date_supported.toLocaleString('en-GB').substr(3,7) === '03/'+thisYear).length,
                    April : dogSupport.filter(el => el.date_supported.toLocaleString('en-GB').substr(3,7) === '04/'+thisYear).length,
                    May :dogSupport.filter(el => el.date_supported.toLocaleString('en-GB').substr(3,7) === '05/'+thisYear).length,
                    June :dogSupport.filter(el => el.date_supported.toLocaleString('en-GB').substr(3,7) === '06/'+thisYear).length,
                    July :dogSupport.filter(el => el.date_supported.toLocaleString('en-GB').substr(3,7) === '07/'+thisYear).length,
                    August :dogSupport.filter(el => el.date_supported.toLocaleString('en-GB').substr(3,7) === '08/'+thisYear).length,
                    September :dogSupport.filter(el => el.date_supported.toLocaleString('en-GB').substr(3,7) === '09/'+thisYear).length,
                    October :dogSupport.filter(el => el.date_supported.toLocaleString('en-GB').substr(3,7) === '10/'+thisYear).length,
                    November :dogSupport.filter(el => el.date_supported.toLocaleString('en-GB').substr(3,7) === '11/'+thisYear).length,
                    December :dogSupport.filter(el => el.date_supported.toLocaleString('en-GB').substr(3,7) === '12/'+thisYear).length,
                }
                    
                const dogStatLastYear = {
                    January : dogSupport.filter(el => el.date_supported.toLocaleString('en-GB').substr(3,7) === '01/'+lastYear).length,
                    February :dogSupport.filter(el => el.date_supported.toLocaleString('en-GB').substr(3,7) === '02/'+lastYear).length,
                    March : dogSupport.filter(el => el.date_supported.toLocaleString('en-GB').substr(3,7) === '03/'+lastYear).length,
                    April : dogSupport.filter(el => el.date_supported.toLocaleString('en-GB').substr(3,7) === '04/'+lastYear).length,
                    May : dogSupport.filter(el => el.date_supported.toLocaleString('en-GB').substr(3,7) === '05/'+lastYear).length,
                    June : dogSupport.filter(el => el.date_supported.toLocaleString('en-GB').substr(3,7) === '06/'+lastYear).length,
                    July : dogSupport.filter(el => el.date_supported.toLocaleString('en-GB').substr(3,7) === '07/'+lastYear).length,
                    August : dogSupport.filter(el => el.date_supported.toLocaleString('en-GB').substr(3,7) === '08/'+lastYear).length,
                    September : dogSupport.filter(el => el.date_supported.toLocaleString('en-GB').substr(3,7) === '09/'+lastYear).length,
                    October : dogSupport.filter(el => el.date_supported.toLocaleString('en-GB').substr(3,7) === '10/'+lastYear).length,
                    November : dogSupport.filter(el => el.date_supported.toLocaleString('en-GB').substr(3,7) === '11/'+lastYear).length,
                    December : dogSupport.filter(el => el.date_supported.toLocaleString('en-GB').substr(3,7) === '12/'+lastYear).length,
                }

                const catStatThisYear = {
                    January : catSupport.filter(el => el.date_supported.toLocaleString('en-GB').substr(3,7) === '01/'+thisYear).length,
                    February : catSupport.filter(el => el.date_supported.toLocaleString('en-GB').substr(3,7) === '02/'+thisYear).length,
                    March : catSupport.filter(el => el.date_supported.toLocaleString('en-GB').substr(3,7) === '03/'+thisYear).length,
                    April : catSupport.filter(el => el.date_supported.toLocaleString('en-GB').substr(3,7) === '04/'+thisYear).length,
                    May :catSupport.filter(el => el.date_supported.toLocaleString('en-GB').substr(3,7) === '05/'+thisYear).length,
                    June :catSupport.filter(el => el.date_supported.toLocaleString('en-GB').substr(3,7) === '06/'+thisYear).length,
                    July :catSupport.filter(el => el.date_supported.toLocaleString('en-GB').substr(3,7) === '07/'+thisYear).length,
                    August :catSupport.filter(el => el.date_supported.toLocaleString('en-GB').substr(3,7) === '08/'+thisYear).length,
                    September :catSupport.filter(el => el.date_supported.toLocaleString('en-GB').substr(3,7) === '09/'+thisYear).length,
                    October :catSupport.filter(el => el.date_supported.toLocaleString('en-GB').substr(3,7) === '10/'+thisYear).length,
                    November :catSupport.filter(el => el.date_supported.toLocaleString('en-GB').substr(3,7) === '11/'+thisYear).length,
                    December :catSupport.filter(el => el.date_supported.toLocaleString('en-GB').substr(3,7) === '12/'+thisYear).length,
                }

                const catStatLastYear = {
                    January : catSupport.filter(el => el.date_supported.toLocaleString('en-GB').substr(3,7) === '01/'+lastYear).length,
                    February :catSupport.filter(el => el.date_supported.toLocaleString('en-GB').substr(3,7) === '02/'+lastYear).length,
                    March : catSupport.filter(el => el.date_supported.toLocaleString('en-GB').substr(3,7) === '03/'+lastYear).length,
                    April : catSupport.filter(el => el.date_supported.toLocaleString('en-GB').substr(3,7) === '04/'+lastYear).length,
                    May : catSupport.filter(el => el.date_supported.toLocaleString('en-GB').substr(3,7) === '05/'+lastYear).length,
                    June : catSupport.filter(el => el.date_supported.toLocaleString('en-GB').substr(3,7) === '06/'+lastYear).length,
                    July : catSupport.filter(el => el.date_supported.toLocaleString('en-GB').substr(3,7) === '07/'+lastYear).length,
                    August : catSupport.filter(el => el.date_supported.toLocaleString('en-GB').substr(3,7) === '08/'+lastYear).length,
                    September : catSupport.filter(el => el.date_supported.toLocaleString('en-GB').substr(3,7) === '09/'+lastYear).length,
                    October : catSupport.filter(el => el.date_supported.toLocaleString('en-GB').substr(3,7) === '10/'+lastYear).length,
                    November : catSupport.filter(el => el.date_supported.toLocaleString('en-GB').substr(3,7) === '11/'+lastYear).length,
                    December : catSupport.filter(el => el.date_supported.toLocaleString('en-GB').substr(3,7) === '12/'+lastYear).length,
                }
       
                response.render('dashboard', {
                    session, dogsNumberLastYear, catsNumberLastYear, dogStatThisYear, dogStatLastYear, catStatThisYear, catStatLastYear, catRescue, dogRescue, newQuest
                });
            }else{
                response.render('500');
            }
        }catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
},

}

module.exports = dashboardController;