# BookWellCare - Doctor Appointments Booking and Medical Reports Management

BookWellCare is a web application built on the MERN stack (MongoDB, Express, React, Node.js) that enables users to book doctor appointments, save medical reports, and manage appointments efficiently. It features different screens for both users and doctors, utilizing Firebase authentication for OTP-based authentication, Multer for file uploads, Tailwind CSS for styling, and other technologies for a seamless user experience.

## Features

- **User Authentication:**
  - Firebase authentication for secure OTP-based authentication.
  - Separate login and registration for doctors and normal users.

- **Doctor Dashboard:**
  - View and manage appointments.
  - Check recent appointments and patient details.
  - Update doctor profile information.

- **User Dashboard:**
  - Find doctors based on location and specialization.
  - Book appointments with selected doctors.
  - Save and manage medical reports.

- **Additional Features:**
  - Responsive design for optimal user experience on various devices.
  - React Router for smooth navigation between different app screens.
  - Framer Motion for delightful animations.
  - Bcrypt for password hashing and security.
  - Cors for handling cross-origin resource sharing.
  - RazorPay integration for seamless payment processing.

## Tech Stack

- **Frontend:**
  - React
  - Material-UI (MUI)
  - Tailwind CSS
  - Framer Motion

- **Backend:**
  - Node.js
  - Express
  - MongoDB (Mongoose for ODM)

- **Authentication:**
  - Firebase Authentication

- **Other Libraries/Tools:**
  - Multer for file uploads
  - Bcrypt for password hashing
  - Cors for handling cross-origin requests
 
## Getting Started

1. Clone the repository.
   ```bash
   git clone https://github.com/ArnavAnand10/BookWellCare.git
2. Install dependencies for both the client and server.
   ```bash
   cd BookWellCare/client
   npm install

   cd ../server
   npm install
3. Set up Firebase Authentication and configure RazorPay.

4. Run the application.
   ```bash
   # Start the client
   cd ../client
   npm start

   # Start the server
   cd ../server
   npm start

