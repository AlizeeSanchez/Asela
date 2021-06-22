const veterinary = {
    
    addNewVet: async function (event){
        event.preventDefault();
        try{

            const userData = JSON.stringify(Array.from(document.querySelectorAll('#registrationForm input')).reduce((acc, select) => ({...acc, [select.id]: select.value}), {}));
            const response = await fetch(`http://localhost:3030/v1/veterinary`, {
                body: userData,
                method: 'POST',
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

    editVeterinary: async function (event){
        event.preventDefault();
        try{
            const buttonSave = event.target;
            const article = buttonSave.closest('.modal-content');
            const articleId = article.getAttribute('data-article-id');
            const name = document.getElementById(`name${articleId}`).value;
            const number_phone = document.getElementById(`number_phone${articleId}`).value;
            const postal_code = document.getElementById(`postal_code${articleId}`).value;
            const city = document.getElementById(`city${articleId}`).value;
            const adress = document.getElementById(`adress${articleId}`).value;
            const email = document.getElementById(`email${articleId}`).value;
            const dog_castration = document.getElementById(`dog_castration${articleId}`).value;
            const dog_ovario_10 = document.getElementById(`dog_ovario_10${articleId}`).value;
            const dog_ovario_10_25 = document.getElementById(`dog_ovario_10_25${articleId}`).value;
            const dog_ovario_25_40 = document.getElementById(`dog_ovario_25_40${articleId}`).value;
            const dog_ovario_40 = document.getElementById(`dog_ovario_40${articleId}`).value;
            const dog_vaccine = document.getElementById(`dog_vaccine${articleId}`).value;
            const dog_ide = document.getElementById(`dog_ide${articleId}`).value;
            const cat_castration = document.getElementById(`cat_castration${articleId}`).value;
            const cat_castration_tatouage = document.getElementById(`cat_castration_tatouage${articleId}`).value;
            const cat_ovario = document.getElementById(`cat_ovario${articleId}`).value;
            const cat_ovario_tatouage = document.getElementById(`cat_ovario_tatouage${articleId}`).value;
            const cat_vaccine = document.getElementById(`cat_vaccine${articleId}`).value;
            const cat_ide = document.getElementById(`cat_ide${articleId}`).value;

            const userData = JSON.stringify({ 
                id: articleId,
                name: name,
                number_phone: number_phone,
                postal_code: postal_code,
                city: city,
                adress: adress, 
                email: email, 
                dog_castration: dog_castration,  
                dog_ovario_10: dog_ovario_10, 
                dog_ovario_10_25: dog_ovario_10_25, 
                dog_ovario_25_40: dog_ovario_25_40,
                dog_ovario_40: dog_ovario_40,
                dog_vaccine: dog_vaccine,
                dog_ide: dog_ide,
                cat_castration: cat_castration,
                cat_castration_tatouage: cat_castration_tatouage,
                cat_ovario: cat_ovario,
                cat_ovario: cat_ovario,
                cat_ovario_tatouage: cat_ovario_tatouage,
                cat_vaccine: cat_vaccine,
                cat_ide:cat_ide,
            });

           const response = await fetch(`http://localhost:3030/v1/veterinary`, {
               body: userData,
               method: 'PATCH',
               headers:{
                   'Content-Type' : 'application/json'
               } 
            });
            
        document.location.reload();
        }catch(error) {
        console.trace(error);
        }   
    
    },

    deleteVeterinary: async function (event){
        const buttonClicked = event.target;
        const articleElement = buttonClicked.closest('.modal-content');
        const articleId = articleElement.getAttribute('data-article-id');
        console.log(articleId);
        try{
            const response = await fetch(`http://localhost:3030/v1/veterinary/${articleId}`, {
                method: 'DELETE',

             });
             console.log(response);
        document.location.reload();
        }catch(error) {
        console.trace(error);
        }      
    },


};
// on accroche un écouteur d'évènement sur le document : quand le chargement est terminé, on lance app.init
document.addEventListener('DOMContentLoaded', veterinary.init );