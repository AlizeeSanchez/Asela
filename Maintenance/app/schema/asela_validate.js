const Joi = require('@hapi/joi');

const volunteerSchema = Joi.object({

    userLastname: Joi.string()
        .regex(new RegExp('^[a-zA-Z- à-ù]{3,}[^0-9]$')).required()
        .min(3)
        .max(25)
        .messages({
            "string.empty": "La valeur du Nom de famille doit être rempli",
            "string.min": "La valeur du Nom de famille doit contenir au moins 3 lettres",
            "string.max": "La valeur du Nom de famille doit contenir moins de 25 lettres",
            "string.pattern.base": "La valeur du Nom de famille n'est pas valide",  
        }
        ),

    userFirstname: Joi.string()
        .regex(new RegExp('^[a-zA-Z- à-ù]{3,}[^0-9]$')).required()
        .min(3)
        .max(25)
        .messages({
            "string.empty": "La valeur du Prénom doit être rempli",
            "string.min": "La valeur du Prénom doit contenir au moins 3 lettres",
            "string.max": "La valeur du Prénom doit contenir moins de 25 lettres",
            "string.pattern.base":`La valeur du Prénom n'est pas valide`,
        }
        ),

    userNumber_phone: Joi.string()
        .regex(new RegExp('^(0)[1-9][0-9]{8}$')).required()
        .min(10)
        .max(10)
        .messages({
            "string.empty": "La valeur du numero de téléphone doit être rempli",
            "string.min": "La valeur du numero de téléphone doit contenir 10 numéro",
            "string.max": "La valeur du numero de téléphone doit contenir 10 numéro",
            "string.pattern.base":`La valeur du numero de téléphone n'est pas valide`,
        }
        ),
    userAdress: Joi.string()
        .messages({
            "string.empty": "La valeur de l'adresse doit être rempli",
        }
        ),

    userPostal_code: Joi.string()
        .regex(new RegExp('^(([0-8][0-9])|(9[0-5]))[0-9]{3}$')).required()
        .min(5)
        .max(5)
        .messages({
            "string.empty": "La valeur du code postal doit être rempli",
            "string.min": "La valeur du code postal doit contenir 5 numéro",
            "string.max": "La valeur du code postal doit contenir 5 numéro",
            "string.pattern.base":`La valeur du code postal n'est pas valide`,
        }
        ),

    userCity: Joi.string()
        .messages({
            "string.empty": "La valeur de la ville doit être rempli",
        }
        ),

    userEmail: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } }).required()
        .messages({
            "string.empty": "La valeur de l'email doit être rempli",
            "string.email":`La valeur de l'email n'est pas valide`,
        }
        ),

    userPassword: Joi.string()
        .regex(new RegExp('[a-zA-Z0-9\d$@%*+-._!]{7,20}$')).required()
        .messages({
            "string.empty": "La valeur du password doit être rempli",
            "string.pattern.base":`La valeur du password n'est pas valide`,
        }
        ),

    userValidate_password: Joi.ref('userPassword')
       
});

module.exports = volunteerSchema;