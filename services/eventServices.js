const EventRepository = require('../repositories/eventRepository');
const UserRepository = require('../repositories/userRepository');

class EventServices {
    static async createEvent(eventData) {
        const user = await UserRepository.getUserById(eventData.created_by)
        if (!user) {
            throw new Error(`User with ID ${eventData.createdById} not found`);
        }
        const role=await UserRepository.getUserRole(eventData.created_by)
        if (role !== 'admin') {
            throw new Error(`User with ID ${eventData.created_by} is not an admin`);
        }
        return await EventRepository.createEvent(eventData);
    }

    static async getAllEvents() {
        return await EventRepository.getAllEvents();
    }

    static async getEventById(eventId) {
        const event = await EventRepository.getEventById(eventId);
        if (!event) {
            throw new Error(`Event with ID ${eventId} not found`);
        }
        return event;
    }

    static async getEventByTitle(title) {
        const event = await EventRepository.getEventByTitle(title);
        if (!event) {
            throw new Error(`Event with title '${title}' not found`);
        }
        return event;
    }

    static async getEventByLocation(location) {
        const event= await EventRepository.getEventByLocation(location);
        if (!event) {
            throw new Error(`Event with location '${location}' not found`);
        }
        return event;
    }

    static async getEventByCreatedBy(createdById) {
        const user = await UserRepository.getUserById(createdById);
        if (!user) {
            throw new Error(`User with ID ${createdById} not found`);
        }
        return await EventRepository.getEventByCreatedBy(createdById);
    }

    static async updateEvent(eventId, updates) {
   
        if (!updates || typeof updates !== 'object') {
            throw new Error("No updates provided");
        }

      
        const event = await EventRepository.getEventById(eventId);
        if (!event) {
            throw new Error(`Event with ID ${eventId} not found`);
        }

        
        if (!updates.created_by) {
            throw new Error(`'created_by' is required to authorize update`);
        }

        const user = await UserRepository.getUserById(updates.created_by);
        if (!user) {
            throw new Error(`User with ID ${updates.created_by} not found`);
        }

        const role = await UserRepository.getUserRole(updates.created_by);
        if (role !== 'admin') {
            throw new Error(`User with ID ${updates.created_by} is not authorized to update events`);
        }

     
        return await EventRepository.updateEvent(eventId, updates);
    }


    static async deleteEvent(eventId) {
        
        const user = await EventRepository.getEventCreatorByEventId(eventId)
        if (user.role !== 'admin') {
            throw new Error(`User with ID ${created_by} is not an admin`);
        }
        return await EventRepository.deleteEvent(eventId);
    }
}

module.exports = EventServices;
