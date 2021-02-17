
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

       // On cible le bouton Save change dans la modal modifier
       const valideDog = document.querySelectorAll('.saveChangeDog');
       valideDog.forEach((buttonValidateModify) => {
            buttonValidateModify.addEventListener('click', dog.editDog)
        });

       //On cible le bouton de la modal validation de dépublier/publier un chien
       const publishDog = document.querySelectorAll('.publishSite');
       publishDog.forEach((buttonPublish) => {
       buttonPublish.addEventListener('click', dog.publishDog);
        });
       
       //On cible le bouton supprimer un chien
       const suppDog = document.querySelectorAll('.deleteDog');
       suppDog.forEach((buttonSupp) => {
           buttonSupp.addEventListener('click', dog.suppDog); 
       });

       //On cible le bouton ajouter un chien
       const addNewDog = document.querySelector('.saveNewDog');
       addNewDog.addEventListener('click', dog.addNewDog);  
        
       //On cible le bouton ajouter une FA
       const addHostFamily = document.querySelectorAll('.btn-secondary');
       addHostFamily.forEach((buttonAddFamily) => {             //('a voir avec Alizee pourquoi un forEach pour selectionner que un bouton pour moi c\'est pas cohérent')
           //buttonAddFamily.addEventListener('click', hostfamily.addHostFamily);
       });

       //On cible le bouton modifier la fiche
       const editPet = document.querySelector('#editionPetButton');
       //editPet.addEventListener('click', onepet.editDog);
       
       //On cible le bouton ajouter un évènement
       const addEvent = document.querySelector('.btn-outline-primary');
       //addEvent.addEventListener('click', event.addEvent);
       
      // //On cible la barre de recherche
      // const search = document.getElementById('search');
      // search.addEventListener('keyup', app.search);
      // console.log(search);
    },

    //search: function () {
    //    const input = search.value;
    //    const result = db.filter(result => result);
    //    console.log(result);
    //    
    //}
};
// on accroche un écouteur d'évènement sur le document : quand le chargement est terminé, on lance app.init
document.addEventListener('DOMContentLoaded', evenement.init );