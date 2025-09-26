# Portfolio Website - Next.js + MongoDB

A modern portfolio website built with Next.js 15, MongoDB, and TypeScript. Features include admin panel, project management, skills showcase, and contact messaging system.

## 🚀 Features

- **Modern UI/UX**: Built with Tailwind CSS and shadcn/ui components
- **Admin Panel**: Secure admin interface for content management
- **MongoDB Integration**: Dynamic content management with MongoDB
- **PWA Support**: Progressive Web App capabilities
- **Responsive Design**: Mobile-first responsive design
- **TypeScript**: Full TypeScript support for type safety
- **Server Actions**: Next.js 15 server actions for API operations

## 📋 Prerequisites

- Node.js 18+ 
- MongoDB (local or cloud instance)
- npm or yarn package manager

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd md_hasibul_islam
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example environment file
   cp env.example .env
   
   # Edit .env with your actual values
   nano .env
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

### Required Variables

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/portfolio_db
MONGODB_DB_NAME=portfolio_db

# Admin Authentication
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password_here

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production
```

### Optional Variables

```env
# Node Environment (automatically set by Next.js)
NODE_ENV=development
```

### Environment Variable Details

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `MONGODB_URI` | MongoDB connection string | - | ✅ |
| `MONGODB_DB_NAME` | MongoDB database name | `portfolio_db` | ❌ |
| `ADMIN_USERNAME` | Admin panel username | - | ✅ |
| `ADMIN_PASSWORD` | Admin panel password | - | ✅ |
| `JWT_SECRET` | Secret key for JWT tokens | `fallback-secret-key` | ❌ |
| `NODE_ENV` | Node environment | `development` | ❌ |

## 🗄️ MongoDB Setup

### Local MongoDB

1. **Install MongoDB Community Edition**
   ```bash
   # Ubuntu/Debian
   sudo apt-get install mongodb
   
   # macOS with Homebrew
   brew install mongodb-community
   
   # Windows
   # Download from https://www.mongodb.com/try/download/community
   ```

2. **Start MongoDB service**
   ```bash
   # Ubuntu/Debian
   sudo systemctl start mongodb
   
   # macOS
   brew services start mongodb-community
   
   # Windows
   # Start MongoDB service from Services
   ```

3. **Create database**
   ```bash
   mongosh
   use portfolio_db
   ```

### MongoDB Atlas (Cloud)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Get your connection string
4. Add your IP to the whitelist
5. Update `MONGODB_URI` in your `.env` file

## 🚀 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript type checking

# Database Management
npm run seed         # Populate database with sample data
npm run check-db     # Check database connection and data
```

## 📁 Project Structure

```
src/
├── actions/         # Server actions for data operations
├── app/            # Next.js app router pages
├── components/     # React components
├── data/          # Static data and database files
├── hooks/         # Custom React hooks
├── lib/           # Utility libraries and configurations
├── types/         # TypeScript type definitions
└── middleware.ts  # Next.js middleware
```

## 🔐 Admin Panel

Access the admin panel at `/admin` with the credentials specified in your `.env` file.

**Features:**
- Dashboard overview
- Project management (CRUD operations)
- Skills management
- Experience management
- About page editing
- Contact message management
- CV file management

## 🔧 Troubleshooting

### Loading Screen Issue

If you see "Loading..." or "Please wait while we load the content" on the homepage:

1. **Check database connection:**
   ```bash
   npm run check-db
   ```

2. **If database is empty, seed it with sample data:**
   ```bash
   npm run seed
   ```

3. **Verify environment variables:**
   - Ensure `.env` file exists with correct `MONGODB_URI`
   - Check if MongoDB service is running

### Common Issues

- **Port already in use:** Next.js will automatically use the next available port
- **Database connection failed:** Verify MongoDB URI and network connectivity
- **Admin panel not accessible:** Check `ADMIN_USERNAME` and `ADMIN_PASSWORD` in `.env`

## 🎨 Customization

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Pre-built component library
- **Custom Components**: Located in `src/components/`

### Content Management
- **Projects**: Add/edit/delete portfolio projects
- **Skills**: Manage technical skills and categories
- **Experience**: Work history and achievements
- **About**: Personal information and profile

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Connect your GitHub repository
   - Add environment variables
   - Deploy automatically

### Other Platforms

- **Netlify**: Similar to Vercel
- **Railway**: Good for full-stack apps
- **DigitalOcean**: VPS deployment
- **AWS**: Enterprise solutions

## 🔧 Troubleshooting

### Build Errors

1. **MongoDB Connection Issues**
   - Ensure MongoDB is running
   - Check `MONGODB_URI` in `.env`
   - Verify network connectivity

2. **Environment Variable Issues**
   - Check `.env` file exists
   - Restart development server
   - Verify variable names

3. **TypeScript Errors**
   ```bash
   npm run type-check
   ```

### Common Issues

- **Port 9002 already in use**: Change port in `package.json`
- **MongoDB connection timeout**: Check firewall settings
- **Build fails**: Ensure all environment variables are set

## 📚 Dependencies

### Core Dependencies
- **Next.js 15**: React framework
- **React 18**: UI library
- **TypeScript**: Type safety
- **MongoDB**: Database
- **Tailwind CSS**: Styling

### Key Libraries
- **shadcn/ui**: Component library
- **clsx**: Class name utility
- **tailwind-merge**: CSS class merging
- **jsonwebtoken**: JWT authentication

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:

1. Check the troubleshooting section
2. Review environment variable configuration
3. Ensure MongoDB is running
4. Check the console for error messages
5. Open an issue on GitHub

---

**Happy Coding! 🎉**
