
# Event Registration System

A backend application designed to manage event registrations efficiently. Built with Node.js, Express.js, and Sequelize, this system provides a robust foundation for handling events, attendees, and user management.

## Features

* **User Authentication:** Secure login and registration using JWT.
* **Event Management:** Create, update, and delete events.
* **Registration Handling:** Allow users to register for events.
* **Role-Based Access Control:** Differentiate access levels between admins and regular users.
* **Input Validation:** Ensure data integrity using Joi validators.

## Technologies Used

* **Backend:** Node.js, Express.js
* **Database:** Sequelize ORM (compatible with MySQL, PostgreSQL, etc.)
* **Authentication:** JSON Web Tokens (JWT)
* **Validation:** Joi
* **Environment Management:** dotenv

## Project Structure

```
event-registration-system/
├── config/             # Database configuration
├── controllers/        # Route handlers
├── models/             # Sequelize models
├── repositories/       # Data access layer
├── routes/             # API endpoints
├── services/           # Business logic
├── validators/         # Request validation schemas
├── .env                # Environment variables
├── index.js            # Entry point
└── package.json        # Project metadata and dependencies
```

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/houssamWaked/Event-Registration-System.git
   cd Event-Registration-System
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following:

   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=your_database_username
   DB_PASSWORD=your_database_password
   DB_NAME=your_database_name
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Configure the database:**

   Ensure your database is running and accessible with the credentials provided in the `.env` file.


5. **Run the application:**

   ```bash
   npm start
   ```

   The server will start on `http://localhost:3000`.

## API Endpoints

### Authentication

* `POST /api/auth/register` - Register a new user
* `POST /api/auth/login` - Login and receive a JWT

### Events

* `GET /api/events` - Retrieve all events
* `POST /api/events` - Create a new event
* `PUT /api/events/:id` - Update an event
* `DELETE /api/events/:id` - Delete an event

### Registrations

* `POST /api/events/:id/register` - Register for an event

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
