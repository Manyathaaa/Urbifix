# Urbifix Frontend

A modern Next.js frontend application for the Urbifix smart city issue management system.

## Features

- **Issue Reporting**: Citizens can report city infrastructure problems with photos and location data
- **Service Directory**: Browse and access municipal services online
- **Real-time Dashboard**: Track issue status and manage reports
- **User Authentication**: Secure login and registration system
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Interactive Maps**: Location-based issue reporting and visualization

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **State Management**: React Hooks + Context API

## Project Structure

```
client/
├── app/                    # Next.js app directory
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # User dashboard
│   ├── report/            # Issue reporting
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── components/            # Reusable components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── IssueCard.tsx
│   ├── ServiceCard.tsx
│   ├── ChatBox.tsx
│   └── MapView.tsx
├── hooks/                 # Custom React hooks
│   ├── useAuth.ts
│   ├── useIssues.ts
│   └── useServices.ts
├── lib/                   # Utilities and configurations
│   ├── api.ts            # Axios configuration
│   └── auth.ts           # Authentication helpers
├── types/                 # TypeScript type definitions
│   ├── user.ts
│   ├── issue.ts
│   └── service.ts
└── public/               # Static assets
    ├── logo.png
    └── icons/
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Backend API running (see server directory)

### Installation

1. Install dependencies:

```bash
cd client
npm install
```

2. Create environment variables:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_MAP_API_KEY=your_map_api_key_here
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Features Overview

### Authentication

- User registration and login
- JWT token-based authentication
- Protected routes and middleware
- Password reset functionality

### Issue Management

- Create, view, and track infrastructure issues
- Photo upload and location tagging
- Priority and category classification
- Status tracking (pending, in-progress, resolved)
- Comments and updates

### Service Directory

- Browse municipal services
- Online application forms
- Document upload and management
- Application status tracking

### Dashboard

- Personal issue overview
- Statistics and analytics
- Quick action buttons
- Recent activity feed

## API Integration

The frontend communicates with the backend API using Axios. Key endpoints include:

- `POST /auth/login` - User authentication
- `POST /auth/register` - User registration
- `GET /issues` - Fetch user issues
- `POST /issues` - Create new issue
- `GET /services` - Fetch available services
- `POST /services/:id/apply` - Apply for service

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Environment Variables

| Variable                  | Description         | Default                     |
| ------------------------- | ------------------- | --------------------------- |
| `NEXT_PUBLIC_API_URL`     | Backend API URL     | `http://localhost:5000/api` |
| `NEXT_PUBLIC_MAP_API_KEY` | Map service API key | -                           |

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

The application can be deployed on any platform that supports Node.js:

- Netlify
- Heroku
- AWS Amplify
- DigitalOcean App Platform

## Troubleshooting

### Common Issues

1. **Module not found errors**: Run `npm install` to ensure all dependencies are installed
2. **API connection issues**: Check that the backend server is running and `NEXT_PUBLIC_API_URL` is correct
3. **Build errors**: Ensure TypeScript errors are resolved before building

### Development Tips

- Use the browser's developer tools to debug API calls
- Check the Network tab for failed requests
- Use React Developer Tools extension for component debugging

## License

This project is licensed under the MIT License.
