const dog = {
   seeOnePet: async function (event) {
        event.preventDefault();
        try {
            const buttonClicked = event.target;
            const articleElement = buttonClicked.closest('.article');
            const articleId = articleElement.getAttribute('data-article-id');
            const response = await fetch(`http://localhost:4040/v1/pet/${articleId}`, {
               method: 'GET',
            });
            console.log(response);
      
        }catch(error) {
            console.trace(error);
        }
    }
}


