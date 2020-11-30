

const evenement = {
	init: function () {
		evenement.addListenerToActions();
		console.log('init event');
	},

	addListenerToActions: function () {
        //On cible le bouton Voir un chien
        const seePet = document.querySelectorAll('.btn-success');
        seePet.forEach((buttonSee) => {
            buttonSee.addEventListener('click', dog.seeOnePet)
        });
        //On cible le bouton modifier un chien
        const editDog = document.querySelectorAll('.btn-info');
        editDog.forEach((buttonEdit) => {
        buttonEdit.addEventListener('click', dog.editDog)    
       });
    }
};
// on accroche un écouteur d'évènement sur le document : quand le chargement est terminé, on lance app.init
document.addEventListener('DOMContentLoaded', evenement.init );