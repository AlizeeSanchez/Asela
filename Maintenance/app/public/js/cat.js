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
        
        // On cible le bouton Save change dans la modal modifier
        const valideCat = document.querySelectorAll('.saveChangeCat');
        valideCat.forEach((buttonValidateModify) => {
            buttonValidateModify.addEventListener('click', cat.editCat)
        });
        
        //On cible le bouton de la modal validation de dépublier/publier un chat
        const publishCat = document.querySelectorAll('.publishSite');
        publishCat.forEach((buttonPublishCat) => {
            buttonPublishCat.addEventListener('click', cat.publishCat);
        });
        
        //On cible le bouton supprimer un chat
        const suppCat = document.querySelectorAll('.deleteCat');
        suppCat.forEach((buttonSuppCat) => {
            buttonSuppCat.addEventListener('click', cat.suppCat);
        });
        
        //On cible le bouton ajouter un chat
        const addNewCat = document.querySelector('.saveNewCat');
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
    

    publishCat: async function (event){
        const buttonClicked = event.target;
        const modalElement = buttonClicked.closest('.modal-content');
        const modalId = modalElement.getAttribute('data-article-id');
        
        try{
            const response = await fetch(`http://localhost:3030/v1/site/${modalId}`, {
            method: 'PATCH',
            body: modalId
        });
        document.location.reload();    
        }catch(error) {
            console.trace(error);
            }
    },

    suppCat: async function (event){        
        const buttonClicked = event.target;
        const articleElement = buttonClicked.closest('.modal-content');
        const articleId = articleElement.getAttribute('data-article-id');        
        console.log(articleId);
        try{

            const response = await fetch(`http://localhost:3030/v1/cats/${articleId}`, {
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
        const eventRace = document.getElementById('addRaceCat').value;
        const eventAmity = document.getElementById('addAmityCat').value;
        const eventColor = document.getElementById('addColorCat').value;   
        const eventIde = document.getElementById('addIdeCat').value;
        const eventSterilised = document.getElementById('sterilisedAddCat').value; 
        const eventDescription = document.getElementById('descriptionAddCat').value;
        const event = JSON.stringify({ eventName: eventName, eventAge: eventAge, eventSexe: eventSexe, eventRace: eventRace, eventAmity: eventAmity, eventColor: eventColor, eventIde: eventIde, eventSterilised: eventSterilised, eventDescription: eventDescription});
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


