const params = {

    editPriceDog: async function (event){

        const buttonSave = event.target;
        const article = buttonSave.closest('.modal-content');
        const articleId = article.getAttribute('data-article-id');
        const dog_female = document.getElementById('dog_female').value;
        const dog_male = document.getElementById('dog_male').value;
        const puppy = document.getElementById('puppy').value;
        const caution_puppy = document.getElementById('caution_puppy').value;

        const data = JSON.stringify({
            id: articleId,
            dog_female: dog_female,
            dog_male: dog_male,
            puppy: puppy,
            caution_puppy: caution_puppy, 
        });
        try{
            const response = await fetch(`http://localhost:3030/v1/tarif-chien/`, {
                method: 'PATCH',
                body: data,
                headers:{
                    'Content-Type' : 'application/json'
                }
            });
            document.location.reload();     
        }catch(error) {
            console.trace(error);
        }

    },

    editPriceCat: async function (event){

        const buttonSave = event.target;
        const article = buttonSave.closest('.modal-content');
        const articleId = article.getAttribute('data-article-id');
        const cat_female = document.getElementById('cat_female').value;
        const cat_male = document.getElementById('cat_male').value;
        const kitten = document.getElementById('kitten').value;
        const caution_kitten = document.getElementById('caution_kitten').value;

        const data = JSON.stringify({
            id: articleId,
            cat_female: cat_female,
            cat_male: cat_male,
            kitten: kitten,
            caution_kitten: caution_kitten, 
        });
        try{
            const response = await fetch(`http://localhost:3030/v1/tarif-chat/`, {
                method: 'PATCH',
                body: data,
                headers:{
                    'Content-Type' : 'application/json'
                }
            });
            document.location.reload();    
        }catch(error) {
            console.trace(error);
        }

    },

    editPriceBreedPet: async function (event){
        const buttonSave = event.target;
        const article = buttonSave.closest('.modal-content');
        const articleId = article.getAttribute('data-article-id');
        const extra = document.getElementById('extra').value;
        const extra_charge = document.getElementById('breedPet').value;

        const data = JSON.stringify({
            id: articleId,
            extra: extra,
            extra_charge: extra_charge, 
        });
        
        try{
            const response = await fetch(`http://localhost:3030/v1/breed-pet`, {
                method: 'PATCH',
                body: data,
                headers:{
                    'Content-Type' : 'application/json'
                }
            });
            document.location.reload();    
        }catch(error) {
            console.trace(error);
        }
    },

    addNewCondition: async function (event){
        event.preventDefault();
        try{
            const description = document.getElementById('newTermAdopt').value;
            const data = JSON.stringify({ description });
            
            const response = await fetch(`http://localhost:3030/v1/condition`, {
            method: 'POST',
            body: data, 
            headers:{
                'Content-Type' : 'application/json'
            } 
            });
            document.location.reload();
        }catch(error) {
        console.trace(error);
        }
    },

    editCondition: async function (event){
        const buttonSave = event.target;
        const article = buttonSave.closest('.modal-content');
        const articleId = article.getAttribute('data-article-id');
        const description = document.getElementById(`cautionModal${articleId}`).value;
    
        const data = JSON.stringify({
            id: articleId,
            description: description,
        });
        
        try{
            const response = await fetch(`http://localhost:3030/v1/condition`, {
                method: 'PATCH',
                body: data,
                headers:{
                    'Content-Type' : 'application/json'
                }
            });
            document.location.reload();     
        }catch(error) {
            console.trace(error);
        }
    },

    suppCondition: async function (event){
        const buttonSave = event.target;
        const article = buttonSave.closest('.modal-content');
        const articleId = article.getAttribute('data-article-id');
    
        try{
            const response = await fetch(`http://localhost:3030/v1/condition/${articleId}`, {
                method: 'DELETE', 
            });
            document.location.reload();
        }catch(error) {
            console.trace(error);
        }
    }  
};

 // on accroche un écouteur d'évènement sur le document : quand le chargement est terminé, on lance app.init
 document.addEventListener('DOMContentLoaded', params.init );
