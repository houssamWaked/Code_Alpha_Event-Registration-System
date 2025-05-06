const registrationRepository=require('../repositories/registrationRepository');
const eventRepository=require('../repositories/eventRepository');
const userRepository=require('../repositories/userRepository');

class RegistrationService {
    static async createRegistration(userId, eventId) {
        const user = await userRepository.getUserById(userId);
        if (!user) {
            throw new Error(`User with ID ${userId} not found`);
        }
        const event = await eventRepository.getEventById(eventId);
        if (!event) {
            throw new Error(`Event with ID ${eventId} not found`);
        }
        return await registrationRepository.createRegistration(userId, eventId);
    }
    static async getAllRegistrations() {
        return await registrationRepository.getAllRegistrations();
    }
    static async getRegistrationById(id) {
        const registration = await registrationRepository.getRegistrationById(id);
        if (!registration) {
            throw new Error(`Registration with ID ${id} not found`);
        }
        return registration;
    }
    static async getRegistrationByUserId(userId) {
        const user = await userRepository.getUserById(userId);
        if (!user) {
            throw new Error(`User with ID ${userId} not found`);
        }
        return await registrationRepository.getRegistrationByUserId(userId);
    }
    static async getRegistrationByEventId(eventId) {
        const event = await eventRepository.getEventById(eventId);
    
        if (!event) {
            throw new Error(`Event with ID ${eventId} not found`);
        }
        return await registrationRepository.getRegistrationByEventId(eventId);
    }
    static async deleteRegistration(id) {
        const registration = await registrationRepository.getRegistrationById(id);
        if (!registration) {
            throw new Error(`Registration with ID ${id} not found`);
        }
        return await registrationRepository.deleteRegistration(id);
    }
}