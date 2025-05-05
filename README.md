# Project Setup Instructions

This document provides step-by-step instructions to set up and run the project, which includes both a frontend and a backend.

## Prerequisites

* **Git:** You need Git installed to clone the repository.
* **Node.js:** This project requires Node.js version **v20**. You can check your Node.js version by running `node -v` in your terminal. If you don't have Node.js v20, you can install it using [Node Version Manager (nvm)](https://github.com/nvm-sh/nvm) (recommended) or by downloading it from the official Node.js website.
* **Yarn:** This project uses Yarn as the package manager. If you don't have Yarn installed, you can install it globally using npm: `npm install -g yarn`

## Initial Setup

1.  **Clone the Repository:**
    * Open your terminal and navigate to the directory where you want to clone the project.
    * Run the following command:
        ```bash
        git clone <your-repository-url>
        ```
        (Replace `<your-repository-url>` with the actual URL of your Git repository.)

## Backend Setup

1.  **Navigate to the Backend Directory:**
    * Open your terminal and navigate to the `backend` folder:
        ```bash
        cd backend
        ```

2.  **Copy Environment Variables File:**
    * Copy the example environment variables file to create your local configuration:
        ```bash
        cp .env.example .env
        ```

3.  **Configure Environment Variables:**
    * Open the `.env` file in a text editor and modify the variables to match your local environment.
    * **Set up the `GOOGLE_API_KEY`:** Add your Google API key to the `.env` file. This key is required for any Google Maps or other Google services used by the application.
        ```
        GOOGLE_API_KEY=YOUR_API_KEY
        # Example
        # DB_HOST=localhost
        # DB_USER=your_db_user
        # DB_PASS=your_db_password
        # DB_NAME=your_db_name
        ```
    * Make sure to configure all other necessary environment variables (e.g., database connection settings, other API keys).

4.  **Install Dependencies:**
    * Install the backend dependencies using Yarn:
        ```bash
        yarn install
        ```

5.  **Run the Backend Development Server:**
    * Start the backend development server:
        ```bash
        yarn dev
        ```
    * The backend server should now be running, usually at `http://localhost:<port>`. Check the console output for the exact URL and port.

## Frontend Setup

1.  **Navigate to the Frontend Directory:**
    * Open a **new** terminal window (or tab) and navigate to the `frontend` folder:
        ```bash
        cd frontend
        ```

2.  **Copy Environment Variables File:**
    * Copy the example environment variables file to create your local configuration:
        ```bash
        cp .env.example .env
        ```

3.  **Configure Environment Variables:**
    * Open the `.env` file in a text editor and modify the variables to match your local environment.
    * Make sure the API endpoint points to the backend server you started in the previous section.
        ```
        # Example:
        API_URL=http://localhost:8000  # Or the correct URL of your backend
        ```

4.  **Install Dependencies:**
    * Install the frontend dependencies using Yarn:
        ```bash
        yarn install
        ```

5.  **Run the Frontend Development Server:**
    * Start the frontend development server:
        ```bash
        yarn dev
        ```
    * The frontend application should now be running, usually at `http://localhost:<port>`. Check the console output for the exact URL and port.

## Accessing the Application

Once both the frontend and backend servers are running, you can access the application through your web browser at the URL provided by the frontend development server.
# heal.ai
