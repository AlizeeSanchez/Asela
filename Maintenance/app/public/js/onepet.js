const onePet = {
    
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
        try{
            event.preventDefault();
            const buttonClicked = event.target;
            const imageElement = buttonClicked.closest('.modal-content');
            const petId = imageElement.getAttribute('data-article-id');
        
            const formData = new FormData();
            const petPicture = document.querySelector('input[type="file"]');
            formData.append("title", petPicture);
            console.log('mon formData', formData);
            console.log('mes images', petPicture);
            const uploadImage = await fetch(`http://localhost:3030/v1/uploadpet/${petId}`, {
                method: 'POST',
                body: formData,
                
            })
            console.log('uploadImage', uploadImage);
            
            // window.location.href = `http://localhost:3030/v1/pet/${petId}`;
           
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
    },

    validateCommentPet: async function (event) {
        event.preventDefault();
        try {
             const buttonSave = event.target;
             const article = buttonSave.closest('.card-body');
             console.log('mon article', article);
             
             const articleId = article.getAttribute('data-article-id');
             console.log('id article', articleId);
             
             const commentPet = document.getElementById('message-text').value;
             console.log('mon commentaire pet', commentPet);

             const date_comment = document.getElementById('')
            
             const dataCommentPet = JSON.stringify({
                petId: articleId,
                commentPet: commentPet
             })
             
             const response = await fetch(`http://localhost:3030/v1/pet/comment/${articleId}`, {
                 method: 'POST',
                 body: dataCommentPet,
                 headers: {
                     'Content-type': 'application/json'
                 }
             });
             
         if (response.status === 200) {
             //article.add();
             document.location.reload();
             response.json({ dataCommentPet })
         } 
         else {
             response.json("Impossible d\'envoyer le commentaire")
         }
         }catch(error){
            console.log(error);
            
         }
    },


};

// on accroche un écouteur d'évènement sur le document : quand le chargement est terminé, on lance app.init
document.addEventListener('DOMContentLoaded', onePet.init );
 
 
 