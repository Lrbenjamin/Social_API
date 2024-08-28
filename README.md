# Social Network API

## Description

This project is a backend API for a social networking application where users can share their thoughts, react to friends' thoughts, and create a friend list. It utilizes Express.js for routing, MongoDB with Mongoose for data management, and is built using Node.js. The API allows for the creation, updating, deletion, and retrieval of users, thoughts, and reactions, as well as managing friend lists. Walkthrough link: https://youtu.be/If5paFsaB7U

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation

To install and set up this project on your local machine:

``bash
1. Clone the repository:
   git clone https://github.com/Lrbenjamin/Social_API.git

2. Navigate to the project directory:
   cd Social_Network_API

3. Install the required dependencies:
   npm install

4. Set up your MongoDB connection string in a `.env` file:
   MONGODB_URI=mongodb://localhost/socialNetworkDB
   PORT=3001
``

## Usage

To start the application:

``bash
1. Ensure MongoDB is running on your machine.

2. Start the server:
   npm start

3. For development, you can use Nodemon to automatically restart the server when changes are made:
   npm run dev
``

To test the API, you can use Insomnia, Postman, or cURL to interact with the endpoints.

## API Endpoints

### Users

- **GET** `/api/users` - Retrieve all users
- **GET** `/api/users/:userId` - Retrieve a single user by ID
- **POST** `/api/users` - Create a new user
  - Example body:
  ``bash
  {
    "username": "newUser",
    "email": "newUser@example.com"
  }
  ``
- **PUT** `/api/users/:userId` - Update a user by ID
  - Example body:
  ``bash
  {
    "username": "updatedUser"
  }
  ``
- **DELETE** `/api/users/:userId` - Delete a user by ID

- **POST** `/api/users/:userId/friends/:friendId` - Add a friend to a user's friend list

- **DELETE** `/api/users/:userId/friends/:friendId` - Remove a friend from a user's friend list

### Thoughts

- **GET** `/api/thoughts` - Retrieve all thoughts
- **GET** `/api/thoughts/:thoughtId` - Retrieve a single thought by ID
- **POST** `/api/thoughts` - Create a new thought
  - Example body:
  ``bash
  {
    "thoughtText": "Here's a cool thought",
    "username": "userName",
    "userId": "userId"
  }
  ``
- **PUT** `/api/thoughts/:thoughtId` - Update a thought by ID
  - Example body:
  ``bash
  {
    "thoughtText": "Updated thought text"
  }
  ``
- **DELETE** `/api/thoughts/:thoughtId` - Delete a thought by ID

- **POST** `/api/thoughts/:thoughtId/reactions` - Add a reaction to a thought
  - Example body:
  ``bash
  {
    "reactionBody": "This is a reaction",
    "username": "userName"
  }
  ``

- **DELETE** `/api/thoughts/:thoughtId/reactions/:reactionId` - Remove a reaction from a thought

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Nodemon (for development)

## License

This project is licensed under the MIT License.

## Tests

You can run the tests using the following command:

``bash
npm test
``

## Questions

If you have any questions, feel free to reach out:

- GitHub: [Lrbenjamin](https://github.com/Lrbenjamin/Social_API)
- Email: lrbenjamin22@gmail.com
