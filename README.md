# CRM Application

A modern CRM (Customer Relationship Management) application built with React, Redux Toolkit, and Material-UI, featuring comprehensive task management and calendar functionality.

## Features

- Task Management System
  - Create, edit, and delete tasks
  - Multiple view options (Grid, List, Calendar)
  - Task prioritization (High, Medium, Low)
  - Task status tracking (Pending, In Progress, Completed)
  - Task categorization (Follow-up, Meeting, Call, Email, Other)
  - Due date management
  - Task assignment

- Interactive Calendar
  - Month view with task display
  - Direct task creation from calendar
  - Color-coded task indicators
  - Task filtering and sorting
  - Responsive design

- Dashboard with Analytics
  - Task analytics and metrics
  - Product performance graphs
  - Modern Material-UI design

- User Authentication
  - Protected routes
  - Secure login system

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd crm-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Usage

### Login

Use the following credentials to log in:
- Username: `emilys`
- Password: `emilyspass`

### Task Management

1. **Creating Tasks**
   - Click the "New Task" button
   - Fill in task details (title, description, due date, priority, etc.)
   - Click "Create Task" to save

2. **View Options**
   - Grid View: Card-based layout with task details
   - List View: Tabular format with sorting and filtering
   - Calendar View: Month-based calendar with task indicators

3. **Managing Tasks**
   - Click on any task to view/edit details
   - Use the menu (⋮) to edit or delete tasks
   - Filter tasks by priority, status, or type
   - Search tasks by title or description

4. **Calendar Features**
   - Navigate between months
   - Click on a date to add a task
   - View tasks for specific dates
   - Color-coded task indicators based on priority

### Navigation

- Dashboard: View analytics and task metrics
- Tasks: Access task management system
- Products: Manage products (CRUD operations)

## API Integration

This application uses the DummyJSON API for demonstration purposes:
- Authentication: https://dummyjson.com/auth/login
- Products: https://dummyjson.com/products
- Tasks: Local state management with Redux

## Technologies Used

- React 18
- Redux Toolkit
- React Router v6
- Material-UI v5
- TypeScript
- Recharts
- Axios
- date-fns (Date manipulation)

## Project Structure

```
src/
├── components/          # React components
│   ├── Tasks/          # Task management components
│   ├── Calendar/       # Calendar components
│   └── Products/       # Product management components
├── store/              # Redux store and slices
│   └── slices/         # Redux slices for state management
├── types/              # TypeScript type definitions
├── pages/              # Page components
└── App.tsx             # Main application component
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
