# Digital Guest Onboarding System

This project is a **Digital Guest Onboarding System** where admins can manage hotel registrations, guest details, and guests can fill out their information using a unique QR code. 

## Features

### Main Admin Panel
- **Add a new hotel**: 
  - Input fields: Hotel name, logo (file upload), and address.
- **Display all registered hotels**: 
  - Columns: Hotel Name, Address, Logo, and Actions (View and Edit).
- **Generate a unique QR code for each hotel**:
  - When scanned, the QR code opens a hotel-specific landing page.

### Guest Landing Page
- Displays hotel details (name, logo, address).
- Guests fill out a form with the following details:
  - Full Name
  - Mobile Number
  - Address
  - Purpose of Visit (Dropdown: Business, Personal, Tourist)
  - Stay Dates (From and To)
  - Email ID
  - ID Proof Number
- After form submission, the guest is redirected to a "Thank You" page.
- Guest details are saved in the database.

### Guest Admin Panel
- **Show all guest details** for their respective hotel in a table.
- **Actions**: 
  - **Edit**: Update guest information.
  - **View**: Display guest details with a print option.

## Technical Requirements

- **Backend**: 
  - Node.js with Express.js for routing.
  - MongoDB (or any SQL database) for storing data.
- **Frontend**: 
  - Use EJS or React.js for rendering pages.
  - Use Bootstrap (or any CSS framework) for responsive design.
- **QR Code Generation**: 
  - Use the `qrcode` library in Node.js.
- **Form Validation**: 
  - Client-side and server-side validation for form fields.
- **Printing**: 
  - Add a print button using JavaScript's `window.print()` method.
- **Authentication**: 
  - Simple login for Main Admin and Guest Admin panels.

## Installation

1. **Clone the repository**:
   ```bash
   https://github.com/anisahu99/Digital_Onboarding_System.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd digital-guest-onboarding-system
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Set up the database**:
   - Make sure to have MongoDB (or your chosen database) running.
   - Update the database connection in the `.env` file.

5. **Start the development server**:
   ```bash
   npm start
   ```

6. Open the application in your browser at:
   ```
   http://localhost:3000
   ```

## Admin Login Credentials

- **Main Admin**:
  - **Username**: admingupta@1234
  - **Password**: 12345678
- **Guest Admin**:
  - **Username**: guestgupta@gmail.com
  - **Password**: 12345678

## Conclusion

This Digital Guest Onboarding System allows efficient hotel and guest management, with a seamless guest registration process through QR codes and detailed admin panels for hotel and guest management.
