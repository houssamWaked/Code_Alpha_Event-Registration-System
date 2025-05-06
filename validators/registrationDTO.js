const{body,param,validationResult} = require('express-validator');



// Centralized error handler middleware
const handleValidationErrors = (req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    next();
};
// Validation for creating a registration
const ValidateRegistrationCreation=[
    body('userId')
        .notEmpty().withMessage('User ID is required')
        .isInt({gt:0}).withMessage('User ID must be a positive integer'),
    body('eventId')
        .notEmpty().withMessage('Event ID is required')
        .isInt({gt:0}).withMessage('Event ID must be a positive integer'),

    handleValidationErrors,
];
// Validation for registration ID in URL params
const ValidateRegistrationIdParam=[
    param('id')
        .notEmpty().withMessage('Registration ID is required')
        .isInt({gt:0}).withMessage('Registration ID must be a positive integer'),

    handleValidationErrors,
];
// Validation for user ID in URL params
const ValidateUserIdParam=[
    param('userId')
        .notEmpty().withMessage('User ID is required')
        .isInt({gt:0}).withMessage('User ID must be a positive integer'),

    handleValidationErrors,
];
// Validation for event ID in URL params
const ValidateEventIdParam=[
    param('eventId')
        .notEmpty().withMessage('Event ID is required')
        .isInt({gt:0}).withMessage('Event ID must be a positive integer'),

    handleValidationErrors,
];
// Exporting the validation middlewares
module.exports={
    ValidateRegistrationCreation,
    ValidateRegistrationIdParam,
    ValidateUserIdParam,
    ValidateEventIdParam,
};
