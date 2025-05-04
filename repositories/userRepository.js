const  sequelize = require('../config/sequelize');
const User = require('../models/userModel');

class UserRepository {
    static handleError(e, method, transaction = null) {
        if (process.env.NODE_ENV === 'development') {
            console.error(`Database Error in ${method}:`, e);
        }
        if (transaction) {
            console.log(`Rolling back transaction due to error in ${method}`);
        }
        throw e; // Throw the original error to preserve stack trace
    }

    static async createUser(userData) {
        const t = await sequelize.transaction();
        try {
            const existingUser =await this.getUserByEmail(userData.email, { transaction: t  });
            if (existingUser) {
                throw new Error(`User with email ${userData.email} already exists`);
            }
            const existingUserByName = await this.getUserByName(userData.name, { transaction: t });
            if (existingUserByName) {
                throw new Error(`User with name ${userData.name} already exists`);
            }

            const user = await User.create({
                name: userData.name,
                email: userData.email,
                password_hash: userData.password_hash,
                role:userData.role || 'user',
            }, { transaction: t });

            await t.commit();
            return user;
        } catch (e) {
            await t.rollback();
            this.handleError(e, 'createUser', t);
        }
    }

    static async getAllUsers() {
        // Read-only operation doesn't need transaction
        try {
            return await User.findAll();
        } catch (e) {
            this.handleError(e, 'getAllUsers');
        }
    }

    static async getUserByEmail(email) {
        // Read-only operation doesn't need transaction
        try {
            const user = await User.findOne({ where: { email } });
         
            return user;
        } catch (e) {
            this.handleError(e, 'getUserByEmail');
        }
    }

    static async getUserById(id) {
        // Read-only operation doesn't need transaction
        try {
            const user = await User.findByPk(id);
            if (!user) {
                throw new Error(`User with ID ${id} not found`);
            }
            return user;
        } catch (e) {
            this.handleError(e, 'getUserById');
        }
    }
    
    static async getUserByName(name) {
        // Read-only operation doesn't need transaction
        try {
            const user = await User.findOne({ where: { name } });

            return user;
        } catch (e) {
            this.handleError(e, 'getUserByName');
        }
    }

    static async updateUser(id, updates) {
        const t = await sequelize.transaction();
        try {
            const user = await User.findByPk(id, { transaction: t });
            if (!user) {
                const error = new Error("User does not exist");
                error.statusCode = 404;
                throw error;
            }
    
            if (!updates || Object.keys(updates).length === 0) {
                const error = new Error("No updates provided");
                error.statusCode = 400;
                throw error;
            }
    
            if (updates.email && updates.email !== user.email) {
                const existingUser = await this.getUserByEmail(updates.email);
                if (existingUser && existingUser.id !== id) {
                    throw new Error(`User with email ${updates.email} already exists`);
                }
            }
    
            if (updates.name && updates.name !== user.name) {
                const existingUserByName = await this.getUserByName(updates.name);
                if (existingUserByName && existingUserByName.id !== id) {
                    throw new Error(`User with name ${updates.name} already exists`);
                }
            }
    
    
            const updatedUser = await user.update(updates, { transaction: t });
    
            await t.commit();
            return updatedUser;
        } catch (e) {
            await t.rollback();
            this.handleError(e, 'updateUser', t);
        }
    }
    
    
    

    static async deleteUser(id) {
        const t = await sequelize.transaction();
        try {
            const user = await User.findByPk(id, { transaction: t });
            if (!user) {
                throw new Error(`User with ID ${id} not found`);
            }
            await user.destroy({ transaction: t });
            await t.commit();
            return true;
        } catch (e) {
            await t.rollback();
            this.handleError(e, 'deleteUser', t);
        }
    }
}

module.exports = UserRepository;