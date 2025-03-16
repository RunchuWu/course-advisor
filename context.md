# AI-Powered Course Advisor for Duke University

## Project Overview
This project creates a web application that helps Duke University students select courses through AI-powered recommendations. The system will analyze student preferences and provide personalized course suggestions.

## Tech Stack
- **Frontend**: React
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **AI Integration**: DeepSeek API
- **Potential Integration**: DukeHub (pending API availability)

## Development Workflow

### 1. Project Setup
**Objective**: Create the basic project structure with frontend and backend components.

**Tasks**:
- Create a main project folder (`course-advisor`)
- Set up React frontend in a `frontend` subfolder
- Configure Node.js/Express backend in a `backend` subfolder
- Initialize Git repository for version control
- Install necessary dependencies:
  - Backend: `express`, `cors`, `dotenv`
  - Frontend: React dependencies

**Configuration Notes**:
- Backend server: Port 5000
- Frontend development server: Port 3000

### 2. Frontend Development
**Objective**: Build a user-friendly interface for students to input preferences and view recommendations.

**Components to Create**:
- User input form (major, interests, course preferences)
- Chat-style interface for displaying AI responses
- Navigation and layout components

**Implementation Tips**:
- Use React state management for form inputs
- Create reusable components for maintainability
- Focus on functionality first, then enhance styling

### 3. Backend Development
**Objective**: Create API endpoints to handle requests and communicate with the AI service.

**Key Endpoints**:
- `/api/query`: Process user questions and course preferences
- `/login` and `/register`: Basic user authentication (optional)

**Implementation Tips**:
- Store API keys in `.env` file (e.g., `DEEPSEEK_API_KEY=your-key`)
- Test endpoints with Postman before frontend integration
- Implement proper error handling

### 4. Database Integration
**Objective**: Set up MongoDB database to store course information and user preferences.

**Schema Design**:
- `courses` table: `id`, `name`, `credits`, etc.
- `preferences` table: `user_id`, `major`, `interests`, etc.

**Implementation Steps**:
- Install MongoDB client (`pg`) or ORM (Sequelize)
- Create database connection in backend
- Implement CRUD operations for user preferences and course data

### 5. AI Integration
**Objective**: Connect to DeepSeek API to generate course recommendations.

**Implementation Steps**:
- Create a service to call DeepSeek API with user queries
- Format API responses into structured course recommendations
- Implement error handling for API rate limits and failures

**Example Query Flow**:
1. User submits query: "What courses should I take for a CS major?"
2. Backend sends formatted query to DeepSeek API
3. Response is parsed and returned to frontend as structured recommendations

### 6. DukeHub Integration (Optional)
**Objective**: Connect to DukeHub for real-time course data if API is available.

**Alternative Approaches**:
- If API exists: Fetch and store course data in MongoDB
- If no API: Import course data manually from CSV or public catalog

**Implementation Considerations**:
- Contact Duke IT department for API access information
- Create data import scripts for manual updates if needed

### 7. Testing
**Objective**: Ensure all components work together seamlessly.

**Test Areas**:
- Frontend form submission to backend
- Database operations (storage and retrieval)
- AI response quality and formatting
- End-to-end user flows

**Tools**:
- Postman for API testing
- React DevTools for frontend debugging
- Database client for direct data verification

### 8. Deployment
**Objective**: Make the application available to Duke students.

**Deployment Targets**:
- Frontend: Vercel
- Backend: Vercel
- Database: MongoDB Atlas

**Deployment Steps**:
- Configure environment variables for production
- Set up CORS to allow cross-origin requests
- Test the deployed application end-to-end
- Monitor for errors and performance issues