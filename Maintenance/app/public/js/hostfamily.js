const hostFamily = {

    addHostFamily: async function (event){
        event.preventDefault();
        try{
        const eventFirstname = document.getElementById('addFirstname').value;
        const eventLastname = document.getElementById('addLastname').value;
        const eventNumberPhone = document.getElementById('addNumberPhone').value;
        const eventPostalCode = document.getElementById('addPostalCode').value;
        const eventCity = document.getElementById('addCity').value;
        const eventAdress = document.getElementById('addAdress').value;
        const eventEmail = document.getElementById('addEmail').value;    
        const eventComposition = document.getElementById('addComposition').value;
        const eventAcceptedPet = document.getElementById('addAcceptedPet').value; 
        const eventPetAsela = document.getElementById('AddPetAsela').value;
        const eventDisponibility = document.getElementById('addDisponibility').value;
        const event = JSON.stringify({ eventFirstname: eventFirstname, eventLastname: eventLastname, eventNumberPhone: eventNumberPhone, eventPostalCode: eventPostalCode, eventCity: eventCity, eventAdress: eventAdress, eventEmail: eventEmail, eventComposition: eventComposition, eventAcceptedPet: eventAcceptedPet, eventPetAsela: eventPetAsela, eventDisponibility: eventDisponibility});
        
        const response = await fetch(`http://localhost:3030/v1/addHostFamily`, {
            method: 'POST',
            body: event,
            headers:{
                'Content-Type' : 'application/json'
            }
        });
        console.log(event);
        
        document.location.reload();
        }catch(error) {
            console.trace(error);
        }
    
    }
}