const hostfamily = {
    
    addHostFamily: async function (event){
        event.preventDefault();
        try{
            const firstname = document.getElementById('addFirstname').value;
            const lastname = document.getElementById('addLastname').value;
            const numberPhone = document.getElementById('addNumberPhone').value;
            const postalCode = document.getElementById('addPostalCode').value;
            const city = document.getElementById('addCity').value;
            const adress = document.getElementById('addAdress').value;
            const email = document.getElementById('addEmail').value;    
            const composition = document.getElementById('addComposition').value;
            const acceptedPet = document.getElementById('addAcceptedPet').value; 
            const petAsela = document.getElementById('AddPetAsela').value;
            
            const hostfamily = JSON.stringify({ firstname, lastname, numberPhone, postalCode, city, adress, email, composition, acceptedPet, petAsela});
        
            const response = await fetch(`/v1/addHostFamily`, {
                method: 'POST',
                body: hostfamily,
                headers:{
                    'Content-Type' : 'application/json'
                }
            });
        //document.location.reload();
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
    console.log(articleId);
    try {
        const numberPhone = document.getElementById(`inputNP${articleId}`).value;
        const postalCode = document.getElementById(`inputPC${articleId}`).value;
        const city = document.getElementById(`inputCity${articleId}`).value;
        const adress = document.getElementById(`inputAddress${articleId}`).value;
        const facebook = document.getElementById(`inputPseudoFB${articleId}`).value; 
        const disponibility = document.getElementById(`inputdisponibility${articleId}`).value;
        const people_date_accueil = document.getElementById(`people_date_accueil${articleId}`).value;
        const newFA = document.getElementById(`new${articleId}`).value;
        const nolongercontact = document.getElementById(`nolongercontact${articleId}`).value;
        const pet_asela = document.getElementById(`pet_asela${articleId}`).value;
        const comment = document.getElementById(`comment${articleId}`).value;
        
        const data = JSON.stringify({ 
            id: articleId,
            number_phone: numberPhone, 
            postal_code: postalCode, 
            city: city, 
            people_date_accueil: people_date_accueil,
            adress: adress,
            facebook: facebook,
            disponibility: disponibility,
            new: newFA,
            nolongercontact: nolongercontact,
            pet_asela: pet_asela, 
            comment: comment
        });
        
        const response = await fetch(`/v1/editHostFamily/${articleId}`, {
        method: 'PATCH',
        body: data,
        headers: {
            'Content-type': 'application/json'
        }
        });
    
        if (response.status === 200) {
            articleElement.remove();
            document.location.reload();
        } 
        else {
            response.json(`Impossible de modifier cette famille d'accueil`)
        }
    }catch(error){
        console.log(error);  
    }
},

addCommentHostfamilly: async function (event){
    event.preventDefault();
    try{
        const buttonSave = event.target;
        const article = buttonSave.closest('.commentForm');
        const articleId = article.getAttribute('data-article-id');
        const commentHostfamilly = document.getElementById(`commentaire_text${articleId}`).value;
        console.log('mon commentaire a envoye: ',commentHostfamilly);
        
        const hostfamillyComment = JSON.stringify({commentHostfamilly});
        const response = await fetch(`/v1/addCommentHostfamily/${articleId}`, {
        method: 'PATCH',
        body: hostfamillyComment,
        headers:{
            'Content-Type' : 'application/json'
        }
        });
        document.location.reload();
    }catch(error) {
    console.trace(error);
    }

},

blacklistHostFamilly: async function (event){
    event.preventDefault();
    const buttonClicked = event.target;
    const articleElement = buttonClicked.closest('.modal-content');
    const articleId = articleElement.getAttribute('data-article-id');
    try{
        
        const response = await fetch(`/v1/blacklistHostFamilly/${articleId}`, {
        method: 'POST',
        headers:{
            'Content-Type' : 'application/json'
        }
        });
        document.location.reload();
    }catch(error) {
    console.trace(error);
    }

},

};

// on accroche un écouteur d'évènement sur le document : quand le chargement est terminé, on lance app.init
document.addEventListener('DOMContentLoaded', hostfamily.init );