const dashboardController = {

    //On récupere la dashboard
    home: async (request, response) => {
        try{
            if (request.session.user) {
                response.render('dashboard');
            }else{
                response.render('500');
            }
        }
        catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
},

}

module.exports = dashboardController;