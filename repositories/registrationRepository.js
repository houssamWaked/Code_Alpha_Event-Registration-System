const sequelize=require('../config/sequelize');
const Registration = require('../models/registrationModel');
const { use } = require('../routes/registrationRoutes');


class RegistrationRepository {

    static handleError(e, method, transaction = null) {
        if (process.env.NODE_ENV === 'development') {
            console.error(`Database Error in ${method}:`, e);
        }
        if (transaction) {
            console.log(`Rolling back transaction due to error in ${method}`);
        }
        throw e; 
    }

    static async createRegistration(userId, eventId) {
        const t = await sequelize.transaction();
        try {
            const registration = await Registration.create({
                user_id: userId,
                event_id: eventId,
            }, { transaction: t });
    
                await t.commit();
                return registration;
            }catch (e) {
                await t.rollback();
                this.handleError(e, 'createRegistration', t);
            }
        }

    static async getAllRegistrations() {
        try {
            return await Registration.findAll();
        } catch (e) {
            this.handleError(e, 'getAllRegistrations');
        }
    }
static async getAllUserInEvent(eventId){
    try {
        const registrations = await Registration.findAll({ where: { event_id: eventId } });
        return registrations.map(registration => registration.user_id);
    } catch (e) {
        this.handleError(e, 'getAllUserInEvent');
    }
}
    static async getRegistrationByUserAndEvent(userId, eventId) {
        try {
            const registration = await Registration.findOne({ where: { user_id: userId, event_id: eventId } });
            return registration;
        } catch (e) {
            this.handleError(e, 'getRegistrationByUserAndEvent');
        }
    }
    static async getRegistrationById(id) {
        try {
            const registration = await Registration.findOne({ where: { id } });
            return registration;
        } catch (e) {
            this.handleError(e, 'getRegistrationById');
        }
    }
    static async getRegistrationByUserId(userId) {
        try {
            const registration = await Registration.findAll({ where: { user_id: userId } });
            return registration;
        } catch (e) {
            this.handleError(e, 'getRegistrationByUserId');
        }
    }
    static async getRegistrationByEventId(eventId) {
        try {
            const registration = await Registration.findAll({ where: { event_id: eventId } });
            return registration;
        } catch (e) {
            this.handleError(e, 'getRegistrationByEventId');
        }
    }
    static async deleteRegistration(id) {
        const t = await sequelize.transaction();
        try {
            const registration = await Registration.findOne({ where: { id } });
            if (!registration) {
                throw new Error(`Registration with id ${id} not found`);
            }
            await Registration.destroy({ where: { id } }, { transaction: t });
            await t.commit();
            return registration;
        } catch (e) {
            await t.rollback();
            this.handleError(e, 'deleteRegistration', t);
        }
    }
}


module.exports = RegistrationRepository;