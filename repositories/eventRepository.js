const { Op } = require('sequelize');
const sequelize = require('../config/sequelize');
const Event = require('../models/eventModel');

class EventRepository {
    static handleError(e, method, transaction = null) {
        if (process.env.NODE_ENV === 'development') {
            console.error(`Database Error in ${method}:`, e);
        }
        if (transaction) {
            console.log(`Rolling back transaction due to error in ${method}`);
        }
        throw e;
    }

    static async createEvent(eventData) {
        const t = await sequelize.transaction();
        try {
            // Check for duplicate title
            const existing = await Event.findOne({
                where: { title: eventData.title },
                transaction: t
            });
            if (existing) {
                throw new Error(`An event with the title '${eventData.title}' already exists.`);
            }

            // Check for location/time conflict
            const conflict = await Event.findOne({
                where: {
                    location: eventData.location,
                    [Op.or]: [
                        { start_time: { [Op.between]: [eventData.start_time, eventData.end_time] } },
                        { end_time: { [Op.between]: [eventData.start_time, eventData.end_time] } },
                        {
                            [Op.and]: [
                                { start_time: { [Op.lte]: eventData.start_time } },
                                { end_time: { [Op.gte]: eventData.end_time } }
                            ]
                        }
                    ]
                },
                transaction: t
            });
            if (conflict) {
                throw new Error(`The location '${eventData.location}' is already booked during the specified time.`);
            }

            const event = await Event.create(eventData, { transaction: t });
            await t.commit();
            return event;
        } catch (e) {
            await t.rollback();
            this.handleError(e, 'createEvent', t);
        }
    }

    static async getAllEvents(offset = 0, limit = 10) {
        try {
            return await Event.findAll({
                offset,
                limit,
                order: [['start_time', 'ASC']]
            });
        } catch (e) {
            this.handleError(e, 'getAllEvents');
        }
    }

    static async getEventById(id) {
        try {
            return await Event.findOne({ where: { event_id: id } });
        } catch (e) {
            this.handleError(e, 'getEventById');
        }
    }

    static async getEventByTitle(title) {
        try {
            return await Event.findOne({ where: { title } });
        } catch (e) {
            this.handleError(e, 'getEventByTitle');
        }
    }

    static async getEventByLocation(location) {
        try {
            return await Event.findAll({ where: { location } });
        } catch (e) {
            this.handleError(e, 'getEventByLocation');
        }
    }

    static async getEventByCreatedBy(created_by) {
        try {
            return await Event.findAll({ where: { created_by } });
        } catch (e) {
            this.handleError(e, 'getEventByCreatedBy');
        }
    }

    static async updateEvent(id, updates) {
        const t = await sequelize.transaction();
        try {
            const event = await Event.findByPk(id, { transaction: t });
            if (!event) {
                throw new Error(`Event with ID ${id} not found.`);
            }

            if (updates.title && updates.title !== event.title) {
                const existing = await Event.findOne({
                    where: {
                        title: updates.title,
                        event_id: { [Op.ne]: id }
                    },
                    transaction: t
                });
                if (existing) {
                    throw new Error(`Another event with the title '${updates.title}' already exists.`);
                }
            }

            if (updates.location && updates.start_time && updates.end_time) {
                const conflict = await Event.findOne({
                    where: {
                        location: updates.location,
                        event_id: { [Op.ne]: id },
                        [Op.or]: [
                            { start_time: { [Op.between]: [updates.start_time, updates.end_time] } },
                            { end_time: { [Op.between]: [updates.start_time, updates.end_time] } },
                            {
                                [Op.and]: [
                                    { start_time: { [Op.lte]: updates.start_time } },
                                    { end_time: { [Op.gte]: updates.end_time } }
                                ]
                            }
                        ]
                    },
                    transaction: t
                });
                if (conflict) {
                    throw new Error(`Location '${updates.location}' is already booked for the specified time.`);
                }
            }

            await event.update(updates, { transaction: t });
            await t.commit();
            return event;
        } catch (e) {
            await t.rollback();
            this.handleError(e, 'updateEvent', t);
        }
    }

    static async deleteEvent(id) {
        const t = await sequelize.transaction();
        try {
            const event = await Event.findByPk(id, { transaction: t });
            if (!event) {
                throw new Error(`Event with ID ${id} not found.`);
            }
            await event.destroy({ transaction: t });
            await t.commit();
            return event;
        } catch (e) {
            await t.rollback();
            this.handleError(e, 'deleteEvent', t);
        }
    }
}

module.exports = EventRepository;
