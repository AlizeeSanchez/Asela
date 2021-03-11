const User = require('../models/User');
const aselaValidate = require('../schema/asela_validate')
const bcrypt = require('bcrypt');
const Joi = require('joi')

const userController = {

    //Afficher la page login
    loginPage: async(request, response) => {
        try{
            response.render('login')
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
            const users = await User.findAllUser();
            console.log(uers);
            if (uers) {
                response.json(uers);
            } else {
                response.status(404).json(`Il n'y a encore aucun utilisateur, allez vite vous inscrire !`);
            }
        }catch (error) {
            console.trace(error)
            return response.status(500).json(error.toString());
        }     
    },

    //Ajouter un utilisateur
    addUser: async (request, response) =>{
        try {
            const userId = (request.body.id)
            const addUser = await User.addUser(userId);
            if (addUser) {
                response.json('Ajout de l\'utilisateur accepter');
            } else {
                response.status(404).json(`Desolé on ne vous a pas permis de vous enregistrer veuillez saisir les bonnes informations !`);
            }
        }catch (error) {
            console.trace(error)
            return response.status(500).json(error.toString());
        }  
    },

    createUser: async (request, response) => {
        try {
            console.log('mon body',request.body);
            if (request.body.userLastname && request.body.userFirstname && request.body.userNumber_phone && request.body.userEmail && request.body.userValidate_password && request.body.userPassword) {
              
                // on crypt le mdp avec 10 tour de salage (recommanded via doc)
                const salt = await bcrypt.genSalt(10);
                const encryptedPswd = await bcrypt.hash(request.body.userPassword, salt);
                
                    const user = {
                        lastname: request.body.userLastname,
                        firstname: request.body.userFirstname,
                        number_phone: request.body.userNumber_phone,
                        email: request.body.userEmail,
                        password: encryptedPswd,
                    };  
                    //on transmet les informations du membre a la fonction createMember
                    const saveUser = await User.signIn(user);
                    response.redirect('login');
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
            const user = await User.getMemberByEmail(request.body.mail)
            if(request.body.mail && request.body.password) { 
                if (!user) {
                    //si le membre n'existe pas
                    response.json('Cette adresse email n\'existe pas');
                }
                    //si le membre existe
                if (user) {
                    const validePass = await bcrypt.compare(request.body.password, user.password);
                    if (!validePass){
                        response.json('le mot de passe est incorrect')
                    } else {
                        request.session.user = {
                            lastname : member.lastname,
                            firstname : member.firstname,
                            mail : member.mail,
                            logged : true,
                       }                    
                       //console.log(request.session.member)
                       console.log('Logged:',request.session.user.logged);
                       
                       response.json({ logged: true });
                       //creer le member dans req.session  et le tuer pour deco if il existe = connecte if non personne deco

                       //response.redirect('/isLogged');
                    }
                }   
            } else  {
                response.json('Vous n\'avez pas saisi tout les champs')
            }
        } catch (error){
            console.trace(error);
            return response.status(500).json(error.toString());
        }
    }
}

module.exports = userController;