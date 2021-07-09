const User = require('../models/User');
const aselaValidate = require('../schema/asela_validate')
const bcrypt = require('bcrypt');
const Joi = require('joi');

const userController = {
    
    //Afficher la page login
    loginPage: async(request, response) => {
        try{
            if (request.session.user) {
                console.log(request.session.user);
                response.render('dashboard')
            }else{
                response.render('login')}
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
        findAllUser: async (request, response) => {
            try {
                if (request.session.user) {
                    const users = await User.findAllUser();
                    if (uers) {
                        response.json(uers);
                    } else {
                        response.status(404).json(`Il n'y a encore aucun utilisateur, allez vite vous inscrire !`);
                    }
                }else{
                    response.render('500');
                }
            }catch (error) {
                console.trace(error)
                return response.status(500).json(error.toString());
            }     
        },
        
        //Ajouter un utilisateur
        addUser: async (request, response) =>{
            try {
                if (request.session.user) {
                    const userId = (request.body.id)
                    const addUser = await User.addUser(userId);
                    if (addUser) {
                        response.json('Ajout de l\'utilisateur accepter');
                    } else {
                        response.status(404).json(`Desolé on ne vous a pas permis de vous enregistrer veuillez saisir les bonnes informations !`);
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
                if (request.body.userLastname && request.body.userFirstname && request.body.userNumber_phone && request.body.userEmail && request.body.userValidate_password && request.body.userPassword) {
                    const salt = await bcrypt.genSalt(10);
                    const encryptedPswd = await bcrypt.hash(request.body.userPassword, salt);
                    const user = {
                        lastname: request.body.userLastname,
                        firstname: request.body.userFirstname,
                        number_phone: request.body.userNumber_phone,
                        email: request.body.userEmail,
                        password: encryptedPswd,
                        userValidate_password: encryptedPswd
                    };  
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
                        console.log('user',user);
                        const validePass = await bcrypt.compare(request.body.userPassword, user.password);
                        if (!validePass){
                            console.log('mon mdp est mauvais');
                            response.json('le mot de passe est incorrect')
                        } else if(user.admin === true) { 
                            console.log('je suis connecter');
                            request.session.user = {
                                lastname : user.lastname,
                                firstname : user.firstname,
                                mail : user.mail,
                                logged : true,
                            } 
                            console.log('session', request.session.user);                   
                            response.json({ logged: true });
                        } else {
                            console.log('je ne suis pa autorisé');
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
        }
    }
    
    module.exports = userController;