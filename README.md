# CRM Application

A modern CRM (Customer Relationship Management) application built with React, Redux Toolkit, and Material-UI.

## Features

- User Authentication
- Protected Routes
- Dashboard with Analytics Graph
- Product Management (CRUD operations)
- Modern Material-UI Design
- State Management with Redux Toolkit
- TypeScript Support

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
- Username: `kminchelle`
- Password: `0lelplR`

### Navigation

- Dashboard: View product analytics
- Products: Manage products (Create, Read, Update, Delete)

## API Integration

This application uses the DummyJSON API for demonstration purposes:
- Authentication: https://dummyjson.com/auth/login
- Products: https://dummyjson.com/products

## Technologies Used

- React 18
- Redux Toolkit
- React Router v6
- Material-UI v5
- TypeScript
- Recharts
- Axios

## Project Structure

```
src/
├── components/      # React components
├── store/          # Redux store and slices
├── types/          # TypeScript type definitions
└── App.tsx         # Main application component
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
