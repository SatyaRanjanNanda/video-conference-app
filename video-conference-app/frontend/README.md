# Frontend Video Conference App

This README provides instructions for setting up and running the frontend of the Video Conference Room web application.

## Features

- Users can create or join a room using a unique room ID or link.
- Real-time video and audio streaming using WebRTC.
- Optional text chat inside the room.
- Responsive design for various screen sizes.

## Prerequisites

- A modern web browser (Chrome, Firefox, etc.)
- Basic knowledge of HTML, CSS, and JavaScript.

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd video-conference-app/frontend
   ```

2. **Open the `index.html` file:**

   You can open the `index.html` file directly in your web browser. This file serves as the entry point for the frontend application.

3. **Run a local server (optional):**

   For a better development experience, you can run a local server. You can use any simple HTTP server, such as:

   - Using Python (if installed):
     ```bash
     python -m http.server
     ```
   - Using Node.js with `http-server`:
     ```bash
     npm install -g http-server
     http-server
     ```

4. **Access the application:**

   Open your web browser and navigate to `http://localhost:8000` (or the port specified by your local server) to access the application.

## Folder Structure

- `index.html`: Main HTML file for the frontend application.
- `styles/style.css`: CSS styles for the frontend application.
- `scripts/app.js`: JavaScript logic for handling user interactions and WebRTC connections.

## Dependencies

No additional dependencies are required for the frontend. However, ensure that the backend server is running to enable real-time communication.

## License

This project is licensed under the MIT License. See the LICENSE file for details.