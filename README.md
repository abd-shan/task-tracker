# Task Management System

This project is a full-stack task management system consisting of:

1. **Backend API**: Built with Node.js, Express, and MongoDB
2. **Frontend Client**: React application with Redux Toolkit for state management

## Project Structure

```
task-management-system/
├── client/               # React frontend application
├── server/               # Node.js backend API
└── README.md             # This file
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation & Setup

### 1. Clone the repository:
```bash
git clone https://github.com/abd-shan/task-tracker.git
cd task-tracker
```

### 2. Set up Database

- create local DB with :
  - connections: tasks  
  - DB: task\n
- check database in src/config/database 
```js
//..prev

            const MONGODB_URI = 'mongodb://localhost:27017/task';

//rest..
```


### 3. Set up the backend:
```bash
cd server
npm install
echo "MONGODB_URI=mongodb://localhost:27017/taskdb" > .env
echo "PORT=3000" >> .env
echo "NODE_ENV=development" >> .env
```

### 4. Set up the frontend:
```bash
cd ../client
npm install
```

## Running the System

### Start the backend server:
```bash
cd server
npm run devServer
```

### Start the frontend client:
```bash
cd client
npm run devClient
```

## Access the Application

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:3000](http://localhost:3000)

## Project Structure Details

### Backend Structure (server)
```
server/
├── src/
│   ├── config/
│   │   └── database.js         # Database connection
│   ├── controllers/
│   │   └── taskController.js   # Task business logic
│   ├── middleware/
│   │   ├── cors.js             # CORS configuration
│   │   └── errorHandler.js     # Error handling
│   ├── models/
│   │   └── Task.js             # Task model
│   ├── routes/
│   │   └── taskRoutes.js       # API routes
│   └── app.js                  # Application setup
├── server.js                   # Server entry point
└── package.json                # Dependencies and scripts
```

### Frontend Structure (client)
```
client/
├── public/
├── src/
│   ├── components/             # React components
│   ├── services/               # Redux slices and API
│   ├── pages/                  # pages 
│   ├── App.js                  # Main component
│   └── index.js                # Entry point
├── package.json                # Dependencies and scripts
└── README.md                   # Client guide
```

## API Endpoints

### Tasks

| Method | Path       | Description                |
|--------|------------|----------------------------|
| GET    | /tasks    | Get all tasks             |
| POST   | /tasks    | Create a new task         |
| PATCH  | /tasks/:id| Mark task as completed    |
| DELETE | /tasks/:id | Delete a task             |

### Example Requests & Responses

**Create Task:**
```http
POST /tasks
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the task management app",
  "dueDate": "2024-12-31"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "_id": "...",
    "title": "Complete project",
    "description": "Finish the task management app",
    "dueDate": "2024-12-31T00:00:00.000Z",
    "status": "pending",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

## Data Structure

### Task Model
```javascript
{
  title: String,        // (required, max 100 chars)
  description: String,  // (max 500 chars)
  dueDate: Date,        
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending'
  },
  createdAt: Date,      // (auto-generated)
  updatedAt: Date,      // (auto-updated)
}
```

## Key Features

### Backend
- Clean MVC architecture
- Comprehensive error handling
- Data validation
- Secure CORS configuration
- MongoDB injection protection
- Environment variables usage

### Frontend
- Responsive design
- State management with Redux Toolkit
- Intuitive UI with confirmation dialogs
- Task filtering by status (pending/completed)
- Error handling and loading states
- Data formatting and filtering

## Application Architecture

### Server System
- **MVC Pattern**: Model-View-Controller architecture
- **RESTful Design**: API follows best practices
- **Modular**: Maintainable, component-based structure
- **Scalable**: Designed for easy feature additions

### Client System
- **Component Architecture**: Isolated, reusable components
- **Centralized State**: Using Redux Toolkit
- **Async Operations**: Using createAsyncThunk
- **Interactive Design**: Smooth user experience


## Troubleshooting

- **Can't connect to server**: Verify server is running on correct port
- **MongoDB errors**: Ensure MongoDB is running and connection URI is correct
- **CORS errors**: Verify CORS configuration in server
- **Dependency errors**: Run `npm install` in both folders


