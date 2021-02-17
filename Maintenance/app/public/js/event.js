const event= {
    addEvent: async function (event) {
        event.preventDefault();
        try{
        const eventTitle = document.getElementById('addTitle').value;
        const eventLocation = document.getElementById('addLocation').value;
        const eventDate_event = document.getElementById('addDate_event').value;
        const eventContent = document.getElementById('addContent').value;
        const eventPicture = document.getElementById('addPicture').value;
        
        const event = JSON.stringify({ eventTitle: eventTitle, eventLocation: eventLocation, eventDate_event: eventDate_event, eventContent: eventContent, eventPicture: eventPicture,});
        
        const response = await fetch(`http://localhost:3030/v1/events`, {
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
    
    }
    
}

