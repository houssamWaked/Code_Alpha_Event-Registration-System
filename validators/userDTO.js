const { body, param, validationResult } = require('express-validator');

// Centralized error handler middleware
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const ValidateUserCreation = [
    body('name')
        .notEmpty().withMessage('User name is required')
        .isLength({ min: 3 }).withMessage('User name must be at least 3 characters'),

    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email address'),

    body('password_hash')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

    handleValidationErrors,
];

const ValidateUserIdParam = [
    param('id')
        .isInt({ gt: 0 }).withMessage('User ID must be a positive integer'),
    handleValidationErrors,
];

const ValidateUserEmailParam = [
    param('email')
        .isEmail().withMessage('Invalid email format'),
    handleValidationErrors,
];

const ValidateUserNameParam = [
    param('name')
        .notEmpty().withMessage('User name is required')
        .isLength({ min: 3 }).withMessage('User name must be at least 3 characters'),
    handleValidationErrors,
];

const ValidateUserUpdate = [
    body('name')
        .optional()
        .isLength({ min: 3 }).withMessage('User name must be at least 3 characters'),

    body('email')
        .optional()
        .isEmail().withMessage('Invalid email address'),

    body('password_hash')
        .optional()
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

    handleValidationErrors,
];

module.exports = {
    ValidateUserCreation,
    ValidateUserIdParam,
    ValidateUserEmailParam,
    ValidateUserNameParam,
    ValidateUserUpdate,
};
