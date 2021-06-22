const adoptant = {
    init: function () {
		adoptant.addListenerToActions();

    },
    addListenerToActions: function () {

      //On cible le bouton ajouter un adoptant
      const addNewAdoptant = document.querySelector('.saveNewAdoptant');
      if(addNewAdoptant){
          addNewAdoptant.addEventListener('click', adoptant.addAdoptant);
      }
    },

    addAdoptant: async function (event){
      event.preventDefault();
      try{
          const number_id_passport = document.getElementById('addNumberIdPassport').value;
          const lastname = document.getElementById('addLastname').value;
          const firstname = document.getElementById('addFirstname').value;
          const birthday = document.getElementById('addBirthday').value;
          const job = document.getElementById('addJob').value;
          const spouseLastname = document.getElementById('addSpouseLastname').value;
          const spouseFirstname = document.getElementById('addSpouseFirstname').value;    
          const spouseBirthday = document.getElementById('addSpouseBirthday').value;
          const spouseJob = document.getElementById('addSpouseJob').value; 
          const postal_code = document.getElementById('addPostalCode').value;
          const number_phone = document.getElementById('addNumberPhone').value;
          const number_phone2 = document.getElementById('addNumberPhone2').value;    
          const city = document.getElementById('addCity').value;
          const email = document.getElementById('addEmail').value; 
          const adress = document.getElementById('AddAdress').value;
          const type_home = document.getElementById('addType_home').value;
          const fbPseudo = document.getElementById('addFbPseudo').value;
          const numberAdultHome = document.getElementById('addNumberAdultHome').value;    
          const numberChlidHome = document.getElementById('addNumberChlidHome').value;
          const petComposition = document.getElementById('addPetComposition').value; 
          const black_list = document.getElementById('addBlacklist').value;
          const pet_adopt = document.getElementById('addPetAdopted').value
          const datePetAdopt = document.getElementById('addDatePetAdopted').value
          const adoptantData = JSON.stringify({number_id_passport, lastname, firstname, birthday, job, spouseLastname, spouseFirstname, spouseBirthday, spouseJob, postal_code, number_phone, number_phone2, city, email, adress, type_home, fbPseudo, numberAdultHome, numberChlidHome, petComposition, black_list/*, pet_adopt, datePetAdopt*/});
          console.log('mes données adoptant', adoptantData);

          const response = await fetch(`http://localhost:3030/v1/adoptants`, {
          method: 'POST',
          body: adoptantData,
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

  addCommentAdoptant: async function (event){
    event.preventDefault();
    try{
      const buttonSave = event.target;
      const article = buttonSave.closest('.comment');
      const articleId = article.getAttribute('data-article-id');
      const commentAdoptant = document.getElementById('commentAdoptant').value;
        const adoptantComment = JSON.stringify({commentAdoptant});

        const response = await fetch(`http://localhost:3030/v1/addCommentAdoptant/${articleId}`, {
        method: 'POST',
        body: adoptantComment,
        headers:{
            'Content-Type' : 'application/json'
        }
    });
    document.location.reload();
    }catch(error) {
        console.trace(error);
    }

  }

};
// on accroche un écouteur d'évènement sur le document : quand le chargement est terminé, on lance app.init
document.addEventListener('DOMContentLoaded', adoptant.init );