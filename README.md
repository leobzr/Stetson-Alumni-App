# Alumni App

**Name:** Leonardo Bezerra Correia da Silva
**Assignment:** Project 2 - Full Stack Alumni Application  
**Server IP Address:** http://165.227.84.162  
**Swagger Address:** http://165.227.84.162/api-docs

## Description
This application provides a platform for university alumni to connect, share job opportunities, and communicate with each other. Alumni can create profiles, post and browse job opportunities, and message other alumni directly within the platform.

## Features
- User authentication with JWT and refresh tokens
- Role-based access control (admin vs regular users)
- Admin approval for new users and opportunities
- Direct messaging between users (You need to go to a user profile and click on the send a message button)
- Opportunity posting and browsing
- User profiles with education and work history
- RESTful API with Swagger documentation

## Technologies Used
- **Frontend**: React.js, Vite, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JWT with HTTP-only cookies
- **Documentation**: Swagger UI
- **Deployment**: Digital Ocean, NGINX, PM2

## API Documentation
API documentation is available at: http://165.227.84.162/api-docs

## Deployment Details
- Server: Ubuntu 24.10 on Digital Ocean
- Web Server: NGINX as reverse proxy
- Process Manager: PM2
- Database: MongoDB Atlas

## Project Structure
- Modular backend with feature-based organization
- Service layer architecture
- React frontend with protected routes
- CORS enabled for secure cross-origin requests

## Security Features
- JWT stored in HTTP-only cookies
- Refresh token rotation
- Password hashing using bcrypt
- Protected routes with middleware
- Environment variables for sensitive information
