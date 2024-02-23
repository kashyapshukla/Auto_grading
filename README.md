# Auto_grading


  To set up a project that contains both frontend (built with React) and backend (built with Express), follow these steps:

1. Initialize Project Structure:
   - Create a new directory for your project.
   - Inside the project directory, initialize a new Node.js project using npm or yarn:
     ```
     npm init -y
     ```
     or
     ```
     yarn init -y
     ```

2. Set up Backend (Express):
   - Install Express and other necessary dependencies:
     ```
     npm install express
     ```
   - Create a new directory for your backend code (e.g., `backend`) and navigate into it.
   - Inside the `backend` directory, create a new file for your Express server (e.g., `app.js`).
   - Set up your Express server code in `app.js`, including defining routes, handling requests, etc.

3. **Set up Frontend (React):**
   - Install create-react-app globally (if not already installed):
     ```
     npm install -g create-react-app
     ```
   - Create a new directory for your frontend code (e.g., `frontend`) and navigate into it.
   - Generate a new React app using create-react-app:
     ```
     npx create-react-app .
     ```
   - This will create a new React app inside the `frontend` directory.


4. Run the Project:
   - In separate terminal windows, navigate to both the `backend` and `frontend` directories.
   - Start the Express server by running:
     ```
     node app.js
     ```
   - Start the React development server by running:
     ```
     npm start
     ```
     or
     ```
     yarn start
     ```
   - Your React app should open automatically in your default web browser.

