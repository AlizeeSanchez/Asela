const app = {
    
	init: function () {
		app.addListenerToActions();
    },

	addListenerToActions: function () {

        //Listen button valide to form host Family
        const valideFormHostFamily = document.querySelector('.valideFormHostFamily');
        if(valideFormHostFamily){
            valideFormHostFamily.addEventListener('click', app.valideFormHF)
            console.log(valideFormHostFamily);
        }

        //Listen button valide to form adopt
        const validFormAdopt = document.querySelector('.validFormAdopt');
        if(validFormAdopt){
            validFormAdopt.addEventListener('click', app.valideFormAdopt)
            console.log(validFormAdopt);
        }
    },

    valideFormHF: async function (event) {
        //event.prevenDefault();
        try {

            const userData = JSON.stringify(Array.from(document.querySelectorAll('#registrationForm input, select, textarea')).reduce((acc, select) => ({...acc, [select.id]: select.value}), {}));

            console.log('mon formulaire',userData);

            const response = await fetch(`http://localhost:4040/v1/devenir-famille-accueil`, {
                body: userData,
                method: 'POST',
                headers:{
                    'Content-Type' : 'application/json'
                } 
             });
             console.log(response);

        }
        catch(error) {
            console.trace(error);
        }
    },

    valideFormAdopt: async function (event) {
        //event.prevenDefault();
        try {

            const userData = JSON.stringify(Array.from(document.querySelectorAll('#registrationForm input, select, textarea')).reduce((acc, select) => ({...acc, [select.id]: select.value}), {}));

            console.log('mon formulaire',userData);

            const response = await fetch(`http://localhost:4040/v1/formulaire_adoption`, {
                body: userData,
                method: 'POST',
                headers:{
                    'Content-Type' : 'application/json'
                } 
             });
             console.log(response);

        }
        catch(error) {
            console.trace(error);
        }
    },

};
// on accroche un écouteur d'évènement sur le document : quand le chargement est terminé, on lance app.init
document.addEventListener('DOMContentLoaded', app.init );