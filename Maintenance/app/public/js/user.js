const user= {
    
    saveUser: async function (event) {
        console.log('je rentre ici');
        try{
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
            
            const response = await fetch(`http://localhost:3030/v1/signin`, {
                method: 'POST',
                body: dataUser,
                headers:{
                    'Content-Type' : 'application/json'
                }

            });

            console.log(response); 
            const error = await response.json()
        
            //if(response.success === true){
            //    console.log('youpi pas d\'erreur');
            //    response.send('Bravo vous etes enregistrez')//.success('http://localhost:3030/v1/login')
            //}   
            if(error) {
                document.getElementById('errorname').textContent= error.messageError;
                document.getElementById('errorDiv').style= 'color: #721c24; background-color: #f8d7da; border-color: #f5c6cb; padding: .50rem .50rem; border: 1px solid transparent; border-radius: .25rem;';
            //}else {
            //    console.log('allo la terre');
            //    document.getElementById('errorname').textContent= 'Je suis content';
            //    document.getElementById('errorDiv').style= 'color: #721c24; background-color: #f8d7da; border-color: #f5c6cb; padding: .50rem .50rem; border: 1px solid transparent; border-radius: .25rem;';
            }
    
        }catch(error){
            console.trace(error);
        }
    },

    loginUser: async function (event) {
        try{
            const buttonSave = event.target;
            const article = buttonSave.closest('.login-show');
            const userEmail = document.getElementById('loginEmail').value;
            const userPassword = document.getElementById('loginPwd').value;

            const dataUser = JSON.stringify({
                userEmail: userEmail,
                userPassword: userPassword,
            });
            console.log(dataUser);
            const response = await fetch(`http://localhost:3030/v1/login`, {
                    method: 'POST',
                    body: dataUser,
                    headers:{
                        'Content-Type' : 'application/json'
                    },
                    //success: window.location.href = 'http://localhost:3030/v1/dashboard'
            });
            document.location.reload();
        }catch(error){
            console.trace(error);
        }
    }
    
};
// on accroche un écouteur d'évènement sur le document : quand le chargement est terminé, on lance user.init
document.addEventListener('DOMContentLoaded', user.init );