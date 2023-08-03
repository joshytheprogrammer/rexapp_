# RexApp

RexApp is a user-friendly web application aimed at simplifying the process of purchasing automobile spare parts in Nigeria. This project streamlines the traditional way of buying spare parts by providing an efficient and convenient digital platform for customers, auto-repairers, and parts suppliers.

## Features

- Easy user registration and login with JWT-based authentication.
- Seamless browsing and searching of automobile spare parts catalog.
- Secure payment gateway integration for smooth transactions.
- User-friendly and responsive interface for a delightful experience across devices.

## Technologies Used

- Node.js: A fast and efficient server-side platform.
- Express.js: A flexible and minimalist web application framework for Node.js.
- EJS (Embedded JavaScript): A template engine for rendering dynamic HTML content.
- MongoDB: A NoSQL database for storing and managing application data.
- Axios: A promise-based HTTP client for making API requests.
- Bcrypt: A library for password hashing and encryption.
- JSON Web Token (JWT): A token-based authentication mechanism.
- Cors: A middleware for enabling Cross-Origin Resource Sharing.
- Dotenv: A module for managing environment variables.
- Jest: A testing framework for unit testing.
- Nodemon: A utility for automatically restarting the server during development.
- Supertest: A library for testing HTTP requests and responses.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/joshytheprogrammer/rexapp.git
   ```

2. Install dependencies:

   ```bash
   cd rexapp
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root of the project and add the following:

   ```env
   PORT=3000
   ACCESS_TOKEN_SECRET=<your_access_token_secret>
   ADMIN_ACCESS_TOKEN_SECRET=<your_admin_access_token_secret>
   REFRESH_TOKEN_SECRET=<your_refresh_token_secret>
   MONGODB_URI=<your_mongodb_uri>
   ```

4. Start the server:

   ```bash
   npm start
   ```

5. Open your web browser and access the application at `http://localhost:3000`.

## Contributing

We welcome contributions from the community! If you find any issues or have suggestions for improvements, feel free to open a new issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

Happy spare parts shopping with RexApp!
