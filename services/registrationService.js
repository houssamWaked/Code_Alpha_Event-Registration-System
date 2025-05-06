const registrationRepository=require('../repositories/registrationRepository');
const eventRepository=require('../repositories/eventRepository');
const userRepository=require('../repositories/userRepository');
const e = require('express');

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
    
        // ✅ Check for duplicate registration
        const existingRegistration = await registrationRepository.getRegistrationByUserAndEvent(userId, eventId);
        if (existingRegistration) {
            throw new Error(`User ${userId} is already registered for event ${eventId}`);
        }
    
        // ✅ Check event capacity
        if (event.enrollment >= event.capacity) {
            throw new Error(`Event with ID ${eventId} is already full`);
        }
    
        // ✅ Increment enrollment count
        event.enrollment += 1;
        await eventRepository.updateEvent(eventId, { enrollment: event.enrollment });
    
        // ✅ Create registration
        return await registrationRepository.createRegistration(userId, eventId);
    }
    
    static async getAllUserInEvent(eventId) {
        const event = await eventRepository.getEventById(eventId);
        if (!event) {
            throw new Error(`Event with ID ${eventId} not found`);
        }
        return await registrationRepository.getAllUserInEvent(eventId);
    }
    static async getRegistrationByUserAndEvent(userId, eventId) {
        const user = await userRepository.getUserById(userId);
        if (!user) {
            throw new Error(`User with ID ${userId} not found`);
        }
    
        const event = await eventRepository.getEventById(eventId);
        if (!event) {
            throw new Error(`Event with ID ${eventId} not found`);
        }
    
        return await registrationRepository.getRegistrationByUserAndEvent(userId, eventId);
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
module.exports = RegistrationService;