const user = require('../schema/asela_validate')


//const validateQuery = (schema) => (req, res, next) => {
//    const validatedQuery = schema.volunteerSchema(req.query);
//
//    if (validatedBody.error) {
//        res.status(400).json(validatedBody.error);
//    } else {
//        next();
//    }
//};

//const validateBody = (schema) => (req, res, next) => {
//    const validatedBody = schema.validate(req.body);
//
//    if (validatedBody.error) {
//        res.status(400).json(validatedBody.error);
//
//
//    } else {
//        next();
//    }
//};



module.exports = {
    
    addUserValidation: async(request, response, next) => {
        const value = await user.validate(request.body);
        //console.log('message',message);
        //console.log('messages',messages);
        if (value.error){
            response.json({
                success: 0,
                message: value.error.details[0].message
            })
        }else {
            next();
        }
    }
    //validateBody,
    //validateQuery
};