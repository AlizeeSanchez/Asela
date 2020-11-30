const QuestionnaireAdopt = require("../models/QuestionnaireAdopt");
const Adoptant = require("../models/Adoptant");

const questionnaireAdoptController = {

    //Répondre à un questionnaire
    responseQuest: async (request, response) => {
        try{
            if(request.body.email && request.body.type_pet && request.body.lastname && request.body.firstname && request.body.date_birth && request.body.occupation && request.body.number_phone && request.body.postal_code && request.body.city && request.body.adress){
                //On recupere les données envoyées par le body
                questionnaire = {
                    email: request.body.email,
                    type_pet: request.body.type_pet,
                    name_pet: request.body.name_pet,
                    lastname: request.body.lastname,
                    firstname: request.body.firstname,
                    date_birth: request.body.date_birth,
                    occupation: request.body.occupation,
                    lastname_firstname_spouse: request.body.lastname_firstname_spouse,
                    date_birth_spouse: request.body.date_birth_spouse,
                    occupation_spouse: request.body.ooccupation_spouse,
                    number_phone: request.body.number_phone,
                    postal_code: request.body.postal_code,
                    city: request.body.city,
                    adress: request.body.adress,
                    shifting: request.body.shifting,
                    type_residence: request.body.type_residence,
                    height_fence: request.body.height_fence,
                    proprietor: request.body.proprietor,
                    number_adult: request.body.number_adult,
                    number_children: request.body.number_children,
                    age_children: request.body.age_children,
                    allergy: request.body.allergy,
                    adopt_assos: request.body.adopt_assos,
                    adopt_assos2: request.body.adopt_assos2,
                    trust_assos: request.body.trust_assos,
                    trust_assos2: request.body.trust_assos2,
                    pet_familly: request.body.pet_familly,
                    pet_familly2: request.body.pet_familly2,
                    pet_familly_deceased: request.body.pet_familly_deceased,
                    veterinary: request.body.veterinary,
                    veterinary2: request.body.veterinary2,
                    veterinary3: request.body.veterinary3,
                    disponibility: request.body.disponibility,
                    disponibility2: request.body.disponibility2,
                    holiday: request.body.holiday,
                    holiday2: request.body.holiday2,
                    awareness: request.body.awareness,
                    education: request.body.education,
                    informed: request.body.informed,
                    adopt: request.body.adopt,
                    adopt2: request.body.adopt2,
                    tomove: request.body.tomove,
                    sterilization: request.body.sterilization,
                    forbearance: request.body.forbearance,
                    cleanliness: request.body.cleanliness,
                    amity: request.body.amity,
                    garden: request.body.garden,
                    bed: request.body.bed,
                    waiting: request.body.waiting,
                    motivation:  request.body.motivation,
                    // chats
                    declawing: request.body.declawing,
                    //chiens
                    race_pet: request.body.race_pet,
                    petstatus: request.body.petstatus,
                    responsability: request.body.responsability,
                    education2: request.body.education2,
                    cage: request.body.cage,
                    cage2: request.body.cage2,
                    absent: request.body.absent,
                    present: request.body.present,
                    activity: request.body.activity,
                    activity2: request.body.activity2,
                    educator: request.body.educator,
                    educator2: request.body.educator2,
                    educator3: request.body.educator3,
                    //complementaire
                    facebook_pseudo: request.body.facebook_pseudo,
                    advertisement: request.body.advertisement,
                    free: request.body.free 
                };

                //controler si mon adresse email ou mon numero de telephone a deja été utilisé dasn le passé pour creer un questionnaire (s'il existe en bdd).
                    //recuperer tout mes emails et number_phone en bdd
                    const bd = await QuestionnaireAdopt.findAllQuestAdopt();
                    //console.log('tout mes questionnaires', bd);
                    //Les passé a ma methode pou qu'elle les compare au body
                    const compare = await QuestionnaireAdopt.correspondenceQuest(questionnaire);
                    console.log(compare);

                    if(compare){
                        response.json(`Cette adresse email ou ce numero de telephone a deja servi à remplir un questionnaire le ${compare.date_sending} pour un ${compare.type_pet} dénommé ${compare.name_pet}, nous allons actualiser votre questionnaire pour le ${questionnaire.type_pet} dénommé ${questionnaire.name_pet}.`);
                            // Si le type d'animal demandé est inchangé, je renvois juste le nom de l'animal et j'actualise la date (now)
                            if(questionnaire.type_pet === compare.type_pet){
                                update = {
                                    id: compare.id,
                                    name_pet: request.body.name_pet
                                }
                                await QuestionnaireAdopt.updateSame(update);
                            }
                            if((questionnaire.type_pet === 'chien') && (compare.type_pet === 'chat')){
                                update = {
                                    id: compare.id,
                                    type_pet: 'chien',
                                    name_pet: request.body.name_pet,
                                    race_pet: request.body.race_pet,
                                    petstatus: request.body.petstatus,
                                    responsability: request.body.responsability,
                                    education2: request.body.education2,
                                    cage: request.body.cage,
                                    cage2: request.body.cage2,
                                    absent: request.body.absent,
                                    present: request.body.present,
                                    activity: request.body.activity,
                                    activity2: request.body.activity2,
                                    educator: request.body.educator,
                                    educator2: request.body.educator2,
                                    educator3: request.body.educator3
                                }
                                await QuestionnaireAdopt.updateCatToDog(update);
                            }
                            else if ((questionnaire.type_pet === 'chat') && (compare.type_pet === 'chien')){
                                update = {
                                    id: compare.id,
                                    type_pet: 'chat',
                                    name_pet: request.body.name_pet,
                                    declawing: request.body.declawing 
                                } 
                                await QuestionnaireAdopt.updateDogToCat(update);
                            }
                    }else{
                        const saveQuestionnaire = await QuestionnaireAdopt.responseQuest(questionnaire);
                        response.json('Votre questionnaire à bien été enregistré !')
                    }
            } else {
                response.json('Vous n\'avez pas rempli tous les champs !');
            }
            
        }catch(error){
            console.trace(error);
        }
    },
    
    //Supprimer un questionnaire
    suppQuest: async (request, response) => {
        try{
           const questId = parseInt(request.params.id);
           const questionnaire = await QuestionnaireAdopt.findOneQuestAdopt(questId);
           console.log(questionnaire)
           if(questionnaire){
               
            await QuestionnaireAdopt.suppQuest(questId);
               response.json('Ce questionnaire a été supprimé avec succès.')
 
           } else {
             response.json('Ce questionnaire ne peut pas etre supprimé car il n\'existe pas.');
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
            const questAdoptId = parseInt(request.params.id);
            const questAdopt = await QuestionnaireAdopt.findOneQuestAdopt(questAdoptId);
            if (questAdopt) {
                response.json(questAdopt);
            } else {
                response.status(404).json(`Ce questionnaire n'existe pas.`);
            }

         } 
         catch(error){
             console.trace(error)
             return response.status(500).json(error.toString());
         }

    },

    //Methode pour traité un questionnaire
    attributeQuest: async(request, response) => {
        try {
            const questId = parseInt(request.params.id);
            const quest = await QuestionnaireAdopt.findOneQuestAdopt(questId);
            if(quest){
            const jason = {
                id: questId,
                pet_id: request.body.pet_id,
                status: request.body.status,
                meet: request.body.meet,
                refused_comment: request.body.refused_comment,
                general_comment: request.body.general_comment
            }
            await QuestionnaireAdopt.updateQuest(jason);
            response.json(`Ce questionnaire a été ${jason.status}`);
            }else {
                response.status(404).json(`Ce questionnaire n'existe pas.`);
            }

        }catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },

    //Afficher les questionnaires en attente // refusé // sans suite
    findAllQuestAdoptWaiting : async (request, response) => {
        try {
            //recuperer tout tes questionnaire en attente
            const allQuest = await QuestionnaireAdopt.findAllQuestAdopt();
            const questAdoptWaiting = await QuestionnaireAdopt.findAllQuestAdoptWaiting(allQuest); 
            
           if (questAdoptWaiting) {
               response.json(questAdoptWaiting);
           }

           const allQuestR = await QuestionnaireAdopt.findAllQuestAdopt();           
           const questAdoptRefused = await QuestionnaireAdopt.findAllQuestAdoptRefused(allQuest);

           if(questAdoptRefused) {
             response.json(questAdoptRefused);
           }
           
           const allQuestA = await QuestionnaireAdopt.findAllQuestAdopt();
           const questAdoptAbandonned = await QuestionnaireAdopt.findAllQuestAdoptAbandonned(allQuest);

           if(questAdoptAbandonned) {
            response.json(questAdoptAbandonned);
           } else {
               response.status(404).json(`Ce questionnaire n'existe pas.`);
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
                const questAdoptRefused = await QuestionnaireAdopt.findAllQuestAdoptRefused();
        
            if(questAdoptRefused) {
                response.json(questAdoptRefused);
            } else {
           response.status(404).json(`Il  n'y a pas de questionnaire dans cette liste actuellement`);
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
            const questAdoptAbandonned = await QuestionnaireAdopt.findAllQuestAdoptAbandonned();
    
        if(questAdoptAbandonned) {
            response.json(questAdoptAbandonned);
        } else {
       response.status(404).json(`Il  n'y a pas de questionnaire dans cette liste actuellement.`);
        }

        } 
        catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },


    //Passer les données d'un questionnaire adoption a "adoptant", on passe aussi le chien a "adopté = true" et on donne l'id de l'adoptant a l'animal
    passQuestToAdoptant : async (request, response) => {
        try {
            const questId = parseInt(request.params.id);
            const quest = await QuestionnaireAdopt.findOneQuestAdopt(questId);
        if(quest) {

            //Je cherche dans mes adoptant pour recuperer l'adoptant s'il existe deja
            const adoptantID = await Adoptant.correspondenceAdoptant(quest);

            if(!adoptantID){
                //Je lance la methode qui creer l'adoptant
                const adoptant = await QuestionnaireAdopt.passQuestToAdoptant(quest);
                //Je cherche dans mes adoptant pour recuperer celui que je viens de creer
                const adoptantRecup = await Adoptant.correspondenceAdoptant(quest); 
            
                // Je recupere toutes mes données pour modifier mon animal
                const petAttribut = {
                    adoptant_id: adoptantRecup.id,
                    pet_id: quest[0].pet_id 
                };
                //Je lance la methode qui va modifier l'animal avec les element de sa famille adoptive
                const petAdopt = await Adoptant.petAdopt(petAttribut);
                console.log(petAttribut);
                
                response.json(adoptantRecup, petAdopt);
            
            }else{
                //Je cherche dans mes adoptant pour recuperer l'adoptant qui correspond
                const adoptantID = await Adoptant.correspondenceAdoptant(quest); 
            
                // Je recupere toutes mes données pour modifier mon animal
                const petAttribut = {
                    adoptant_id: adoptantID.id,
                    pet_id: quest[0].pet_id 
                };
                //Je lance la methode qui va modifier l'animal avec les element de sa famille adoptive
                const petAdopt = await Adoptant.petAdopt(petAttribut);
                console.log(petAttribut);
                
                response.json(adoptantID, petAdopt);
            }

        } else {
       response.status(404).json(`Nous n'avons pas pu executer cette requete.`);
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
            const questAdoptantId = parseInt(request.params.id);
            const quest = await QuestionnaireAdopt.findOneQuestAdopt(questAdoptantId);
            console.log('first',quest);
            
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
                console.log('second',blacklist);

                const adoptant = await QuestionnaireAdopt.putOneQuestToBlacklist(blacklist)
                console.log('troisieme',adoptant);
                
                response.json({ adoptant, TEXT: 'Cet adoptant à bien été rajouter en blacklist'})
            }

        }catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    }
}

module.exports = questionnaireAdoptController;