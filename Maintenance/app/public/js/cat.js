const cat = {
    init: function () {
		cat.addListenerToActions();
    },

	addListenerToActions: function () {
   //On cible le bouton Voir un chat
   const seeCat = document.querySelectorAll('.catSee');
   seeCat.forEach((buttonSeeCat) => {
       buttonSeeCat.addEventListener('click', cat.seeOnePet)  
   });

   //On cible le bouton modifier un chat
   const editCat = document.querySelectorAll('.cat');
   editCat.forEach((buttonEditCat) => {
   buttonEditCat.addEventListener('click', cat)  
  });
  
  
  // On cible le bouton Save change dans la modal modifier
  const valideCat = document.querySelector('.saveChange');
  valideCat.addEventListener('click', cat.editCat)
  

   ///On cible le bouton dépublier/publier un chat
  const publishCat = document.querySelectorAll('.publishSiteCat');
  publishCat.forEach((buttonPublishCat) => {
      buttonPublishCat.addEventListener('click', cat.publishCat);
  });
  
  //On cible le bouton supprimer un chat
  const suppCat = document.querySelectorAll('.btn-light');
  suppCat.forEach((buttonSuppCat) => {
      buttonSuppCat.addEventListener('click', cat.suppCat);
  });

  //On cible le bouton ajouter un chat
  const addNewCat = document.querySelector('.btn-secondary');
  addNewCat.addEventListener('click', cat.addNewCat);

},

    seeOnePet: async function (event) {
         event.preventDefault();
         try {
             const buttonClicked = event.target;
             const articleElement = buttonClicked.closest('.article');
             const articleId = articleElement.getAttribute('data-article-id');
             
             const response = await fetch(`http://localhost:3030/v1/pet/${articleId}`, {
                method: 'GET',
             });
             console.log(response);
       
         }catch(error) {
             console.trace(error);
         }
     },
 
     // Activer la modal edition
     editCat: async function (event) {
        // On empeche le rechargement du formaulaire
        event.preventDefault();
        try {
             const buttonSave = event.target;
             const article = buttonSave.closest('.modal-content');
             const articleId = article.getAttribute('data-article-id');
             
             const eventDate_supported = document.getElementById('editDate_supportedCat').value;
             const eventName = document.getElementById('editNameCat').value;
             const eventAge = document.getElementById('editAgeCat').value;
             const eventSexe = document.getElementById('editSexeCat').value;
             const eventBreed = document.getElementById('editBreedCat').value;
             const eventAmity = document.getElementById('editAmityCat').value;
             const eventColor = document.getElementById('editColorCat').value;
             const eventIde = document.getElementById('editIdeCat').value;
             const eventSterilised = document.getElementById('editSterilisedCat').value;
             const eventDate_vaccine = document.getElementById('editDate_vaccineCat').value;
             const eventDescription = document.getElementById('editDescriptionCat').value;
 
             const eventCat = JSON.stringify({ 
                 eventDate_supported: eventDate_supported,
                 eventName: eventName,
                 eventAge: eventAge,
                 eventSexe: eventSexe,
                 eventBreed: eventBreed, 
                 eventAmity: eventAmity, 
                 eventColor: eventColor,  
                 eventIde: eventIde, 
                 eventSterilised: eventSterilised, 
                 eventDate_vaccine: eventDate_vaccine, 
                 eventDescription: eventDescription
             });
 
             const response = await fetch(`http://localhost:3030/v1/pet/${articleId}`, {
                 method: 'PATCH',
                 body: eventCat,
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
 
     publishCat: async function (event){
         const buttonClicked = event.target;
         const articleElement = buttonClicked.closest('.article');
         const articleId = articleElement.getAttribute('data-article-id');
         try{
             const response = await fetch(`http://localhost:3030/v1/site/${articleId}`, {
                 method: 'PATCH',
                 body: articleId
             });
             document.location.reload();    
         }catch(error) {
             console.trace(error);
         }
 
     },
 
     suppCat: async function (event){
        try{
        const buttonClicked = event.target;
        const articleElement = buttonClicked.closest('.article');
        const articleId = articleElement.getAttribute('data-article-id');
        
        const response = await fetch(`http://localhost:3030/v1/dogs/${articleId}`, {
                 method: 'DELETE'
             });
             document.location.reload();
         }catch(error) {
             console.trace(error);
         }
 
     },
 
     addNewCat: async function (event){
         event.preventDefault();
         try{
         const eventName = document.getElementById('addNameCat').value;
         const eventAge = document.getElementById('addAgeCat').value;
         const eventSexe = document.getElementById('addSexeCat').value;
         const eventRace = document.getElementById('addBreedCat').value;
         const eventAmity = document.getElementById('addAmityCat').value;
         const eventColor = document.getElementById('addColorCat').value;   
         const eventIde = document.getElementById('addIdeCat').value;
         const eventSterilised = document.getElementById('sterilisedAddCat').value; 
         const eventVaccineDate = document.getElementById('vaccineDateAddCat').value;
         const eventDescription = document.getElementById('descriptionAddCat').value;
         const event = JSON.stringify({ eventName: eventName, eventAge: eventAge, eventSexe: eventSexe, eventRace: eventRace, eventAmity: eventAmity, eventColor: eventColor, eventIde: eventIde, eventSterilised: eventSterilised, eventVaccineDate: eventVaccineDate, eventDescription: eventDescription});
         console.log(event);
         
         const response = await fetch(`http://localhost:3030/v1/cats`, {
             method: 'POST',
             body: event,
             headers:{
                 'Content-Type' : 'application/json'
             } 
         });
         console.log(response);
         
         document.location.reload();
         }catch(error) {
             console.trace(error);
         }
 
     }
    
 };

 // on accroche un écouteur d'évènement sur le document : quand le chargement est terminé, on lance app.init
document.addEventListener('DOMContentLoaded', cat.init );
  
 
 