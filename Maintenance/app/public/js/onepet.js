const onePet = {
    
     // Activer la modal edition
     editPet: async function (event) {
        // On empeche le rechargement du formaulaire
        event.preventDefault();
        try {
            const buttonSave = event.target;
            const article = buttonSave.closest('.modal-content');
            const articleId = article.getAttribute('data-article-id');
            const eventName = document.getElementById(`editNamePet`).value;
            const eventAge = document.getElementById(`editAgePet`).value;
            const eventSexe = document.getElementById(`editSexePet`).value;
            const eventBreed = document.getElementById(`editBreedPet`).value;
            const eventWeight = document.getElementById(`editWeight`).value;
            const eventAmity = document.getElementById(`editAmityPet`).value;
            const eventColor = document.getElementById(`editColorPet`).value;
            const eventIde = document.getElementById(`editIdePet`).value;
            const eventSterilised = document.getElementById(`editSterilisedPet`).value;
            const eventDescription = document.getElementById(`editDescriptionPet`).value;
            const eventAvatar = document.getElementById(`avatar`).value;
            
            const dataPet = JSON.stringify({ 
                eventName: eventName,
                eventAge: eventAge,
                eventSexe: eventSexe,
                eventWeight: eventWeight,
                eventBreed: eventBreed, 
                eventAmity: eventAmity, 
                eventColor: eventColor,  
                eventIde: eventIde, 
                eventSterilised: eventSterilised, 
                eventDescription: eventDescription,
                eventAvatar: eventAvatar
            });
            
            const response = await fetch(`/v1/pet/${articleId}`, {
            method: 'PATCH',
            body: dataPet,
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
            const article = supportedDate.closest('.form-support');
            const articleId = article.getAttribute('data-article-id');
            const dateSupported = document.getElementById('valideSupportedPet').value;
            const dateChangeSupported = JSON.stringify({ dateSupported: dateSupported });
            const response = await fetch(`/v1/pet/datesupported/${articleId}`, {
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
            const article = supportedDate.closest('.form-vaccine');
            const articleId = article.getAttribute('data-article-id');
            const dateVaccine = document.getElementById('ValideDateVaccine').value;
            const dateChangeVaccine = JSON.stringify({ dateVaccine: dateVaccine });
            const response = await fetch(`/v1/pet/datevaccine/${articleId}`, {
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
             
             const response = await fetch(`/v1/putHostFamilyToPet/${articleId}`, {
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

    addCommentPet: async function (event){
        event.preventDefault();
        try{
          const buttonSave = event.target;
          const article = buttonSave.closest('.comment');
          console.log('mon article',article);
          const articleId = article.getAttribute('data-article-id');
          const commentPet = document.getElementById('commentPet').value;
        
          const petComment = JSON.stringify({commentPet});
    
            const response = await fetch(`/v1/pet/comment/${articleId}`, {
            method: 'POST',
            body: petComment,
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

    delImg: async function (event){
        event.preventDefault();
        try{
          const buttonSave = event.target;
          const article = buttonSave.closest('.modal-image');
          const articleId = article.getAttribute('data-article-id');
  
            const response = await fetch(`/v1/pet/deletemypicturepet/${articleId}`, {
            method: 'DELETE',
            headers:{
                'Content-Type' : 'application/json'
            }
        });
        document.location.reload();
        }catch(error) {
            console.trace(error);
        }
    
    },

    deleteCommentPet: async function (event){
        event.preventDefault();
        try{
          const buttonSave = event.target;
          const article = buttonSave.closest('.modal-comment');
          const articleId = article.getAttribute('data-article-id');
  
            const response = await fetch(`/v1/pet/deletemycommentpet/${articleId}`, {
            method: 'DELETE',
            headers:{
                'Content-Type' : 'application/json'
            }
        });
        article.remove();
        document.location.reload();
        }catch(error) {
            console.trace(error);
        }
    
    },

};



// on accroche un écouteur d'évènement sur le document : quand le chargement est terminé, on lance app.init
document.addEventListener('DOMContentLoaded', onePet.init );
 
 
 