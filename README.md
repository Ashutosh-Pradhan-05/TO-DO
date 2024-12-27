# To-Do List Application (SPA)

 To-Do App Banner
 ----------------

 
![to-do](https://github.com/user-attachments/assets/0818eddf-3cdc-4330-9652-5a7f3f194f89)

## Table of Contents
____________________

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Contact](#contact)

## Overview
___________

The To-Do List Application is a Single Page Application (SPA) designed to help users manage their tasks efficiently. Built with a modern tech stack, it offers user registration, authentication, and CRUD (Create, Read, Update, Delete) operations for managing appointments. The application ensures a seamless user experience with dynamic content loading and real-time updates without page reloads.

## Features
___________

- **User Registration & Authentication**
  --------------------------------------
  - Secure user sign-up and login.
  - Password protection and user validation.
- **Dashboard**
  -------------
  - Personalized dashboard displaying user-specific appointments.
  - Real-time updates on appointment status.
- **Appointment Management**
  --------------------------
  - Create, view, edit, and delete appointments.
  - Detailed appointment information including title, description, date, and time.
- **Responsive Design**
  ---------------------
  - Mobile-friendly interface using Bootstrap.
- **Persistent Data Storage**
  ---------------------------
  - MongoDB integration for reliable data management.
- **Interactive UI**
  ------------------
  - Dynamic content loading with jQuery and AJAX.
- **Session Management**
  ----------------------
  - User sessions managed through cookies.

## Tech Stack
_____________

- **Frontend**
  ------------
  - HTML
  - CSS
  - Bootstrap
  - JavaScript (jQuery)
    
- **Backend**
  -----------
  - Node.js
  - Express.js
  - MongoDB
    
- **Other Tools**
  ---------------
  - Bootstrap Icons
  - jQuery Cookie



## Installation
_______________

- **Node.js**: Ensure you have Node.js installed. You can download it [here](https://nodejs.org/).
- **MongoDB**: Install and run MongoDB. Instructions can be found [here](https://www.mongodb.com/docs/manual/installation/).


## Usage
________

1. **Register a New Account**
   --------------------------
   - Click on the **Create Account** button.
   - Fill in the registration form with your details.
   - Ensure the User ID is unique and the mobile number is exactly 10 digits.
   - Submit to create your account.

2. **Login**
   ---------
   - Click on the **Signin** button.
   - Enter your User ID and Password.
   - Upon successful login, you'll be redirected to your dashboard.

3. **Manage Appointments**
   -----------------------
   - **Add Appointment**: Click on the **Add** button to create a new appointment.
   - **Edit Appointment**: Click the **Edit** button on an existing appointment to modify its details.
   - **Delete Appointment**: Click the **Delete** button to remove an appointment.

4. **Sign Out**
   ------------
   - Click on the **Signout** button to end your session.

## API Endpoints
________________

### Users
_________
- **GET /users**
  --------------

  Retrieve all registered users.

  **Response:**

  ```json
  [
    {
      "UserId": "user123",
      "UserName": "John Doe",
      "Password": "hashedpassword",
      "Email": "john@example.com",
      "Mobile": "1234567890"
    }
  ]
  ```

- **POST /register-user**
  -----------------------
  Register a new user.

  **Request Body:**
  -----------------

  ```json
  {
    "UserId": "user123",
    "UserName": "John Doe",
    "Password": "securepassword",
    "Email": "john@example.com",
    "Mobile": "1234567890"
  }
  ```

### Appointments
________________

- **GET /get-appointments/:userid**
  ---------------------------------
  Retrieve all appointments for a specific user.

  **Parameters:**
  ---------------
  - `userid`: User ID.

  **Response:**
  -------------

  ```json
  [
    {
      "AppointmentId": 1,
      "Title": "Doctor's Appointment",
      "Description": "Annual check-up",
      "Date": "2025-05-20T10:00:00Z",
      "Time": "2025-05-20T10:00:00Z",
      "UserId": "user123"
    }
  ]
  ```

- **GET /get-appointment/:id**
  ----------------------------
  Retrieve a specific appointment by ID.

  **Parameters:**
  ---------------
  - `id`: Appointment ID.

  **Response:**
  -------------
  ```json
  {
    "AppointmentId": 1,
    "Title": "Doctor's Appointment",
    "Description": "Annual check-up",
    "Date": "2025-05-20T10:00:00Z",
    "Time": "2025-05-20T10:00:00Z",
    "UserId": "user123"
  }
  ```

- **POST /add-appointment**
  -------------------------
  Add a new appointment.

  **Request Body:**
  -----------------

  ```json
  {
    "AppointmentId": 1,
    "Title": "Doctor's Appointment",
    "Description": "Annual check-up",
    "Date": "2025-05-20T10:00",
    "Time": "2025-05-20T10:00",
    "UserId": "user123"
  }
  ```

- **PUT /edit-appointment/:id**
  -----------------------------
  Edit an existing appointment.

  **Parameters:**
  ---------------
  - `id`: Appointment ID.

  **Request Body:**
  -----------------
  ```json
  {
    "AppointmentId": 1,
    "Title": "Dentist Appointment",
    "Description": "Teeth cleaning",
    "Date": "2025-06-15T09:00",
    "Time": "2025-06-15T09:00",
    "UserId": "user123"
  }
  ```

- **DELETE /delete-appointment/:id**
  ----------------------------------
  Delete an appointment.

  **Parameters:**
  ---------------
  - `id`: Appointment ID.

## Project Structure
____________________

todo-spa/
├── node_modules/
├── public/
│   ├── images/
│   │   ├── to-do.jpg
│   │   └── 1Profile-pic.jpg
│   ├── index.html
│   ├── home.html
│   ├── user-login.html
│   ├── user-register.html
│   ├── user-dashboard.html
│   ├── add-appointment.html
│   ├── edit-appointment.html
│   └── delete-appointment.html
├── src/
│   ├── todo.css
│   └── todo.js
├── server/
│   └── api.js
├── package.json
├── package-lock.json
└── README.md


- **public/**: Contains all static HTML files and images.
- **src/**: Contains CSS and JavaScript files for frontend functionalities.
- **server/api.js**: Backend server using Express.js.
- **package.json**: Lists project dependencies and scripts.
- **README.md**: Project documentation.

## Contact
__________

Developed by **Ashutosh Pradhan**.
- **Email**: [contactwithashuind@gmail.com](mailto:contactwithashuind@gmail.com)
- **GitHub**: [https://github.com/Ashutosh-Pradhan-05](https://github.com/Ashutosh-Pradhan-05)
- **LinkedIn**: [https://www.linkedin.com/in/ashutosh-pradhan05](https://www.linkedin.com/in/ashutosh-pradhan05)
- **Twitter**: [https://x.com/Ashutoshtwitind](https://x.com/Ashutoshtwitind)

Feel free to reach out for any queries or support!

**Note**: Ensure MongoDB is running before starting the server. For any issues or bugs, please open an issue in the repository.
