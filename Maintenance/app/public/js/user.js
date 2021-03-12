
const user= {

    init: function () {
        user.addListenerToActions();
    },

    addListenerToActions: function () {
        // on cible le bouton inscription dans la page signin
        const signin = document.querySelector('.validateUser');
        console.log(signin);
        
        signin.addEventListener('click', user.saveUser);
        
    },

    validateForm: function()                         
    {  
       //console.log('test',locals.messageError); 
        const lastname = document.forms["myForm"]["lastname"];
        const firstname = document.forms["myForm"]["firstname"];
        const number = document.forms["myForm"]["number_phone"];        
        const email = document.forms["myForm"]["email"];
        const password = document.forms["myForm"]["password"];
        const password2 = document.forms["myForm"]["passwordCopie"];

        if(!lastname.value | !firstname.value | !number.value | !email.value | !password.value | !password2.value){
            console.log('mon erreur');
            document.getElementById('errorname').textContent= "veuillez remplir tous les champs";
            document.getElementById('errorDiv').style= 'color: #721c24; background-color: #f8d7da; border-color: #f5c6cb; padding: .50rem .50rem; border: 1px solid transparent; border-radius: .25rem;';
            return true;
        }
        // else{
        //     document.getElementById('errorname').textContent= "";
        //     }   
        }, 

        saveUser: async function (event) {
        event.preventDefault();
        //try{
            const buttonSave = event.target;
            const article = buttonSave.closest('.show-log-panel');
            const userLastname = document.getElementById('userLastname').value;
            const userFirstname = document.getElementById('userFirstname').value;
            const userNumber_phone = document.getElementById('userNumber_phone').value;
            const userEmail = document.getElementById('userEmail').value;
            const userPassword = document.getElementById('userPassword').value;
            const userValidate_password = document.getElementById('userValidate_password').value;
        
            const dataUser = JSON.stringify({
                userLastname: userLastname,
                userFirstname: userFirstname,
                userNumber_phone: userNumber_phone,
                userEmail: userEmail,
                userPassword: userPassword,
                userValidate_password: userValidate_password
            });  

            // fetch(`http://localhost:3030/v1/signin`, {
            //          method: 'POST',
            //          body: dataUser,
            //          headers:{
            //              'Content-Type' : 'application/json'
            //          }
            //      }).then((response) => {
            //          return response.json()
            //      }).then((json) => {
            //          console.log("json", json.messageError)
            //          document.getElementById('errorname').textContent= json.messageError;
            //          document.getElementById('errorDiv').style= 'color: #721c24; background-color: #f8d7da; border-color: #f5c6cb; padding: .50rem .50rem; border: 1px solid transparent; border-radius: .25rem;';         
            //      }).catch(error => console.log(error))

                 const response = await fetch(`http://localhost:3030/v1/signin`, {
                    method: 'POST',
                    body: dataUser,
                    headers:{
                        'Content-Type' : 'application/json'
                    }
                })

                const json = await response.json()
                document.getElementById('errorname').textContent= json.messageError;
                document.getElementById('errorDiv').style= 'color: #721c24; background-color: #f8d7da; border-color: #f5c6cb; padding: .50rem .50rem; border: 1px solid transparent; border-radius: .25rem;';         



        // const response = await fetch(`http://localhost:3030/v1/signin`, {
        //     method: 'POST',
        //     body: dataUser,
        //     headers:{
        //         'Content-Type' : 'application/json'
        //     }
        // });
        // console.log(JSON.stringify(response));
        // if(response.status === 200) {
        //     //document.location.reload();
        //     console.log('response.status = 200');
            
        //     //localStorage.setItem('abs');
        //     //console.log('user.js localstorage', localStorage.getItem);
            
        //     //document.location = 'http://localhost:3030/v1/login'
        // } 
        // else if (response.status === 400) {
        //     //throw new Error(validateBody)
        
        // }
        // else {
        //     response.json("Impossible de vous enregistrez")
        // }
        // }catch(error) {

        //     //const messageError = validateBody.error.details[0].message;
        //     console.log(error);
    
        //     //response.locals.error = {messageError};

        //     // if(messageError){
        //     //     response.render('signin', {
        //     //         messageError
        //     //     })
        //     // }
        //     console.trace(error);
        // }
    } 
}
// on accroche un écouteur d'évènement sur le document : quand le chargement est terminé, on lance app.init
document.addEventListener('DOMContentLoaded', user.init );