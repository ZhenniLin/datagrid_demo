# Generic DataGrid Demo

The application demonstrates the creation of a generic DataGrid component integrated with backend services, fulfilling all specified requirements.

## Features

### Frontend
- **React + Vite**: Used for a fast, modern frontend development experience.
- **React Material UI**: For designing a responsive and consistent user interface.
- **TailwindCSS**: For flexible and efficient styling.
- **React AG Grid**: The core library for building the DataGrid component, supporting advanced grid features.

### Backend
- **Express.js**: A RESTful API server handling data operations(CRUD operations).
- **MongoDB Atlas**: A cloud-hosted NoSQL database for storing structured data, ensuring scalability and availability.

## Key Functionalities

### Generic DataGrid Component:
- Supports dynamic structural data with any number of columns.
- Includes an "Actions" column by default with buttons for:
  - **View**: Redirects to a detailed page for the row.
  - **Update**: A popup dialog to update the row.
  - **Delete**: Deletes the corresponding row.
- Fully styled using React Material UI and TailwindCSS.

### Search Feature:
- Integrated with the backend API to search and display filtered entries.

### Filtering Feature:
- Allows filtering on a particular column with options:
  - **Contains**
  - **Equals**
  - **Starts with**
  - **Ends with**
  - **Is empty**

### Backend Service:
- RESTful API built using Express.js.
- Provides endpoints for CRUD operations and filtering/searching data.







