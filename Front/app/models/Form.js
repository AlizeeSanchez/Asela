const db = require('../database');
    
const Form = {
    writeFormHostFamily: async (form) => {
        try {
            console.log("model host family :",form);
            const formHostFamily = (`INSERT INTO host_family ("lastname", "firstname", "birthday", "facebook", "postal_code", "city", "adress", "number_phone", "type_home", "area_home", "area_garden",  "fencing", "fencing_height", "job", "email", "number_adult", "number_children", "age_children",  "pet_composition", "pet_accepted_garden", "pet_sterilised",  "kitten_accepted", "cat_accepted", "dog_big_accepted", "dog_middle_accepted", "dog_little_accepted", "puppy_accepted", "family_accept_acceuil", "hour_absence_day", "poeple_amity_cat", "dog_sexe_acceuil", "poeple_educate", "dog_accept_problem",  "dog_closed_room", "dog_sleep", "poeple_with_dog", "poeple_without_dog", "poeple_ask", "poeple_drive_veterinary", "poeple_car",  "poeple_counsciousness", "poeple_motivation", "poeple_warning", "certificate_poeple", "approuved_poeple") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44, $45) RETURNING *; `)

            const dataFormHostFamily = await db.query(formHostFamily, [
                form.lastname,
                form.firstname,
                form.birthday,
                form.facebook,
                form.postal_code,
                form.city,
                form.adress,
                form.number_phone,
                form.type_home,
                form.area_home, 
                form.area_garden,
                form.fencing,
                form.fencing_height,
                form.job,
                form.email,
                form.number_adult,
                form.number_children,
                form.age_children,
                form.pet_composition,
                form.pet_accepted_garden,
                form.pet_sterilised,
                form.kitten_accepted, 
                form.cat_accepted,
                form.dog_big_accepted,
                form.dog_middle_accepted,
                form.dog_little_accepted,
                form.puppy_accepted,
                form.family_accept_acceuil,
                form.hour_absence_day,
                form.poeple_amity_cat,
                form.dog_sexe_acceuil,
                form.poeple_educate,
                form.dog_accept_problem, 
                form.dog_closed_room,
                form.dog_sleep,
                form.poeple_with_dog,
                form.poeple_without_dog,
                form.poeple_ask, 
                form.poeple_drive_veterinary,
                form.poeple_car,
                form.poeple_counsciousness,
                form.poeple_motivation, 
                form.poeple_warning,
                form.certificate_poeple,
                form.approuved_poeple
            ]); 
            return dataFormHostFamily.rows[0];
        }
        catch(error){
            console.trace(error)
        }
    },

    writeFormAdopt: async (form) => {
        try {
            console.log("model adoptant :",form);
            const formAdopt = (`INSERT INTO questionnaire_adopt ("email","lastname","firstname","date_birth","occupation","postal_code","city","adress","number_phone","lastname_firstname_spouse","date_birth_spouse","occupation_spouse","number_adult","number_children","age_children","type_pet","name_pet","shifting","type_residence","proprietor","fencing","height_fence","area_home","area_garden","allergy","adopt_assos","adopt_assos2","abandoned_assos","abandoned_assos2","pet_familly","pet_familly2","pet_familly_deceased","veterinary","veterinary2","veterinary3","disponibility","disponibility2","holiday","holiday2","awareness","education","informed","adopt","adopt2","tomove","sterilization","forbearance","cleanliness","amity","garden","bed","waiting","motivation","declawing","race_pet","petstatus","responsability","education2","cage","cage2","absent","present","activity","activity2","educator","educator2","educator3","facebook_pseudo","advertisement","free","certificate_people","approuved_people") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44, $45, $46, $47, $48, $49, $50, $51, $52, $53, $54, $55, $56, $57, $58, $59, $60, $61, $62, $63, $64, $65, $66,$67, $68, $69, $70, $71, $72) RETURNING *; `)

            const dataFormAdopt = await db.query(formAdopt, [
                form.email,
                form.lastname,
                form.firstname,
                form.date_birth,
                form.occupation,
                form.postal_code,
                form.city,
                form.adress,
                form.number_phone,
                form.lastname_firstname_spouse,
                form.date_birth_spouse,
                form.occupation_spouse,
                form.number_adult,
                form.number_children,
                form.age_children,
                form.type_pet,
                form.name_pet,
                form.shifting,
                form.type_residence,
                form.proprietor,
                form.fencing,
                form.height_fence,
                form.area_home,
                form.area_garden,
                form.allergy,
                form.adopt_assos,
                form.adopt_assos2,
                form.abandoned_assos,
                form.abandoned_assos2,
                form.pet_familly,
                form.pet_familly2,
                form.pet_familly_deceased,
                form.veterinary,
                form.veterinary2,
                form.veterinary3,
                form.disponibility,
                form.disponibility2,
                form.holiday,
                form.holiday2,
                form.awareness,
                form.education,
                form.informed,
                form.adopt,
                form.adopt2,
                form.tomove,
                form.sterilization,
                form.forbearance,
                form.cleanliness,
                form.amity,
                form.garden,
                form.bed,
                form.waiting,
                form.motivation,
                form.declawing,
                form.race_pet,
                form.petstatus,
                form.responsability,
                form.education2,
                form.cage,
                form.cage2,
                form.absent,
                form.present,
                form.activity,
                form.activity2,
                form.educator,
                form.educator2,
                form.educator3,
                form.facebook_pseudo,
                form.advertisement,
                form.free,
                form.certificate_people,
                form.approuved_people
            ]);  
            return dataFormAdopt.rows[0];
        }
        catch(error){
            console.trace(error)
        }
    }
}

module.exports = Form;