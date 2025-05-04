const express = require('express');
const router = express.Router();
const EventController = require('../controllers/eventController');
const {
    ValidateEventCreation,
    ValidateEventIdParam,
    ValidateEventTitleParam,
    ValidateEventLocationParam,
    ValidateEventCreatedByParam,
    ValidateEventUpdate,
} = require('../validators/eventDTO');

// Route to create a new event
router.post('/', ValidateEventCreation, (req, res) =>
    EventController.createEvent(req, res)
);

// Route to get all events
router.get('/', (req, res) => EventController.getAllEvents(req, res));

// Route to get event by ID
router.get('/id/:event_id', ValidateEventIdParam, (req, res) =>
    EventController.getEventById(req, res)
);

// Route to get event by title
router.get('/title/:title', ValidateEventTitleParam, (req, res) =>
    EventController.getEventByTitle(req, res)
);

// Route to get event by location
router.get('/location/:location', ValidateEventLocationParam, (req, res) =>
    EventController.getEventByLocation(req, res)
);

// Route to get event by creator's ID (created_by)
router.get('/created_by/:created_by', ValidateEventCreatedByParam, (req, res) =>
    EventController.getEventByCreatedBy(req, res)
);

// Route to update event by ID
router.put('/:event_id', [ValidateEventIdParam, ValidateEventUpdate], (req, res) =>
    EventController.updateEvent(req, res)
);

// Route to delete event by ID
router.delete('/:event_id', ValidateEventIdParam, (req, res) =>
    EventController.deleteEvent(req, res)
);

module.exports = router;
