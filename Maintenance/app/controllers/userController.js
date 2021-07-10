const User = require('../models/User');
const aselaValidate = require('../schema/asela_validate')
const bcrypt = require('bcrypt');
const Joi = require('joi');

const userController = {
    
    //Afficher la page login
    loginPage: async(request, response) => {
        try{
            if (request.session.user) {
                response.redirect('/v1/dashboard')
            }else{
                response.render('login')}
        }catch (error) {
                console.trace(error)
                return response.status(500).json(error.toString());
        } 
    },

    logout: async(request, response) => {
        try{
            if (request.session.user) {
                request.session.destroy()
                response.redirect('/v1/login')
            }else{
                response.redirect('/v1/login')}
        }catch (error) {
                console.trace(error)
                return response.status(500).json(error.toString());
        } 
    },
    
    //Afficher la page login
    signInPage: async(request, response) => {
        try{
            response.render('signin')
        }catch (error) {
            console.trace(error)
            return response.status(500).json(error.toString());
        } 
    },
    
    //Lister tous les utilisateurs
    adminPage: async (request, response) => {
        try {
            if (request.session.user) {
                const session = request.session.user;
                const benevoles = await User.findAllUser();
                if (benevoles) {
                    response.render('benevoles', {
                        benevoles,
                        session
                    }); 
                } else {
                    response.status(404).json(`Il n'y a encore aucun utilisateur !`);
                }
            }else{
                response.render('500');
            }
        }catch (error) {
            console.trace(error)
            return response.status(500).json(error.toString());
        }     
    },
    
    //Gerer l'acces à un utilisateur
    adminAuthorized: async (request, response) =>{
        try {
            if (request.session.user) {
                const userId = (request.params.id)
                const user = await User.findOneUser(userId);
                if(user){
                    if(user[0].admin === true) {
                        const delUset = await User.delUser(userId);
                        response.json('Ajout de l\'utilisateur accepter');
                    }
                    if (user[0].admin === false) {
                        const addUser = await User.addUser(userId);
                        response.json(`L'utilisateur à bien été supprimer`);
                    } 
                }else {
                    response.status(404).json(`Desolé l'utilisateur ${userId} n'existe pas!`);
                }
            }else{
                response.render('500');
            }
        }catch (error) {
            console.trace(error)
            return response.status(500).json(error.toString());
        }  
    },
    
    createUser: async (request, response) => {
        try {
            console.log(response.body);
            if (request.body.userLastname && request.body.userFirstname && request.body.userNumber_phone && request.body.userEmail && request.body.userValidate_password && request.body.userPassword) {
                const salt = await bcrypt.genSalt(10);
                const encryptedPswd = await bcrypt.hash(request.body.userPassword, salt);
                const user = {
                    lastname: request.body.userLastname,
                    firstname: request.body.userFirstname,
                    number_phone: request.body.userNumber_phone,
                    adress: request.body.userAdress,
                    city: request.body.userCity,
                    postal_code: request.body.userPostal_code,
                    email: request.body.userEmail,
                    password: encryptedPswd,
                    userValidate_password: encryptedPswd
                }; 
                console.log('user', user); 
                const saveUser = await User.signIn(user);
            }
        } catch (error){
            console.trace(error);
            return response.status(500).json(error.toString());
        } 
    },
    
    //Se connecter
    login: async (request, response) => {
        try {        
            //On verifie si le membre est deja present en BDD via son email
            const user = await User.getMemberByEmail(request.body.userEmail)
            if(request.body.userEmail && request.body.userPassword) { 
                if (!user) {
                    response.json('Cette adresse email n\'existe pas');
                }
                if (user) {
                    const validePass = await bcrypt.compare(request.body.userPassword, user.password);
                    if (!validePass){
                        response.json('le mot de passe est incorrect')
                    } else if(user.admin === true) { 
                        request.session.user = {
                            lastname : user.lastname,
                            firstname : user.firstname,
                            mail : user.mail,
                            id : user.id,
                            logged : true,
                        } 
                        response.json({ logged: true });
                    } else {
                        response.json('Vous n\'etes pas autorisé a vous connectez.');
                    }
                }   
            } else  {
                response.json('Vous n\'avez pas saisi tout les champs')
            }
        }catch (error){
            console.trace(error);
            return response.status(500).json(error.toString());
        }
    },
    
    findOneProfil: async (request, response) => {
        try {
            if (request.session.user) {
                const profilId = parseInt(request.session.user.id)
                const profil = await User.findOneUser(profilId);
                const session = request.session.user;
                if(profil){
                    response.render('profil', {
                        profil,
                        session
                    });        
                }else{
                    response.status(404).json(`Il n'y a aucun profil`);
                }
            }else {
                response.render('500');
            }
        }catch(error){
            console.trace(error)
            return response.status(500).json(error.toString());
        }
    },

    editProfil: async (request, response) => {
        try {
            if (request.body.number && request.body.mail && request.body.adress && request.body.city && request.body.postal_code ) {
            const editUser = await User.editUser(request.body);
            }
        } catch (error){
            console.trace(error);
            return response.status(500).json(error.toString());
        } 
    },

    editPassword: async (request, response) => {
        try {
            console.log('mes modif controller:',request.body);
            if (request.body.oldpassword && request.body.password) {
                const user = await User.getMemberById(request.body.id)
                const validePass = await bcrypt.compare(request.body.oldpassword, user.password);
                console.log('validePass', validePass);
                if (!validePass){
                    response.json('le mot de passe est incorrect')
                }else { 
                    const salt = await bcrypt.genSalt(10);
                    const encryptedPswd = await bcrypt.hash(request.body.password, salt);
                    const body = {
                        password: encryptedPswd,
                        id: request.body.id
                    }; 
                    console.log('new mdp', body); 
                    const saveMdp = await User.newPassword(body);
                }
            }
        } catch (error){
            console.trace(error);
            return response.status(500).json(error.toString());
        } 
    },
}

module.exports = userController;