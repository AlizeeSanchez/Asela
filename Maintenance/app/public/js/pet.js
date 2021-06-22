const pet = {
    
    publishPet: async function (event){
        
        const buttonClicked = event.target;
        const modalElement = buttonClicked.closest('#modalPublish');
        const modalId = modalElement.getAttribute('data-article-id');
        try{
            console.log(modalId);
            const response = await fetch(`http://localhost:3030/v1/publish/${modalId}`, {
                method: 'PATCH',
                body: modalId
            });
            document.location.reload();
            console.log(response);
            
        }catch(error) {
            console.trace(error);
        }

    },

    bookPet: async function (event){
        const buttonClicked = event.target;
        const modalElement = buttonClicked.closest('#modalBook');
        const modalId = modalElement.getAttribute('data-article-id');
        const eventName = document.getElementById('bookName').value;
        const book = JSON.stringify({ name: eventName, id: modalId});
        try{
            console.log(modalId);
            const response = await fetch(`http://localhost:3030/v1/booked/${modalId}`, {
                method: 'PATCH',
                body: book,
                headers:{
                    'Content-Type' : 'application/json'
                }
            });
            document.location.reload();            
        }catch(error) {
            console.trace(error);
        }
    },

    addNewDog: async function (event){
        //event.preventDefault();
        try{
        const eventName = document.getElementById('addNameDog').value;
        const eventAge = document.getElementById('addAgeDog').value;
        const eventSexe = document.getElementById('addSexeDog').value;
        const eventRace = document.getElementById('addRaceDog').value;
        const eventAmity = document.getElementById('addAmityDog').value;
        const eventColor = document.getElementById('addColorDog').value;
        const eventWeight = document.getElementById('addWeightDog').value;    
        const eventIde = document.getElementById('addIdeDog').value;
        const eventSterilised = document.getElementById('sterilisedAddDog').value; 
        const eventDescription = document.getElementById('descriptionAddDog').value;
        const event = JSON.stringify({ eventName: eventName, eventAge: eventAge, eventSexe: eventSexe, eventRace: eventRace, eventAmity: eventAmity, eventColor: eventColor, eventWeight: eventWeight, eventIde: eventIde, eventSterilised: eventSterilised, eventDescription: eventDescription});
        
        const response = await fetch(`http://localhost:3030/v1/dogs`, {
            method: 'POST',
            body: event,
            headers:{
				'Content-Type' : 'application/json'
			}
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
        const eventRace = document.getElementById('addRaceCat').value;
        const eventAmity = document.getElementById('addAmityCat').value;
        const eventColor = document.getElementById('addColorCat').value;   
        const eventIde = document.getElementById('addIdeCat').value;
        const eventSterilised = document.getElementById('sterilisedAddCat').value; 
        const eventDescription = document.getElementById('descriptionAddCat').value;
        const event = JSON.stringify({ eventName: eventName, eventAge: eventAge, eventSexe: eventSexe, eventRace: eventRace, eventAmity: eventAmity, eventColor: eventColor, eventIde: eventIde, eventSterilised: eventSterilised, eventDescription: eventDescription});
        
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

    },

    deletePet: async function (event){
        // event.preventDefault();
         const buttonClicked = event.target;
         console.log('mon bouton', buttonClicked);
         const petElement = buttonClicked.closest('.modal-content');
         console.log('mon element', petElement);
         const petId = petElement.getAttribute('data-article-id');
         console.log('id pet', petId);
         try{
             const response = await fetch(`http://localhost:3030/v1/pet/${petId}`, {
                 method: 'DELETE',
 
              });
         console.log(response);   
         //document.location.reload();
         }catch(error) {
         console.trace(error);
         }      
     },
};

 // on accroche un écouteur d'évènement sur le document : quand le chargement est terminé, on lance app.init
 document.addEventListener('DOMContentLoaded', pet.init );
