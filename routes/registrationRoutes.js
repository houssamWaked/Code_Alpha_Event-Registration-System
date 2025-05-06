const express= require('express')
const router=express.Router();
const registrationController=require('../controllers/registrationController');
const{
    ValidateRegistrationCreation,
    ValidateRegistrationIdParam,
    ValidateUserIdParam,
    ValidateEventIdParam,
}=require('../validators/registrationDTO.JS');

// Route to create a new registration
router.post('/',ValidateRegistrationCreation,(req,res)=>
    registrationController.createRegistration(req,res)
);
// Route to get all registrations
router.get('/',(req,res)=>
    registrationController.getAllRegistrations(req,res)
);
// Route to get all users in an event
router.get('/event/:eventId/users',ValidateEventIdParam,(req,res)=>
    registrationController.getAllUserInEvent(req,res)
);
// Route to get registration by user and event
router.get('/user/:userId/event/:eventId',ValidateUserIdParam,ValidateEventIdParam,(req,res)=>
    registrationController.getRegistrationByUserAndEvent(req,res)
);
// Route to get registration by ID
router.get('/id/:id',ValidateRegistrationIdParam,(req,res)=>
    registrationController.getRegistrationById(req,res)
);
// Route to get registration by user ID
router.get('/user/:userId',ValidateUserIdParam,(req,res)=>
    registrationController.getRegistrationByUserId(req,res)
);
// Route to get registration by event ID
router.get('/event/:eventId',ValidateEventIdParam,(req,res)=>
    registrationController.getRegistrationByEventId(req,res)
);
// Route to delete registration by ID
router.delete('/:id',ValidateRegistrationIdParam,(req,res)=>
    registrationController.deleteRegistration(req,res)
);

module.exports=router;