const userRepository=require('../repositories/userRepository');
const bcrypt=require('bcrypt');

class UserServices {
    static async createUser(userData) {
        // Hashing the password before passing to the repository for creation
        userData.password_hash = await bcrypt.hash(userData.password_hash, 10);
        return userRepository.createUser(userData);
    }
    static getAllUsers() {
        return userRepository.getAllUsers();
    }
    static getUserByEmail(email) {
        return userRepository.getUserByEmail(email);
    }
    static getUserById(id) {
        return userRepository.getUserById(id);
    }
    static getUserByName(name) {
        return userRepository.getUserByName(name);
    }
    static async updateUser(id, updates) {
        const user = await userRepository.getUserById(id);
        if (!user) {
            throw new Error(`User with ID ${id} not found`);
        }
        if (!updates || typeof updates !== 'object') {
            throw new Error("No updates provided");
        }
    
        if (updates.password_hash) {
            updates.password_hash = await bcrypt.hash(
                updates.password_hash.toString(),
                10
            );
        }
    
        return userRepository.updateUser(id, updates);
    }
    
    
    static deleteUser(id) {
        return userRepository.deleteUser(id);
    }
  
}
module.exports=UserServices;