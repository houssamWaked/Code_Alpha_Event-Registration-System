const RegistrationService=require('../services/registrationService');



class RegistrationController {
    static async createRegistration(req, res) {
        try {
            const { userId, eventId } = req.body;
            const registration = await RegistrationService.createRegistration(userId, eventId);
            res.status(201).json({ message: 'Registration created successfully', registration });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getAllRegistrations(req, res) {
        try {
            const registrations = await RegistrationService.getAllRegistrations();
            res.status(200).json(registrations);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static async getRegistrationById(req, res) {
        try {
            const { id } = req.params;
            const registration = await RegistrationService.getRegistrationById(id);
            res.status(200).json(registration);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static async getRegistrationByUserId(req, res) {
        try {
            const { userId } = req.params;
            const registration = await RegistrationService.getRegistrationByUserId(userId);
            res.status(200).json(registration);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static async getRegistrationByEventId(req, res) {
        try {
            const { eventId } = req.params;
            const registration = await RegistrationService.getRegistrationByEventId(eventId);
            res.status(200).json(registration);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static async deleteRegistration(req, res) {
        try {
            const { id } = req.params;
            await RegistrationService.deleteRegistration(id);
            res.status(200).json({ message: 'Registration deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
module.exports = RegistrationController;