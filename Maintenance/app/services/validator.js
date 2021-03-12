const validateQuery = (schema) => (req, res, next) => {
    const validatedQuery = schema.validate(req.query);
  
    if (validatedQuery.error) {
      res.status(400).json(validatedBody.error);
    }
    else {
      next();
    }
  };
  
  const validateBody = (schema) => (req, res, next) => {
    const validateBody = schema.validate(req.body);
  
    if (validateBody.error) {
      
      // res.status(400).render('signin', {
      //   messageError: validateBody.error.details[0].message
      // });
      res.status(400).json({messageError: validateBody.error.details[0].message})
    }
    else {
      next();
    }
  };
  
  module.exports = {
    validateBody,
    validateQuery,
  };


//const volunteerSchema = require('../schema/asela_validate');
//
//const validation = {
//    addUserValidation: async(request, response, next) => {
//        const value = await volunteerSchema.validate(request.body);
//        if (value.error){
//
//            const messageError = JSON.stringify({ 
//                error : value.error.details[0].message
//            });
//
//            console.log('erreur joi:', messageError);
//            response.locals.error = {messageError};
//            console.log('erreur dans validator',response.locals.error);
//
//            if(messageError){
//                response.render('signin', {
//                    error: response.locals.error
//                })
//            }
//
//        }else {
//            next();
//        }
//    }
//
//};
//
//module.exports = validation;
    
   