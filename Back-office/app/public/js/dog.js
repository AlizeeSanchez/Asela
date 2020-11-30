const dog = {
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

    editDog: async function (event) {
        event.preventDefault();
        try {
            const buttonClicked = event.target;
            console.log(buttonClicked);
            
            
        
        }catch(error) {
            console.trace(error);
        }
    }, 
//    
//    closeModal: async function (event) {
//        event.preventDefault();
//        try {
//            //modal.setAttribute('aria-hidden', 'true');
//            //modal.removeAttribute('aria-modal');
//            //modal.removeListener('click', closeModal);
//            //modal.querySelector('close').removeEventListener('click', closeModal)
//            //modal = null;
//
//        }catch(error) {
//            console.log(error);
//            
//        }
}


