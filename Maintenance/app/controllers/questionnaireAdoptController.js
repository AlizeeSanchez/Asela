const QuestionnaireAdopt = require("../models/QuestionnaireAdopt");
const Adoptant = require("../models/Adoptant");
const Pet = require("../models/Pet");

const questionnaireAdoptController = {
    
    //Supprimer un questionnaire
    suppQuest: async (request, response) => {
        
        try{
            if (request.session.user) {
                const questId = parseInt(request.params.id);
                const questionnaire = await QuestionnaireAdopt.findOneQuestAdopt(questId);
                if(questionnaire){
                    await QuestionnaireAdopt.suppQuest(questId);
                    response.json('Ce questionnaire a été supprimé avec succès.')
                } else {
                    response.json('Ce questionnaire ne peut pas etre supprimé car il n\'existe pas.');
                }
            }else{
                response.render('500');
            }
        }
        catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }  
    },
    
    
    //Checker un questionnaire
    findOneQuestAdopt : async (request, response) => {
        try {
            if (request.session.user) {
                const questAdoptId = parseInt(request.params.id);
                const questAdopt = await QuestionnaireAdopt.findOneQuestAdopt(questAdoptId);
                const allPet = await Pet.findAllPet();
                const correspondance = await QuestionnaireAdopt.correspondanceSearch(questAdopt[0]);
                const searchBlackList = await QuestionnaireAdopt.blackListSearch(questAdopt[0]);
                if(searchBlackList.length >= 1){
                    blackList = true;
                }else{
                    blackList = false;
                } 
                if (questAdopt) {
                    response.render('oneQuestionnaire', {
                        questAdopt,
                        allPet,
                        correspondance,
                        blackList,
                        searchBlackList
                    });
                } else {
                    response.status(404).json(`Ce questionnaire n'existe pas.`);
                }
            }else{
                response.render('500');
            }
        } catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },
    
    //Methode pour traité un questionnaire
    attributeQuest: async(request, response) => {
        try {
            if (request.session.user) {
                const questId = parseInt(request.params.id);
                const quest = await QuestionnaireAdopt.findOneQuestAdopt(questId);
                if(quest){
                    const jason = {
                        id: questId,
                        pet_id: request.body.dataQuestPet,
                        pet_name: request.body.dataQuestPet,
                        status: request.body.dataQuestStatus,
                        meet: request.body.dataQuestMeet,
                        comment: request.body.dataQuestComment,
                    }
                    if(jason.status === 'Traité'){
                        await QuestionnaireAdopt.traitedQuest(jason);
                    }else if(jason.status === 'Refusé'){
                        await QuestionnaireAdopt.refusedQuest(jason);
                    }else if(jason.status === 'Rencontre'){
                        await QuestionnaireAdopt.meetQuest(jason);
                    }else if(jason.status === 'Sans suite'){
                        await QuestionnaireAdopt.abandonnedQuest(jason);
                    }else if(jason.status === 'Adoptant'){
                        await QuestionnaireAdopt.adoptQuest(jason);
                        const questId = parseInt(request.params.id);
                        const data = await QuestionnaireAdopt.findOneQuestAdopt(questId);
                        if(data){
                            await QuestionnaireAdopt.passQuestToAdoptant(data);
                            const newAdoptantId = await Adoptant.searchAdoptant(data); 
                            if(newAdoptantId){
                                data_pet = {
                                    adoptant_id : newAdoptantId[0].id,
                                    date: request.body.dataQuestMeet,
                                    id : jason.pet_id
                                }
                                // On le file a notre pet
                                await Adoptant.AdoptantToPet(data_pet);
                            } 
                        }
                        response.redirect('http://localhost:3030/v1/questionnaire');
                    }else if(jason.status === `Liste d'attente`){
                        await QuestionnaireAdopt.waitList(jason);
                        response.redirect('http://localhost:3030/v1/questionnaire');
                    }
                }else {
                    response.status(404).json(`Ce questionnaire n'existe pas.`);
                }
            }else{
                response.render('500');
            }
        }catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },
    
    findAllQuestionnaire : async (request, response) => {
        try {
            if (request.session.user) {
                const waiting = await QuestionnaireAdopt.findAllQuestAdoptWaiting();  //En attente
                const processed = await QuestionnaireAdopt.findAllQuestAdoptProcessed(); //Traité
                const refused = await QuestionnaireAdopt.findAllQuestAdoptRefused(); //Refusé
                const discontinued = await QuestionnaireAdopt.findAllQuestAdoptDiscontinued(); //Sans suite
                const adopted = await QuestionnaireAdopt.findAllQuestAdopted(); //Adopté
                if (waiting||processed||refused||discontinued||adopted/*|waintingList*/) {
                    response.render('questionnaireAdopt', {
                        waiting,
                        processed,
                        refused,
                        discontinued,
                        adopted,
                    });
                } else {
                    response.status(404).json(`Aucun questionnaire existant.`);
                }
            }else{
                response.render('500');
            }
        } 
        catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },
    
    //Afficher les questionnaires refusé
    findAllQuestAdoptRefused : async (request, response) => {
        try {  
            if (request.session.user) {
                const questAdoptRefused = await QuestionnaireAdopt.findAllQuestAdoptRefused();
                if(questAdoptRefused) {
                    response.json(questAdoptRefused);
                } else {
                    response.status(404).json(`Il  n'y a pas de questionnaire dans cette liste actuellement`);
                }
            }else{
                response.render('500');
            }  
        } 
        catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },
    
    //Sans suite
    findAllQuestAdoptSsSuite : async (request, response) => {
        try {        
            if (request.session.user) {
                const questAdoptAbandonned = await QuestionnaireAdopt.findAllQuestAdoptAbandonned();
                
                if(questAdoptAbandonned) {
                    response.json(questAdoptAbandonned);
                } else {
                    response.status(404).json(`Il  n'y a pas de questionnaire dans cette liste actuellement.`);
                }
            }else{
                response.render('500');
            }
        } 
        catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },
    
    //Passer les données d'un questionnaire adoption a "blacklister"
    passAdoptantToBlacklist : async (request, response) => {
        try {
            if (request.session.user) {
                const questAdoptantId = parseInt(request.params.id);
                const quest = await QuestionnaireAdopt.findOneQuestAdopt(questAdoptantId);
                if (quest) {
                    //je lance la methode pour rechercher le questionnaire a mettre en blacklist
                    const blacklist = {
                        id: questAdoptantId,
                        lastname: quest[0].lastname,
                        firstname: quest[0].firstname,
                        postal_code: quest[0].postal_code,
                        number_phone: quest[0].number_phone,
                        city: quest[0].city,
                        email: quest[0].email,
                        adress: quest[0].adress,
                        explication: quest[0].refused_comment
                    }
                    const adoptant = await QuestionnaireAdopt.putOneQuestToBlacklist(blacklist)
                    response.json({ adoptant, TEXT: 'Cet adoptant à bien été rajouter en blacklist'})
                }
            }else{
                response.render('500');
            }
        }catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    }
}

module.exports = questionnaireAdoptController;