const dog = {
   seeOnePet: async function (event) {
        event.preventDefault();
        try {
            const buttonClicked = event.target;
            const articleElement = buttonClicked.closest('.article');
            const articleId = articleElement.getAttribute('data-article-id');
            
            const response = await fetch(`http://localhost:3030/v1/pet/${articleId}`, {
               method: 'GET',
            });
      
        }catch(error) {
            console.trace(error);
        }
    },

    // Activer la modal edition
    editDog: async function (event) {
       // On empeche le rechargement du formaulaire
       event.preventDefault();
       try {
            const buttonSave = event.target;
            const article = buttonSave.closest('.modal-content');
            const articleId = article.getAttribute('data-article-id');

            const eventDate_supported = document.getElementById('editDate_supportedDog').value;
            const eventName = document.getElementById('editNameDog').value;
            const eventAge = document.getElementById('editAgeDog').value;
            const eventSexe = document.getElementById('editSexeDog').value;
            const eventBreed = document.getElementById('editBreedDog').value;
            const eventAmity = document.getElementById('editAmityDog').value;
            const eventColor = document.getElementById('editColorDog').value;
            const eventWeight = document.getElementById('editWeightDog').value;
            const eventIde = document.getElementById('editIdeDog').value;
            const eventSterilised = document.getElementById('editSterilisedDog').value;
            const eventDate_vaccine = document.getElementById('editDate_vaccineDog').value;
            const eventDescription = document.getElementById('editDescriptionDog').value;

            const eventDog = JSON.stringify({ 
                eventDate_supported: eventDate_supported,
                eventName: eventName,
                eventAge: eventAge,
                eventSexe: eventSexe,
                eventBreed: eventBreed, 
                eventAmity: eventAmity, 
                eventColor: eventColor, 
                eventWeight: eventWeight, 
                eventIde: eventIde, 
                eventSterilised: eventSterilised, 
                eventDate_vaccine: eventDate_vaccine, 
                eventDescription: eventDescription
            });

            const response = await fetch(`http://localhost:3030/v1/pet/${articleId}`, {
                method: 'PATCH',
                body: eventDog,
                headers: {
                    'Content-type': 'application/json'
                }
            });
            console.log(response);
            
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

    publishDog: async function (event){
        const buttonClicked = event.target;
        const articleElement = buttonClicked.closest('.article');
        const articleId = articleElement.getAttribute('data-article-id');
        try{
            console.log(articleId);
            const response = await fetch(`http://localhost:3030/v1/site/${articleId}`, {
                method: 'PATCH',
                body: articleId
            });
            document.location.reload();
            console.log(response);
            
        }catch(error) {
            console.trace(error);
        }

    },

    suppDog: async function (event){
        try{
        const buttonClicked = event.target;
        const articleElement = buttonClicked.closest('.article');
        const articleId = articleElement.getAttribute('data-article-id');
        
            console.log(articleId);
            const response = await fetch(`http://localhost:3030/v1/dogs/${articleId}`, {
                method: 'DELETE'
            });

            console.log(response);
            document.location.reload();
        }catch(error) {
            console.trace(error);
        }

    },

    addNewDog: async function (event){
        event.preventDefault();
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
        const eventVaccineDate = document.getElementById('vaccineDateAddDog').value;
        const eventDescription = document.getElementById('descriptionAddDog').value;
        const event = JSON.stringify({ eventName: eventName, eventAge: eventAge, eventSexe: eventSexe, eventRace: eventRace, eventAmity: eventAmity, eventColor: eventColor, eventWeight: eventWeight, eventIde: eventIde, eventSterilised: eventSterilised, eventVaccineDate: eventVaccineDate, eventDescription: eventDescription});
        
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
    }
}


