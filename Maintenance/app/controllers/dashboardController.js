const dashboardController = {

    //On récupere la dashboard
    home: async (request, response) => {
        try{
            response.render('dashboard');
        }
        catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }

},

}

module.exports = dashboardController;