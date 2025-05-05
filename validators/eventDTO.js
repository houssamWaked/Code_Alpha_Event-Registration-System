const { body, param, validationResult } = require('express-validator');

// Centralized error handler middleware
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Validation for creating an event
const ValidateEventCreation = [
    body('title')
        .notEmpty().withMessage('Event title is required')
        .isLength({ min: 3 }).withMessage('Event title must be at least 3 characters'),

    body('location')
        .notEmpty().withMessage('Event location is required')
        .isLength({ min: 3 }).withMessage('Event location must be at least 3 characters'),

    body('start_time')
        .notEmpty().withMessage('Event start time is required')
        .isISO8601().withMessage('Invalid start time format'),

    body('end_time')
        .notEmpty().withMessage('Event end time is required')
        .isISO8601().withMessage('Invalid end time format')
        .custom((value, { req }) => {
            if (req.body.start_time && new Date(value) <= new Date(req.body.start_time)) {
                throw new Error('End time must be after start time');
            }
            return true;
        }),

    body('created_by')
        .notEmpty().withMessage('Creator ID is required')
        .isInt({ gt: 0 }).withMessage('Creator ID must be a positive integer'),

        body('capacity')
        .notEmpty().withMessage('Event capacity is required')
        .isInt({ gt: 0 }).withMessage('Event capacity must be a positive integer'),

        body('ticket_price')
        .notEmpty().withMessage('Ticket price is required')
        .isNumeric().withMessage('Ticket price must be a number')
        .custom((value) => {
            if (value < 0) {
                throw new Error('Ticket price must be a positive number');
            }
            return true;
        }),
    body('enrollment')
        .notEmpty().withMessage('Enrollment is required'), 

    handleValidationErrors,
];

// Validation for event ID in URL params
const ValidateEventIdParam = [
    param('event_id')
        .isInt({ gt: 0 }).withMessage('Event ID must be a positive integer'),
    handleValidationErrors,
];

// Validation for event title in URL params
const ValidateEventTitleParam = [
    param('title')
        .notEmpty().withMessage('Event title is required')
        .isLength({ min: 3 }).withMessage('Event title must be at least 3 characters'),
    handleValidationErrors,
];

// Validation for event location in URL params
const ValidateEventLocationParam = [
    param('location')
        .notEmpty().withMessage('Event location is required')
        .isLength({ min: 3 }).withMessage('Event location must be at least 3 characters'),
    handleValidationErrors,
];

// Validation for creator ID in URL params
const ValidateEventCreatedByParam = [
    param('created_by')
        .isInt({ gt: 0 }).withMessage('Creator ID must be a positive integer'),
    handleValidationErrors,
];

// Validation for updating an event
const ValidateEventUpdate = [
    body('title')
        .optional()
        .isLength({ min: 3 }).withMessage('Event title must be at least 3 characters'),

    body('location')
        .optional()
        .isLength({ min: 3 }).withMessage('Event location must be at least 3 characters'),

    body('start_time')
        .optional()
        .isISO8601().withMessage('Invalid start time format'),

    body('end_time')
        .optional()
        .isISO8601().withMessage('Invalid end time format')
        .custom((value, { req }) => {
            if (req.body.start_time && value && new Date(value) <= new Date(req.body.start_time)) {
                throw new Error('End time must be after start time');
            }
            return true;
        }),

    body('created_by')
        .optional()
        .isInt({ gt: 0 }).withMessage('Creator ID must be a positive integer'),
        body('capacity')
        .optional()
        .notEmpty().withMessage('Event capacity is required')
        .isInt({ gt: 0 }).withMessage('Event capacity must be a positive integer'),

        body('ticket_price')
        .optional()
        .notEmpty().withMessage('Ticket price is required')
        .isNumeric().withMessage('Ticket price must be a number')
        .custom((value) => {
            if (value < 0) {
                throw new Error('Ticket price must be a positive number');
            }
            return true;
        }),
    body('enrollment')
        .optional()
        .notEmpty().withMessage('Enrollment is required'), 

    handleValidationErrors,
];

module.exports = {
    ValidateEventCreation,
    ValidateEventIdParam,
    ValidateEventTitleParam,
    ValidateEventLocationParam,
    ValidateEventCreatedByParam,
    ValidateEventUpdate,
};
