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

          const response = await fetch(`/v1/adoptants`, {
          method: 'POST',
          body: adoptantData,
          headers:{
              'Content-Type' : 'application/json'
          }
      });
    
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

        const response = await fetch(`/v1/addCommentAdoptant/${articleId}`, {
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

  },

  treatmentQuest: async function (event){
    event.preventDefault();
    const elementClicked = event.target;
    const element = elementClicked.closest('.quest');
    const articleId = element.getAttribute('data-article-id');
    try{
      const dataQuestPet = document.getElementById('questPet').value;
      const dataQuestNamePet = document.getElementById('questPet').value;
      const dataQuestStatus = document.getElementById('questStatus').value;
      const dataQuestComment = document.getElementById('questComment').value;
      const dataQuestMeet = document.getElementById('questMeet').value;
      
      const treatmentValidate = JSON.stringify({
        articleId, 
        dataQuestPet, 
        dataQuestStatus,
        dataQuestComment, 
        dataQuestMeet 
      });
        
        const response = await fetch(`/v1/questionnaire/${articleId}`, {
        method: 'PATCH',
        body: treatmentValidate,
        headers:{
            'Content-Type' : 'application/json'
        },
        success: window.location.href = '/v1/questionnaire'
    });
    document.location.reload();
    }catch(error) {
        console.trace(error);
    }

  },

  editComment: async function (event){
    const buttonSave = event.target;
    const modale = buttonSave.closest('.modal-content');
    const modaleId = modale.getAttribute('data-article-id');
    const commentaire = document.getElementById(`commentaireEDITION${modaleId}`).value;

    const data = JSON.stringify({
        id: modaleId,
        commentaire: commentaire,
    });
    
    try{
        const response = await fetch(`/v1/editCommentAdoptant/${modaleId}`, {
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

suppComment: async function (event){
    const buttonSave = event.target;
    const modale = buttonSave.closest('.modal-content');
    const modaleId = modale.getAttribute('data-article-id');

    try{
        const response = await fetch(`/v1/deleteCommentAdoptant/${modaleId}`, {
            method: 'DELETE', 
        });
        document.location.reload();
    }catch(error) {
        console.trace(error);
    }
}  

};
// on accroche un écouteur d'évènement sur le document : quand le chargement est terminé, on lance app.init
document.addEventListener('DOMContentLoaded', adoptant.init );