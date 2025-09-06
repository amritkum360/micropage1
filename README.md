# MicroPage - Single Page Website Builder

A modern, full-stack application for creating beautiful single-page websites with user authentication and management.

## Features

- 🔐 **User Authentication**: Secure login/signup system with JWT tokens
- 🎨 **Website Builder**: Drag-and-drop interface with 18 customizable sections
- 💾 **Website Management**: Save, edit, delete, and publish websites
- 📱 **Responsive Design**: Modern UI that works on all devices
- 🚀 **Real-time Preview**: See changes as you build
- 📊 **Dashboard**: Manage all your websites in one place
- 🌐 **Public Publishing**: Share your websites with unique URLs

## Tech Stack

### Frontend
- **Next.js 15** - React framework
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **React Context** - State management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## Prerequisites

Before running this application, make sure you have:

- **Node.js** (v18 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn**

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd micropage
```

### 2. Install dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Create a `.env` file in the backend directory:

```env
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
MONGODB_URI=mongodb://localhost:27017/micropage
```

### 4. Set up MongoDB

#### Option A: Local MongoDB
1. Install MongoDB on your system
2. Start MongoDB service
3. Create a database named `micropage`

#### Option B: MongoDB Atlas
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string
4. Update the `MONGODB_URI` in your backend `.env` file

### 5. Start the development servers

#### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

#### Terminal 2 - Frontend
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Usage

### 1. Create an Account
- Visit http://localhost:3000
- You'll be redirected to the authentication page
- Click "Create a new account" to register
- Fill in your details and create your account

### 2. Build Your Website
- After logging in, you'll see your dashboard
- Click "Create Website" to start building
- Use the drag-and-drop interface to add sections
- Customize each section with your content
- Save your website when you're done

### 3. Manage Your Websites
- View all your websites in the dashboard
- Edit existing websites
- Publish websites to make them public
- Delete websites you no longer need

### 4. Share Your Website
- Click "Publish" on any website
- Get a unique URL to share with others
- Your website will be publicly accessible

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile

### Websites
- `POST /api/websites` - Create a new website
- `GET /api/websites` - Get user's websites
- `GET /api/websites/:id` - Get specific website
- `PUT /api/websites/:id` - Update website
- `DELETE /api/websites/:id` - Delete website
- `POST /api/websites/:id/publish` - Publish website
- `GET /api/published/:id` - Get published website (public)

## Project Structure

```
micropage/
├── backend/                 # Backend server
│   ├── server.js           # Express server
│   └── package.json        # Backend dependencies
├── src/
│   ├── app/                # Next.js app router
│   │   ├── auth/           # Authentication pages
│   │   ├── dashboard/      # User dashboard
│   │   ├── builder/        # Website builder
│   │   └── published/      # Published websites
│   ├── components/
│   │   ├── auth/           # Authentication components
│   │   └── templates/      # Website builder components
│   └── contexts/           # React contexts
├── public/                 # Static assets
└── package.json           # Frontend dependencies
```

## Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Backend
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

## Deployment

### Frontend (Vercel)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Backend (Railway/Heroku)
1. Push your code to GitHub
2. Connect your repository to Railway/Heroku
3. Set environment variables
4. Deploy

### Database
- Use MongoDB Atlas for production
- Update the `MONGODB_URI` environment variable

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Protected routes
- Input validation
- CORS configuration
- Environment variable protection

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

If you encounter any issues or have questions:

1. Check the documentation
2. Search existing issues
3. Create a new issue with detailed information

## Acknowledgments

- Built with Next.js and Express.js
- Styled with Tailwind CSS
- Icons from Lucide React
- Database powered by MongoDB
