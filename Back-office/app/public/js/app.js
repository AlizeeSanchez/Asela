

const evenement = {
	init: function () {
		evenement.addListenerToActions();
		console.log('init event');
	},

	addListenerToActions: function () {
        //On cible le bouton Voir l'animal
        const seePet = document.querySelectorAll('.btn-success');
        seePet.forEach((buttonSee) => {
            buttonSee.addEventListener('click', dog.seeOnePet)
        })
    }
};
// on accroche un écouteur d'évènement sur le document : quand le chargement est terminé, on lance app.init
document.addEventListener('DOMContentLoaded', evenement.init );