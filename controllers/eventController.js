const eventService = require('../services/eventServices');

class EventController {
    static async createEvent(req, res) {
        try {
            const eventData = req.body;
            const event = await eventService.createEvent(eventData);
            res.status(201).json(event);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getAllEvents(req, res) {
        try {
            const events = await eventService.getAllEvents();
            res.status(200).json(events);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getEventById(req, res) {
        try {
            const id = req.params.id;
            const event = await eventService.getEventById(id);
            res.status(200).json(event);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    static async getEventByTitle(req, res) {
        try {
            const { title } = req.params;
            const event = await eventService.getEventByTitle(title);
            res.status(200).json(event);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    static async getEventByLocation(req, res) {
        try {
            const { location } = req.params;
            const events = await eventService.getEventByLocation(location);
            res.status(200).json(events);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    static async getEventByCreatedBy(req, res) {
        try {
            const { created_by } = req.params;
            const events = await eventService.getEventByCreatedBy(created_by);
            res.status(200).json(events);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    static async updateEvent(req, res) {
        try {
            const id = req.params.id;
            const updates = req.body;
            const updatedEvent = await eventService.updateEvent(id, updates);
            res.status(200).json(updatedEvent);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async deleteEvent(req, res) {
        try {
            const id = req.params.id;
            await eventService.deleteEvent(id);
            res.status(204).send(); // No content
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
}

module.exports = EventController;
