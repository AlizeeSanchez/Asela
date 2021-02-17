const db = require("../database");

const Research = {

    search: (queryString, callback) => {
        // premier cas possible : queryString est vide => on renvoie tous les cocktails!
        if (!queryString) {
           const resultSearch = db;
            
        } else {
            // si on a bien une recherche => on va filtrer les cocktails 

            const result = db.filter( json => {
                // - chercher dans l'animal
                if ( json.pet[0].name.toLowerCase().includes(queryString) ) {
                    return true;
                }
                if ( json.pet[0].last_name_pet.toLowerCase().includes(queryString) ) {
                    return true;
                }
                if ( json.pet[0].type.toLowerCase().includes(queryString) ) {
                    return true;
                }
                if ( json.pet[0].age.toLowerCase().includes(queryString) ) {
                    return true;
                }
                if ( json.pet[0].sexe.toLowerCase().includes(queryString) ) {
                    return true;
                }
                if ( json.pet[0].color.toLowerCase().includes(queryString) ) {
                    return true;
                }
                if ( json.pet[0].ide.toLowerCase().includes(queryString) ) {
                    return true;
                }
                if ( json.pet[0].sterilised.toLowerCase().includes(queryString) ) {
                    return true;
                }
                if ( json.pet[0].date_supported.toLowerCase().includes(queryString) ) {
                    return true;
                }
                if ( json.pet[0].breed.toLowerCase().includes(queryString) ) {
                    return true;
                }
                if ( json.pet[0].weight.toLowerCase().includes(queryString) ) {
                    return true;
                }
                if ( json.pet[0].date_adopting.toLowerCase().includes(queryString) ) {
                    return true;
                }

                // - chercher dans les familles d'acceuils
                if (json.hostFamilly[1].lastname.includes(queryString)) {
                    return true;
                }
                if (json.hostFamilly[1].firstname.includes(queryString)) {
                    return true;
                }
                if (json.hostFamilly[1].number_phone.includes(queryString)) {
                    return true;
                }
                if (json.hostFamilly[1].postal_code.includes(queryString)) {
                    return true;
                }
                if (json.hostFamilly[1].city.includes(queryString)) {
                    return true;
                }
                if (json.hostFamilly[1].adress.includes(queryString)) {
                    return true;
                }
                if (json.hostFamilly[1].email.includes(queryString)) {
                    return true;
                }


                // - chercher dans les adoptants
                if (json.adoptant[2].lastname.includes(queryString)) {
                    return true;
                }
                if (json.adoptant[2].firstname.includes(queryString)) {
                    return true;
                }
                if (json.adoptant[2].postal_code.includes(queryString)) {
                    return true;
                }
                if (json.adoptant[2].number_phone.includes(queryString)) {
                    return true;
                }
                if (json.adoptant[2].city.includes(queryString)) {
                    return true;
                }
                if (json.adoptant[2].email.includes(queryString)) {
                    return true;
                }
                if (json.adoptant[2].adress.includes(queryString)) {
                    return true;
                }
            });

            // une fois qu'on a filtré les résultats, on les transmet au callback 
            callback(result);
        }

    },

}

module.exports = Research;