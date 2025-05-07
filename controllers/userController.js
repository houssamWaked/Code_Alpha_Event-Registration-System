const userServices = require('../services/userServices');

class UserController{
    static handleError(res, error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ message: error.message || 'An error occurred' });
    }

    static async createUser(req, res) {
        try {
            const userData = req.body;
            const user = await userServices.createUser(userData);
            res.status(201).json(user);
        } catch (error) {
            UserController.handleError(res, error);
        }
    }
    static async getAllUsers(req, res) {
        try {
            const users = await userServices.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            UserController.handleError(res, error);
        }
    }
    static async getUserByEmail(req, res) {
        try {
            const { email } = req.params;
            const user = await userServices.getUserByEmail(email);
            res.status(200).json(user);
        } catch (error) {
            UserController.handleError(res, error);
        }
    }
        static async getUserById(req, res) {
            try {
                const { id } = req.params;
                const user = await userServices.getUserById(id);
                res.status(200).json(user);
            } catch (error) {
                UserController.handleError(res, error);
            }
        }
        static async getUserByName(req, res) {
            try {
                const { name } = req.params;
                const user = await userServices.getUserByName(name);
                res.status(200).json(user);
            } catch (error) {
                UserController.handleError(res, error);
            }
        }
    static async updateUser(req, res) {
        try {
            const { id } = req.params;
            const updates = req.body;
            const updatedUser = await userServices.updateUser(id,updates);
            res.status(200).json(updatedUser);
        } catch (error) {
            UserController.handleError(res, error);
        }
    }
    static async loginUser(req, res) {
        try {
            const { email, password } = req.body;
            const user = await userServices.loginUser(email, password);
            res.status(200).json(user);
        } catch (error) {
            UserController.handleError(res, error);
        }
    }
    static async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const deletedUser = await userServices.deleteUser(id);
            res.status(200).json(deletedUser);
        } catch (error) {
            UserController.handleError(res, error);
        }
    }
}
module.exports = UserController;
