const hostFamily = {
    
    init: function () {
        hostFamily.addListenerToActions();
    },
    
    addListenerToActions: function () {
        
        //On cible le bouton modifier une FA
        const editFamillyHost = document.querySelectorAll('.editHostFamillyValidate');
        editFamillyHost.forEach((buttonValidateModify) => {
            buttonValidateModify.addEventListener('click', hostFamily.editHostFamilly)
        });
   
    },
    
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
        document.location.reload();
        }catch(error) {
            console.trace(error);
        }
    
    },

    editHostFamilly: async function (event){
        // On empeche le rechargement du formulaire
        event.preventDefault();
        const buttonClicked = event.target;
        const articleElement = buttonClicked.closest('.modal-content');
        const articleId = articleElement.getAttribute('data-article-id');
        try {
            const eventFirstname = document.getElementById(`editFirstname${articleId}`).value;
            const eventLastname = document.getElementById(`editLastname${articleId}`).value;
            const eventNumberPhone = document.getElementById(`editNumberPhone${articleId}`).value;
            const eventPostalCode = document.getElementById(`editPostalCode${articleId}`).value;
            const eventCity = document.getElementById(`editCity${articleId}`).value;
            const eventAdress = document.getElementById(`editAdress${articleId}`).value;
            const eventEmail = document.getElementById(`editEmail${articleId}`).value;    
            const eventComposition = document.getElementById(`editComposition${articleId}`).value;
            const eventAcceptedPet = document.getElementById(`editAcceptedPet${articleId}`).value; 
            const eventPetAsela = document.getElementById(`editPetAsela${articleId}`).value;
            const eventDisponibility = document.getElementById(`editDisponibility${articleId}`).value;

            const event = JSON.stringify({ 
                eventFirstname: eventFirstname, 
                eventLastname: eventLastname, 
                eventNumberPhone: eventNumberPhone, 
                eventPostalCode: eventPostalCode, 
                eventCity: eventCity, 
                eventAdress: eventAdress, 
                eventEmail: eventEmail, 
                eventComposition: eventComposition, 
                eventAcceptedPet: eventAcceptedPet, 
                eventPetAsela: eventPetAsela, 
                eventDisponibility: eventDisponibility
            });
            console.log(event);

            const response = await fetch(`http://localhost:3030/v1/editHostFamily/${articleId}`, {
                method: 'PATCH',
                body: event,
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
            response.json(`Impossible de modifier cette famille d'accueil`)
        }
        }catch(error){
            console.log(error);  
        }
    }
  
};

// on accroche un écouteur d'évènement sur le document : quand le chargement est terminé, on lance app.init
document.addEventListener('DOMContentLoaded', hostFamily.init );