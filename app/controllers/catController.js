const Cat = require("../models/Cat");

const catController = {

    allCatsNotAdopted: async (request, response) => {
        try{
            const cats = await Cat.findCatNotAdopted();
            if(cats && cats.type === 'chat'){
                response.json(cats);
            } else {
                response.status(404).json(`Il n'y a aucun chats trouvés qui ne sont pas adoptés.`);
            }
        }
        catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },

    allCatsAdopted: async (request, response) => {
        try{
            const cats = await Cat.findCatAdopted();
            if (cats) {
                response.json(cats);
            } else {
                response.status(404).json(`Il n'y a aucun chat trouvés qui sont adoptés.`);
            }
        }
        catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },


}

module.exports = catController;