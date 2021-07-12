const events= {

    init: function () {
        events.addListenerToActions();
    },

    addListenerToActions: function () {

        event.preventDefault();
        //On cible le bouton ajouter soumettre une photo
        //const addPicture = document.querySelector('.ValidePicture');
        //addPicture.addEventListener('click', events.addPicturePet);

        //On cible le bouton ajouter un évènement
        const addEvent = document.querySelector('.ValideNewEvent');
        addEvent.addEventListener('click', events.addEvent);        
    },
    
    addEvent: async function (event) {

        event.preventDefault();
        try{
        const eventTitle = document.getElementById('addTitle').value;
        const eventLocation = document.getElementById('addLocation').value;
        const eventDate_event = document.getElementById('addDate_event').value;
        const eventContent = document.getElementById('addContent').value;
        const eventPicture = document.getElementById('addPicture').value;
        
        const event = JSON.stringify({ 
            eventTitle: eventTitle, 
            eventLocation: eventLocation, 
            eventDate_event: eventDate_event, 
            eventContent: eventContent, 
            eventPicture: eventPicture
        });

        console.log(event);
        
        
        const response = await fetch(`/v1/events`, {
            method: 'POST',
            body: event,
            headers:{
                'Content-Type' : 'application/json'
            }
        });

        console.log(event);
        
        //document.location.reload();
        }catch(error) {
            console.trace(error);
        }
    
    },

    addPicturePet: async function (event) {
        console.log(event);

        event.preventDefault();
        try{
        const response = await fetch(`/v1/upload`, {
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json'
            }
        });
        }catch(error) {
            console.trace(error);
        }
    }
    
};

 // on accroche un écouteur d'évènement sur le document : quand le chargement est terminé, on lance app.init
 document.addEventListener('DOMContentLoaded', events.init );
