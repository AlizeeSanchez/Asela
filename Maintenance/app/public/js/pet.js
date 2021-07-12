const pet = {
    
    publishPet: async function (event){
        
        try{
            const buttonClicked = event.target;
            const modalElement = buttonClicked.closest('#modalPublish');
            const modalId = modalElement.getAttribute('data-article-id');    
            const response = await fetch(`/v1/publish/${modalId}`, {
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
        const name = document.getElementById(`bookName${modalId}`).value;
        
        console.log('mon name', name, 'mon id', modalId);
        const book = JSON.stringify({ name: name, id: modalId});
        try{
            
            const response = await fetch(`/v1/booked/${modalId}`, {
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
        
        const response = await fetch(`/v1/dogs`, {
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
        
        const response = await fetch(`/v1/cats`, {
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
        const petElement = buttonClicked.closest('.modal-content');
        const petId = petElement.getAttribute('data-article-id');
        
        try{
            const response = await fetch(`/v1/pet/${petId}`, {
                method: 'DELETE',
            });
            console.log(response);
            document.location = "/v1/dogs";   
        }catch(error) {
            console.trace(error);
        }      
    },
};

 // on accroche un écouteur d'évènement sur le document : quand le chargement est terminé, on lance app.init
 document.addEventListener('DOMContentLoaded', pet.init );
