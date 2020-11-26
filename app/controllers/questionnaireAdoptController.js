const QuestionnaireAdopt = require("../models/QuestionnaireAdopt");

const questionnaireAdoptController = {

    //Répondre à un questionnaire
    responseQuest: async (request, response) => {
        try{
            const questAdoptions = await QuestionnaireAdopt.findAllQuestAdopt();

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
                console.log(questAdoptions)
                if(request.body.email === questAdoptions.email | request.body.number_phone === questAdoptions.number_phone ){
                    const saveQuestionnaire = await QuestionnaireAdopt.responseQuest(questionnaire);
                    response.json('Votre questionnaire à bien été enregistré !')
                }else{
                    const questRelation = await QuestionnaireAdopt.correspondenceQuest(questionnaire);
                    console.log(questRelation);
                    response.json(`Cette adresse email ou ce numero de telephone a deja servi a remplir un questionnaire le ${questRelation.date_sending} pour un ${questRelation.type_pet} dénommé ${questRelation.name_pet}`);
                }
                
                
            } else {
                response.json('Vous n\'avez pas rempli tous les champs !');
            }
            
        }catch(error){
            console.trace(error);
        }
    }


}

module.exports = questionnaireAdoptController;