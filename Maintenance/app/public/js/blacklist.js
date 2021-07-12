const blacklist = {
    
    addBlacklist: async function (event){
        event.preventDefault();
        try{
            const number_id_passport = document.getElementById('addNumberIdPassportBlacklist').value;
            const lastname = document.getElementById('addLastnameBlacklist').value;
            const firstname = document.getElementById('addFirstnameBlacklist').value;
            const postal_code = document.getElementById('addPostalCodeBlacklist').value;
            const number_phone = document.getElementById('addNumberPhoneBlacklist').value;
            const city = document.getElementById('addCityBlacklist').value;
            const email = document.getElementById('addEmailBlacklist').value;    
            const adress = document.getElementById('addAdressBlacklist').value;
            const comment = document.getElementById('addCommentBlacklist').value; 
            
            const blacklistData = JSON.stringify({number_id_passport, lastname, firstname, postal_code, number_phone, city, email, adress, comment });
            
            const response = await fetch(`/v1/blacklist`, {
            method: 'POST',
            body: blacklistData,
            headers:{
                'Content-Type' : 'application/json'
            }
        });
        document.location.reload();
        }catch(error) {
            console.trace(error);
        }
    
    },

    deleteBlacklist: async function (event){
       // event.preventDefault();
        const buttonClicked = event.target;
        const blacklistElement = buttonClicked.closest('.modal-content');
        const blacklistId = blacklistElement.getAttribute('data-article-id');
        try{
            const response = await fetch(`/v1/blacklist/${blacklistId}`, {
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
  document.addEventListener('DOMContentLoaded', blacklist.init );