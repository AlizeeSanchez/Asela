

const evenement = {
	init: function () {
		evenement.addListenerToActions();
    },
	addListenerToActions: function () {
        //On cible le bouton Voir un chien
        const seePet = document.querySelectorAll('.dogSee');
        seePet.forEach((buttonSee) => {
            buttonSee.addEventListener('click', dog.seeOnePet)
        });

        //On cible le bouton modifier un chien
        const editDog = document.querySelectorAll('.btn-info');
        editDog.forEach((buttonEdit) => {
        buttonEdit.addEventListener('click', dog)    
       });

       // On cible le bouton Save change dans la modal modifier
       const valideDog = document.querySelector('.saveChangeDog');
       valideDog.addEventListener('click', dog.editDog)
       
       
       
       //On cible le bouton dépublier/publier un chien
       const publishDog = document.querySelectorAll('.publishSite');
       publishDog.forEach((buttonPublish) => {
           buttonPublish.addEventListener('click', dog.publishDog);
       });
       
       
       //On cible le bouton supprimer un chien
       const suppDog = document.querySelectorAll('.btn-danger');
       suppDog.forEach((buttonSupp) => {
           buttonSupp.addEventListener('click', dog.suppDog);
       });

       //On cible le bouton ajouter un chien
       const addNewDog = document.querySelectorAll('.saveNewDog');
       addNewDog.forEach((buttonAddDog) => {
           buttonAddDog.addEventListener('click', dog.addNewDog);
       });
    }
};
// on accroche un écouteur d'évènement sur le document : quand le chargement est terminé, on lance app.init
document.addEventListener('DOMContentLoaded', evenement.init );