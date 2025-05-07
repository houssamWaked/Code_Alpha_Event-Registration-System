const userRepository = require('../repositories/userRepository');
const { generateToken } = require('../utils/jwt');
const bcrypt = require('bcrypt');

class UserServices {
  static async createUser(userData) {
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
      updates.password_hash = await bcrypt.hash(updates.password_hash.toString(), 10);
    }

    return userRepository.updateUser(id, updates);
  }

  static async deleteUser(id) {
    return userRepository.deleteUser(id);
  }

  static async loginUser({ email, password }) {
    const user = await userRepository.getUserByEmail(email);
    if (!user) throw new Error('User not found');
  
    const isMatch = await bcrypt.compare(password, user.password_hash); // compare plain to hashed
    if (!isMatch) throw new Error('Invalid credentials');
  
    const token = generateToken({ id: user.id, role: user.role });
    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}  

module.exports = UserServices;
