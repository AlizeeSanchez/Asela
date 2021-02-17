//request.body.email === idemQuest[0].email | request.body.number_phone === idemQuest[0].number_phone

                //On veux testé si le questionnaire existe deja
                if(!idemQuest){
                    const saveQuestionnaire = await QuestionnaireAdopt.responseQuest(questionnaire);
                    response.json('Votre questionnaire à bien été enregistré !')
                }else if {
                    
                }

                // si oui on actualise selon les données du questionnaire
                // si non on l'ajoute
                else{ 
                    response.json(`Cette adresse email ou ce numero de telephone a deja servi à remplir un questionnaire le ${idemQuest[0].date_sending} pour un ${idemQuest[0].type_pet} dénommé ${idemQuest[0].name_pet}, nous allons actualiser votre questionnaire pour le ${questionnaire.type_pet} dénommé ${questionnaire.name_pet}.`); 
                }
                    
                //    else{
                //    const questRelation = await QuestionnaireAdopt.correspondenceQuest(questionnaire);
                //    response.json(`Cette adresse email ou ce numero de telephone a deja servi à remplir un questionnaire le ${questRelation.date_sending} pour un $//{questRelation.type_pet} dénommé ${questRelation.name_pet}, nous allons actualiser votre questionnaire pour le ${questionnaire.type_pet} dénommé $//{questionnaire.name_pet}.`);
                //    if(questionnaire.type_pet == questRelation.type_pet){
                //        //On appelera la methode qui relance la date du questionnaire + name_pet
                //        update = {
                //            id: questRelation.id,
                //            name_pet: request.body.name_pet,
                //        }
                //    }
                //    if(questionnaire.type_pet == 'chien' && questRelation.type_pet == 'chat'){
                //        //On appelera la methode pour metre a jour tout ce bordel
                //        update = {
                //            id: questRelation.id,
                //            type_pet: request.body.type_pet,
                //            name_pet: request.body.name_pet,
                //            race_pet: request.body.race_pet,
                //            petstatus: request.body.petstatus,
                //            responsability: request.body.responsability,
                //            education2: request.body.education2,
                //            cage: request.body.cage,
                //            cage2: request.body.cage2,
                //            absent: request.body.absent,
                //            present: request.body.present,
                //            activity: request.body.activity,
                //            activity2: request.body.activity2,
                //            educator: request.body.educator,
                //            educator2: request.body.educator2,
                //            educator3: request.body.educator3,
                //        }
                //        await QuestionnaireAdopt.updateDogToCat(update);

                //    }
                //    else if(questionnaire.type_pet == 'chat' && questRelation.type_pet == 'chien'){
                //        //On appelera la methode pour metre a jour tout ce bordel
                //        update = {
                //            id: questRelation.id,
                //            type_pet: request.body.type_pet,
                //            name_pet: request.body.name_pet,
                //            declawing: request.body.declawing, 
                //        }
                //        await QuestionnaireAdopt.updateCatToDog(update);
                //    }
                //}
