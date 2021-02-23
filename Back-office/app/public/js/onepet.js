const onePet = {
    init: function () {
		onePet.addListenerToActions();
    },

	addListenerToActions: function () {

    //On cible le bouton valider la date de prise en charge dans la page profil animal
    const checkDateSupported = document.querySelector('.checkDateSupported');
    checkDateSupported.addEventListener('click', onePet.checkDateSupported); 

    //On cible le bouton valider la date de prise en charge dans la page profil animal
    const checkDateVaccine = document.querySelector('.checkDateVaccine');
    checkDateVaccine.addEventListener('click', onePet.checkDateVaccine); 

    // On cible le bouton valider une image d'un animal
    const checkUplaodPet = document.querySelector('.addPicturePets');
    checkUplaodPet.addEventListener('click', onePet.uploadPicturePet);

    //On cible le bouton Valider les modification d'une famille d'acceuil
    const validateHostFamily = document.querySelector('.saveHostFamily');
    validateHostFamily.addEventListener('click', onePet.validateIdHostFamily )

    },

     editPet: async function (event) {

        // On empeche le rechargement du formulaire
        event.preventDefault();
        try {
             const buttonSave = event.target;
             const article = buttonSave.closest('.modal-content');
             const articleId = article.getAttribute('data-article-id');
             const eventName = document.getElementById('editNamePet').value;
             const eventAge = document.getElementById('editAgePet').value;
             const eventSexe = document.getElementById('editSexePet').value;
             const eventBreed = document.getElementById('editBreedPet').value;
             const eventAmity = document.getElementById('editAmityPet').value;
             const eventColor = document.getElementById('editColorPet').value;
             const eventWeight = document.getElementById('editWeightDog').value;
             const eventIde = document.getElementById('editIdePet').value;
             const eventSterilised = document.getElementById('editSterilisedPet').value;
             const eventDescription = document.getElementById('editDescriptionPet').value;
 
             const eventDog = JSON.stringify({ 
                 eventName: eventName,
                 eventAge: eventAge,
                 eventSexe: eventSexe,
                 eventBreed: eventBreed, 
                 eventAmity: eventAmity, 
                 eventColor: eventColor, 
                 eventWeight: eventWeight, 
                 eventIde: eventIde, 
                 eventSterilised: eventSterilised, 
                 eventDescription: eventDescription
             });
 
             const response = await fetch(`http://localhost:3030/v1/pet/${articleId}`, {
                 method: 'PATCH',
                 body: eventDog,
                 headers: {
                     'Content-type': 'application/json'
                 }
             });
             
         if (response.status === 200) {
             article.remove();
             document.location.reload();
         } 
         else {
             response.json('Impossible de modifier cet animal de la page')
         }
         }catch(error){
            console.log(error);
            
         }
     },

    checkDateSupported: async function (event) {   
        event.preventDefault();
        try{
            const supportedDate = event.target;
            const article = supportedDate.closest('.information-pet');
            console.log(article);
            
            const articleId = article.getAttribute('data-article-id');
            const dateSupported = document.getElementById('valideSupportedPet').value;
            const dateChangeSupported = JSON.stringify({ dateSupported: dateSupported });
            console.log(dateChangeSupported);

            const response = await fetch(`http://localhost:3030/v1/pet/datesupported/${articleId}`, {
            method: 'PATCH',
            body: dateChangeSupported,
            headers:{
                'Content-Type' : 'application/json'
            } 
        });
        console.log(response);

        document.location.reload();

        }catch(error) {
            console.trace(error);
        }
    },

    checkDateVaccine: async function (event) {   
        event.preventDefault();
        try{
            const supportedDate = event.target;
            const article = supportedDate.closest('.information-pet-vaccin');
            const articleId = article.getAttribute('data-article-id');
            const dateVaccine = document.getElementById('ValideDateVaccine').value;
            const dateChangeVaccine = JSON.stringify({ dateVaccine: dateVaccine });
            const response = await fetch(`http://localhost:3030/v1/pet/datevaccine/${articleId}`, {
                 method: 'PATCH',
                 body: dateChangeVaccine,
                 headers:{
                     'Content-Type' : 'application/json'
                 } 
            });
            document.location.reload();
        }catch(error) {
            console.trace(error);
        }
    },

    uploadPicturePet: async function (event) {
        event.preventDefault();
        const buttonUpload = event.target;
        const article = buttonUpload.closest('.modal-content');
        const petId = article.getAttribute('data-article-id');
        const eventPicture = document.getElementById('addPicturePet').value;
        try{
            const event = JSON.stringify({ eventPicture: eventPicture });
            const response = await fetch(`http://localhost:3030/v1/upload/${petId}`, {
                method: 'POST',
                body: event,
                headers:{
                    'Content-Type' : 'application/json'
                }
            });
            
        }catch(error) {
            console.trace(error);
        }
    },

    validateIdHostFamily: async function (event) {
        event.preventDefault();
        try {
             const buttonSave = event.target;
             const article = buttonSave.closest('.modal-content');
             const articleId = article.getAttribute('data-article-id');
             const hostFamilyId = document.getElementById('SelectHostFamily').value;

             const dataHostFamily = JSON.stringify({
                petId: articleId,
                hostFamilyId: hostFamilyId
             })
             
             const response = await fetch(`http://localhost:3030/v1/putHostFamilyToPet/${articleId}`, {
                 method: 'PATCH',
                 body: dataHostFamily,
                 headers: {
                     'Content-type': 'application/json'
                 }
             });
             
         if (response.status === 200) {
             article.remove();
             document.location.reload();
         } 
         else {
             response.json('Impossible de modifier cet animal de la page')
         }
         }catch(error){
            console.log(error);
            
         }
    } 
};

// on accroche un écouteur d'évènement sur le document : quand le chargement est terminé, on lance app.init
document.addEventListener('DOMContentLoaded', onePet.init );
 
 
 