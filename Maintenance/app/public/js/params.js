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
            console.log(response);     
        }catch(error) {
            console.trace(error);
        }

    },
    
    
};

 // on accroche un écouteur d'évènement sur le document : quand le chargement est terminé, on lance app.init
 document.addEventListener('DOMContentLoaded', params.init );
