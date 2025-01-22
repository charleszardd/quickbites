Quickbites Web
This repository contains the combined backend (Laravel) and frontend (Vue.js) for the Quickbites web application. The backend handles the server-side logic, while the frontend is located in the src directory and manages the client-side interface.

Project Structure
Backend: Laravel files (e.g., app, bootstrap, routes, etc.)
Frontend: Vue.js project located in the src folder.
Getting Started
To run the project locally, follow these steps:

Prerequisites
Ensure you have the following installed on your machine:

PHP and Composer
Node.js and npm
A web server or Laravel's built-in development server
Steps to Run the Project
Clone the Repository

bash
Copy
Edit
git clone https://github.com/your-username/your-repo.git
cd your-repo
Run the Backend Open a terminal for the backend:

Install dependencies:
bash
Copy
Edit
composer install
Start the Laravel development server:
bash
Copy
Edit
php artisan serve
Run the Frontend Open a separate terminal for the frontend:

Navigate to the src folder:
bash
Copy
Edit
cd src
Install dependencies:
bash
Copy
Edit
npm install
Start the Vue development server:
bash
Copy
Edit
npm run dev
Accessing the Application
Once both servers are running:

Backend: By default, the Laravel server runs at http://127.0.0.1:8000.
Frontend: The Vue server runs at http://127.0.0.1:5173.
