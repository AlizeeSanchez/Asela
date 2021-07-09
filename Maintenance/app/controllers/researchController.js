const Research = require('../models/Research');
const Pet = require('../models/Pet');
const HostFamily = require('../models/HostFamily');
const Adoptant = require('../models/Adoptant');

const researchController = {
    
    loadPet: async (request, response, next) => {
        try {
            const petId = request.params.id;
            const pet = await Pet.findOnePet(petId);
            if (pet) {
                response.pet = pet;
                next();
            }
            else {
                response.status(404).json(`Cet animal n'existe pas.`);
            }
        }catch(error){
            console.trace(error);
        }
    },

    loadHostFamily: async (request, response, next) => {
        try {
            const hostFamilyId = request.params.id;
            const hostFamily = await HostFamilly.findOneHostFamily(hostFamilyId);
            if (hostFamily) {
                response.hostFamily = hostFamily;
                next();
            }
            else {
                response.status(404).json(`Cette famille d'acceuil n'existe pas.`);
            }
        }catch(error){
            console.trace(error);
        }
    },

    loadAdoptant: async (request, response, next) => {
        try {
            const adoptantId = request.params.id;
            const adoptant = await Adoptant.findOneAdoptant(adoptantId);
            if (adoptant) {
                
                response.adoptant = adoptant
            } 
            else {
                response.status(404).json(`Cet adoptant n'existe pas.`);
            }
        }catch(error){
            console.trace(error);
        }
    },

    loadAllSearch: async (request, response, next) => {
        try {
            const queryString = request.query.s;
            const data = await Research.search(queryString);
            if (data) {
                const json = {
                    pet: response.pet,
                    hostFamily: response.hostFamily,
                    adoptant: response.adoptant 
                } 
                response.locals.json = json; 
                next();
            }
            else {
                response.status(404).json(`Ces recherches n'existe pas.`);
            }
        }catch(error){
            console.trace(error);
        }
        
    },

    search: async (request, response) => {
        try {
        response.render('header');
        } catch(error) {
            console.trace(error);
        }
    }
}

module.exports = researchController;