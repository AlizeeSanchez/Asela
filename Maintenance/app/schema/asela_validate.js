const Joi = require('@hapi/joi');

const volunteerSchema = Joi.object({

    userLastname: Joi.string()
        .min(3)
        .max(25)
        .required()
        .messages({ 
            'string.empty': 'Vous devez remplir ce champ',
            'string.min': 'Votre Nom de famille dois contenir au minimum 3 lettres',
            'string.max': 'Votre Nom de famille dois contenir maximum 25 caractères',
        }),

    userFirstname: Joi.string()
        .min(3)
        .max(25)
        .required()
        .messages({ 
            'string.empty': 'Vous devez remplir ce champ',
            'string.min': 'Votre Nom de famille dois contenir au minimum 3 lettres',
            'string.max': 'Votre Nom de famille dois contenir maximum 25 caractères',
        }),

    userNumber_phone: Joi.string()
        .regex(new RegExp('^(0)[1-9][0-9]{8}$'))
        .required()
        .messages({ 
            'string.empty': 'Vous devez remplir ce champ',
            'string.regex': 'Ce champs doit contenir des Chiffres uniquement',
            'string.min': 'Votre Nom de famille dois contenir au minimum 3 lettres',
            'string.max': 'Votre Nom de famille dois contenir maximum 25 caractères',
        }),

    userEmail: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } })
        .required()
        .messages({ 
            'string.empty': 'Vous devez remplir ce champ',
            'string.min': 'Votre Nom de famille dois contenir au minimum 3 lettres',
            'string.max': 'Votre Nom de famille dois contenir maximum 25 caractères',
        }),

    userPassword: Joi.string()
        .pattern(new RegExp('[a-zA-Z0-9\d$@%*+-._!]{7,20}$'))
        .required()
        .messages({ 
            'string.empty': 'Vous devez remplir ce champ',
            'string.min': 'Votre Nom de famille dois contenir au minimum 3 lettres',
            'string.max': 'Votre Nom de famille dois contenir maximum 25 caractères',
        }),

    userValidate_password: Joi.ref('userPassword')


}). options ( { abortEarly : false } );


module.exports = volunteerSchema;