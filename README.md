# Task Manager Application

This is a simple Task Manager application built with Flask for the backend and React for the frontend.

## Setup Instructions

### Backend (Flask)

1. Clone this repository to your local machine:

    ```bash
    git clone [<repository_url>](https://github.com/SiddKshir1234/VE3_TaskManager.git)
    ```

2. Navigate to the `backend` directory:

    ```bash
    cd backend
    ```

3. Create a virtual environment (optional but recommended):

    ```bash
    python -m venv venv
    ```

4. Activate the virtual environment:

    - On Windows:

        ```bash
        venv\Scripts\activate
        ```

    - On macOS and Linux:

        ```bash
        source venv/bin/activate
        ```

5. Install the required Python packages:

    ```bash
    pip install -r requirements.txt
    ```

6. Set up the SQLite database by running the following commands:

    ```bash
    flask db init
    flask db migrate -m "Initial migration"
    flask db upgrade
    ```

7. Start the Flask server:

    ```bash
    flask run
    ```

   The server should now be running on http://localhost:5000.

### Frontend (React)

1. Open a new terminal window/tab.

2. Navigate to the `frontend` directory:

    ```bash
    cd frontend
    ```

3. Install the required Node.js packages:

    ```bash
    npm install
    ```

4. Start the React development server:

    ```bash
    npm start
    ```

   The React application should now be running on http://localhost:3000.

## Connecting Backend and Frontend

The frontend React application is configured to send API requests to the Flask backend running on http://localhost:5000. This configuration is already set up in the React code.

## Running the Application

To use the application, make sure both the Flask backend server and React frontend development server are running simultaneously. Then, open your web browser and navigate to http://localhost:3000 to access the Task Manager application.


### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
>>>>>>> 45ddcd55d59b0c3d46b8fbb9f23f2a88003f0c53
