# Video Conference App Backend

This README provides instructions for setting up and running the backend of the Video Conference Room web application.

## Prerequisites

- Node.js (version 14 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd video-conference-app/backend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

## Running the Server

To start the backend server, use the following command:

```bash
node server.js
```

The server will run on `http://localhost:3000` by default.

## Environment Variables

You may need to set up environment variables for database connection and other configurations. Create a `.env` file in the backend directory and add the necessary variables.

## Database Setup (Optional)

If you are using a database like SQLite or MongoDB, ensure that you have it installed and configured. Update the `db.js` file with your database connection details.

## Socket.io Configuration

The backend uses Socket.io for real-time communication. Ensure that the frontend is configured to connect to the same server URL.

## Testing

You can test the backend functionality using tools like Postman or by connecting the frontend application.

## Troubleshooting

If you encounter any issues, check the console for error messages and ensure that all dependencies are correctly installed.

## License

This project is licensed under the MIT License.