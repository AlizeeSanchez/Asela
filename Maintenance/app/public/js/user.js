const user= {
    
    saveUser: async function (event) {
        console.log('je rentre ici');
        try{
            const buttonSave = event.target;
            const article = buttonSave.closest('.show-log-panel');
            const userLastname = document.getElementById('userLastname').value;
            const userFirstname = document.getElementById('userFirstname').value;
            const userNumber_phone = document.getElementById('userNumber_phone').value;
            const userAdress = document.getElementById('userAdress').value;
            const userPostal_code = document.getElementById('userPostal_code').value;
            const userCity = document.getElementById('userCity').value;
            const userEmail = document.getElementById('userEmail').value;
            const userPassword = document.getElementById('userPassword').value;
            const userValidate_password = document.getElementById('userValidate_password').value;
        
            const dataUser = JSON.stringify({
                userLastname: userLastname,
                userFirstname: userFirstname,
                userNumber_phone: userNumber_phone,
                userAdress: userAdress,
                userPostal_code: userPostal_code,
                userCity: userCity,
                userEmail: userEmail,
                userPassword: userPassword,
                userValidate_password: userValidate_password
            });
            console.log(dataUser);
            const response = await fetch(`/v1/signin`, {
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
            //    response.send('Bravo vous etes enregistrez')//.success('/v1/login')
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
            const response = await fetch(`/v1/login`, {
                    method: 'POST',
                    body: dataUser,
                    headers:{
                        'Content-Type' : 'application/json'
                    },
            });
            document.location.reload();
        }catch(error){
            console.trace(error);
        }
    },

    authorizedBtn: async function (event) {
        try{
            const buttonClicked = event.target;
            const modalElement = buttonClicked.closest('#adminModale');
            const modalId = modalElement.getAttribute('data-article-id'); 
            console.log(modalId);   
            const response = await fetch(`/v1/admin-authorized/${modalId}`, {
                method: 'PATCH',
            });
            document.location.reload();
            console.log(response);
        }catch(error) {
            console.trace(error);
        }
    },

    editUser: async function (event) {
        try{
            const buttonClicked = event.target;
            const modalElement = buttonClicked.closest('.register-modif');
            const modalId = modalElement.getAttribute('data-article-id');
            const userNumber = document.getElementById('userNumber_phone').value;
            const userEmail = document.getElementById('userEmail').value;
            const userAdress = document.getElementById('userAdress').value;
            const userCity = document.getElementById('userCity').value; 
            const userPostal_code = document.getElementById('userPc').value;

            console.log('mon id', modalId);

            const dataUser = JSON.stringify({
                id: modalId,
                number: userNumber,
                mail: userEmail,
                adress: userAdress,
                city: userCity,
                postal_code: userPostal_code
            });
            
            const response = await fetch(`/v1/my-profile/${modalId}`, {
                method: 'PATCH',
                body: dataUser,
                headers:{
                    'Content-Type' : 'application/json'
                },
            });
            document.location.reload();
            console.log(response);
        }catch(error) {
            console.trace(error);
        }
    },

    editMDP: async function (event) {
        try{
            const buttonClicked = event.target;
            const modalElement = buttonClicked.closest('.register-modif');
            const modalId = modalElement.getAttribute('data-article-id');
            const userPassword = document.getElementById('userPassword').value;
            const userNew_password = document.getElementById('userNew_password').value;
            console.log('mon id', modalId);

            const data = JSON.stringify({
                id: modalId,
                oldpassword : userPassword,
                password: userNew_password
            });

            console.log(data);

            const response = await fetch(`/v1/update-my-password/${modalId}`, {
                method: 'PATCH',
                body: data,
                headers:{
                    'Content-Type' : 'application/json'
                },
            });
            //document.location.reload();
            console.log(response);
        }catch(error) {
            console.trace(error);
        }
    },
    
};
// on accroche un écouteur d'évènement sur le document : quand le chargement est terminé, on lance user.init
document.addEventListener('DOMContentLoaded', user.init );