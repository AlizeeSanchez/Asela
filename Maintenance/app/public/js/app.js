

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
        const addNewVeterinary = document.querySelectorAll('.saveVeterinary');
        if(addNewVeterinary){
            addNewVeterinary.forEach((button) => {
                button.addEventListener('click', veterinary.addNewVet);
            });
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
        
        //On cible le bouton valider la date de prise en charge dans la page profil animal
        const checkDateSupported = document.querySelector('.checkDateSupported');
        if(checkDateSupported){
            checkDateSupported.addEventListener('click', onePet.checkDateSupported); 
        }
        
        //On cible le bouton valider la date de vaccin dans la page profil animal
        const checkDateVaccine = document.querySelector('.checkDateVaccine');
        if(checkDateVaccine){
            checkDateVaccine.addEventListener('click', onePet.checkDateVaccine); 
        }
        // On cible le bouton valider une image d'un animal
        const checkUplaodPet = document.querySelector('.addPicturePets');
        if(checkUplaodPet){
            checkUplaodPet.addEventListener('click', onePet.uploadPicturePet);
            console.log(checkUplaodPet);
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
        const addHostFamily = document.querySelector('.addFamilyhost');
        if(addHostFamily){            
            addHostFamily.addEventListener('click', hostfamily.addHostFamily);
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
                console.log(btnsup);
            });    
        }

        //On cible le bouton editPrice
        const editDogPrice = document.querySelector('.validPriceDog');
        if(editDogPrice){
            editDogPrice.addEventListener('click', params.editPriceDog);
        }
        //console.log(editDogPrice);

        //On cible le bouton envoyer un commentaire pour un adoptant
        const addCommentAdoptant = document.querySelector('.addCommentAdoptant');
        if(addCommentAdoptant){         
            addCommentAdoptant.addEventListener('click', adoptant.addCommentAdoptant);
        }

        //on cible les boutons ajouter un commentaire d'une famille d'acceuil
        const addCommentHostfamilly = document.querySelectorAll('.addCommentHostfamilly');
        if(addCommentHostfamilly){   
            addCommentHostfamilly.forEach((btnEdit) => {
                btnEdit.addEventListener('click', hostfamily.addCommentHostfamilly);
            });    
        }
    }
};
// on accroche un écouteur d'évènement sur le document : quand le chargement est terminé, on lance app.init
document.addEventListener('DOMContentLoaded', app.init );