const HostFamily = require("../models/HostFamily");

const hostFamilyController = {
    
    findAllHostFamily: async (request, response) => {
        try{
            const hostFamily = await HostFamily.findAllHostFamily();
            if(hostFamily){
                response.json(hostFamily);
            } else {
                response.status(404).json(`Il n'y a aucune famille d'acceuil trouvés.`);
            }
        }
        catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },

    findOneHostFamily: async (request, response) => {
        try{
            const hostFamilyId = parseInt(request.params.id);
            const hostFamily = await HostFamily.findOneHostFamily(hostFamilyId);
            if(hostFamily){
                response.json(hostFamily)
            }else {
                response.status(404).json(`la famille d'acceuil numéro ${catId} n'existe pas`)
            }
        }catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },


}

module.exports = hostFamilyController;