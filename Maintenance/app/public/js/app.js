

const app = {
    
    init: function () {
        app.addListenerToActions();
    },
    
    addListenerToActions: function () {
        
        //On cible le bouton ajouter un chien
        const addNewDog = document.querySelector('.saveNewDog');
        if(addNewDog){
            addNewDog.addEventListener('click', pet.addNewDog);
        }
        
        //On cible le bouton ajouter un chat
        const addNewCat = document.querySelector('.saveNewCat');
        if(addNewCat){
            addNewCat.addEventListener('click', pet.addNewCat);
        }
        
        
        //On cible le bouton ajouter reservation
        const btnbook = document.querySelectorAll('.bookPet');
        if(btnbook){
            btnbook.forEach((buttonBook) => {
                buttonBook.addEventListener('click', pet.bookPet);
            });
        }
        
        //On cible le bouton de la modal validation de dépublier/publier un animal
        const publishPet = document.querySelectorAll('.publishSite');
        if(publishPet){
            publishPet.forEach((buttonNewVet) => {
                buttonNewVet.addEventListener('click', pet.publishPet);
            });
        }

        //On cible le bouton supprimer un animal
        const suppPet = document.querySelectorAll('.deletePet');
        if(suppPet){
            suppPet.forEach((buttonSupp) => {
                buttonSupp.addEventListener('click', pet.deletePet);
            });   
        }
        
        //On cible le bouton pour ajouter un veterinaire
        const addNewVeterinary = document.querySelector('.saveVeterinary');
        if(addNewVeterinary) {
            addNewVeterinary.addEventListener('click', veterinary.addNewVet);
        }
        
        //On cible le bouton pour modifier un veterinaire
        const editVeterinary = document.querySelectorAll('.saveEditVeterinary');
        if(editVeterinary){
            editVeterinary.forEach((button) => {
                button.addEventListener('click', veterinary.editVeterinary);
            });
        }
        
        //On cible le bouton pour supprimer un veterinaire
        const deleteVeterinary = document.querySelectorAll('.deleteVeterinary');
        if(deleteVeterinary){
            deleteVeterinary.forEach((button) => {
                button.addEventListener('click', veterinary.deleteVeterinary);
            });
        }
        
        // On cible le bouton Save change dans la modal modifier de la fiche animale
        const validePet = document.querySelector('.saveChangePet');
        if(validePet){
            validePet.addEventListener('click', onePet.editPet); 
        }

        // On cible le bouton deleteImg dans la modal image
        const delImgPet = document.querySelectorAll('.deleteImg');
        if(delImgPet){
            delImgPet.forEach((button) => {
                button.addEventListener('click', onePet.delImg);
            });
        }

        // On cible le bouton deleteImg dans la modal image
        const deleteCommentPet = document.querySelectorAll('.deleteCommentPet');
        if(deleteCommentPet){
            deleteCommentPet.forEach((button) => {
                button.addEventListener('click', onePet.deleteCommentPet);
                console.log(deleteCommentPet);
            });
        }
        
        //On cible le bouton valider la date de vaccin dans la page profil animal
        const checkDateVaccine = document.querySelector('.checkDateVaccine');
        if(checkDateVaccine){
            checkDateVaccine.addEventListener('click', onePet.checkDateVaccine); 
        }

        //On cible le bouton valider la date de vaccin dans la page profil animal
        const checkDateSupported = document.querySelector('.checkDateSupported');
        if(checkDateSupported){
            checkDateSupported.addEventListener('click', onePet.checkDateSupported); 
        }

        
        //On cible le bouton Valider les modification d'une famille d'acceuil
        const validateHostFamily = document.querySelector('.saveHostFamily');
        if(validateHostFamily){
            validateHostFamily.addEventListener('click', onePet.validateIdHostFamily);
        }
        
        //On cible le bouton Valider un commentaire d'un animal
        const valideCommentPet = document.querySelector('.ValideCommentPet');
        if(valideCommentPet){
            valideCommentPet.addEventListener('click', onePet.validateCommentPet);
        }
        
        //On cible le bouton ajouter une FA
        const addHostFamily = document.querySelector('.addHostfamilly');
        if(addHostFamily){            
            addHostFamilyaddCommentPet.addEventListener('click', hostfamily.addHostFamily);
        }
    
        //On cible le bouton modifier la fiche de l'animal
        const editPet = document.querySelector('#editionPetButton');
        if(editPet){
            //editPet.addEventListener('click', onepet.editDog);
        }

        //On cible le bouton ajouter un blacklister
        const addNewBlacklist = document.querySelector('.saveNewBlacklist');
        if(addNewBlacklist){
            addNewBlacklist.addEventListener('click', blacklist.addBlacklist);
        }

        //On cible le bouton supprimer un blacklister
        const deleteBlacklist = document.querySelectorAll('.deleteBlacklist');
        if(deleteBlacklist){
            deleteBlacklist.forEach((btnsup) => {
                btnsup.addEventListener('click', blacklist.deleteBlacklist);
            });    
        }

        //On cible le bouton editPrice des chiens
        const editDogPrice = document.querySelector('.validPriceDog');
        if(editDogPrice){
            editDogPrice.addEventListener('click', params. editPriceDog);
        }

         //On cible le bouton editPrice des chats
         const editCatPrice = document.querySelector('.validPriceCat');
         if(editCatPrice){
             editCatPrice.addEventListener('click', params. editPriceCat);
         }

         //On cible le bouton edit le prix des chiens de races
         const editPriceBreedPet = document.querySelector('.editPriceBreed');
         if(editPriceBreedPet){
            editPriceBreedPet.addEventListener('click', params. editPriceBreedPet);
         }

        //On cible le bouton envoyer un commentaire pour un adoptant
        const addCommentAdoptant = document.querySelector('.addCommentAdoptant');
        if(addCommentAdoptant){         
            addCommentAdoptant.addEventListener('click', adoptant.addCommentAdoptant);
        }

         //On cible le bouton valider pour modifier une FA
         const editCommentAdoptant = document.querySelectorAll('.editCommentaire');
         if(editCommentAdoptant){         
            editCommentAdoptant.forEach((btnEdit) => {
                btnEdit.addEventListener('click', adoptant.editComment);
             });
         }

        //On cible le bouton supprimer un commentaire pour un adoptant
        const delCommentAdoptant = document.querySelectorAll('.deleteComment');
        if(delCommentAdoptant){         
            delCommentAdoptant.forEach((btnSupp) => {
                btnSupp.addEventListener('click', adoptant.suppComment);
            });
        }

        //on cible les boutons ajouter un commentaire d'une famille d'acceuil
        const addCommentHostfamilly = document.querySelectorAll('.addCommentHostfamilly');
        if(addCommentHostfamilly){   
            addCommentHostfamilly.forEach((btnEdit) => {
                btnEdit.addEventListener('click', hostfamily.addCommentHostfamilly);
            });    
        }

        // on cible le bouton traiter dans le questionnaire adoptant
        const treatment = document.querySelectorAll('.treatment');
        if(treatment) {
            treatment.forEach((btn) => {
                btn.addEventListener('click', adoptant.treatmentQuest);
            });
        }  

        //On cible le bouton envoyer un commentaire pour un animal
        const addCommentPet = document.querySelector('.addCommentPet');
        if(addCommentPet){         
            addCommentPet.addEventListener('click', onePet.addCommentPet);
        }

        //On cible le bouton ajouter une condition
        const addCondition = document.querySelector('.newTerm');
        if(addCondition){         
            addCondition.addEventListener('click', params.addNewCondition);
        }

        //On cible le bouton modifier une condition
        const editCondition = document.querySelectorAll('.editProviso');
        if(editCondition){         
            editCondition.forEach((btnEdit) => {
                btnEdit.addEventListener('click', params.editCondition);
            });
        } 

        //On cible le bouton supprimer une condition
        const suppCondition = document.querySelectorAll('.deleteClause');
        if(suppCondition){         
            suppCondition.forEach((btnSupp) => {
                btnSupp.addEventListener('click', params.suppCondition);
            });
        }

         //On cible le bouton valider pour modifier une FA
         const editFA = document.querySelectorAll('.editFA');
         if(editFA){         
            editFA.forEach((btnEditFA) => {
                 btnEditFA.addEventListener('click', hostfamily.editHostFamilly);
            });
         }

         //On cible le bouton mettre en blacklist une FA
         const blacklistFA = document.querySelectorAll('.blacklistFA');
         if(blacklistFA){         
            blacklistFA.forEach((btn) => {
                 btn.addEventListener('click', hostfamily.blacklistHostFamilly);
             });
         }

         //On cible le bouton mettre en blacklist une FA
         const blacklistAdoptant = document.querySelectorAll('.blacklistAdoptant');
         if(blacklistAdoptant){         
            blacklistAdoptant.forEach((btn) => {
                 btn.addEventListener('click', adoptant.blacklistAdoptant);
             });
         }

          // on cible le bouton inscription dans la page signin
        const signin = document.querySelector('.validateUser');
        if(signin){
            signin.addEventListener('click', user.saveUser);
        console.log(signin);   
        }

        // on cible le bouton se connecter dans la page login
        const login = document.querySelector('.login');
        if(login){
            login.addEventListener('click', user.loginUser); 
     
        }
    }
};
// on accroche un écouteur d'évènement sur le document : quand le chargement est terminé, on lance app.init
document.addEventListener('DOMContentLoaded', app.init );