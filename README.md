# Social-Network-API

## Description
This is a RESTful API that allows users to create and interact with thoughts and reactions on a social network platform. The API is built using Node.js, Express, and MongoDB, and utilizes the Mongoose library for object modeling.

## Demo
To see how the api works using Insomnia click on the link.

https://drive.google.com/file/d/1c6qbWoAcP0dRaFmSwzIrT_k6bYN9rezd/view

## Installation
1. Clone the repository

2. Install the dependencies by running ``npm install``

3. Start the server by running ``npm start``

## Usage
The API can be tested using a tool like Insomnia. Requests and responses are in JSON format.
The API has the following endpoints:

### Users
- GET /api/users: returns all users
- GET /api/users/:id: returns a specific user by ID
- POST /api/users: creates a new user
- PUT /api/users/:id: updates a user by ID
- DELETE /api/users/:id: deletes a user by ID

### Thoughts
- GET /api/thoughts: returns all thoughts
- GET /api/thoughts/:id: returns a specific thought by ID
- POST /api/thoughts: creates a new thought for a specific user
- PUT /api/thoughts/:id: updates a thought by ID
- DELETE /api/thoughts/:id: deletes a thought by ID

### Friends
- POST /api/users/:id/friends: adds a friend to a user by ID
- DELETE /api/users/:id/friends/:reactionId: deletes a friend from a user, by user ID and friend ID

### Reactions
- POST /api/thoughts/:id/reactions: adds a reaction to a thought by ID
- DELETE /api/thoughts/:id/reactions/:reactionId: deletes a reaction from a thought, by thought ID and reaction ID
