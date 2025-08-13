# Accounts Pro - Enterprise Authentication System

A professional, full-featured authentication system built with Next.js 15, featuring a stunning black and gold design, comprehensive user management, and enterprise-grade security.

## ✨ Features

### 🔐 Authentication
- **Multi-Provider Auth**: Email/password + Google OAuth
- **Password Management**: Secure reset/forgot password flow
- **Session Management**: Database sessions with device tracking
- **Role-Based Access**: 18+ predefined roles for accounting/finance

### 👤 User Management
- **Comprehensive Profiles**: Personal, professional, and contact information
- **Role System**: Super admin to guest with granular permissions
- **Status Management**: Active, inactive, suspended, locked states
- **Audit Logging**: Complete action tracking for compliance

### 🎨 Design
- **Modern UI**: Black background with elegant golden accents
- **Glass Morphism**: Backdrop blur effects and transparency
- **Responsive**: Beautiful on all screen sizes
- **Professional**: Enterprise-grade visual design

### 🏗️ Architecture
- **Clean Code**: Professional service layer architecture
- **Type Safety**: Full TypeScript implementation
- **Database**: PostgreSQL with Drizzle ORM
- **Security**: Enterprise-level security practices

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Google OAuth credentials (optional)

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd accounts
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment setup**
```bash
cp .env.example .env.local
```

4. **Configure environment variables**
Edit `.env.local` with your values:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/accounts"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

5. **Database setup**
```bash
# Generate and apply migrations
npm run db:generate
npm run db:push
```

6. **Start development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🗄️ Database Schema

### Core Tables
- **users**: Comprehensive user profiles with roles and status
- **accounts**: OAuth provider accounts (NextAuth)
- **sessions**: User sessions with device tracking
- **password_reset_tokens**: Secure password reset flow
- **audit_logs**: Complete action tracking
- **user_sessions**: Custom session management

### User Roles
```typescript
'super_admin' | 'admin' | 'manager' | 'accountant' | 'finance_manager' |
'auditor' | 'bookkeeper' | 'tax_specialist' | 'payroll_specialist' |
'accounts_receivable' | 'accounts_payable' | 'financial_analyst' |
'controller' | 'cfo' | 'employee' | 'client' | 'vendor' | 'guest'
```

## 🔧 Configuration

### Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)

### Database Commands
```bash
# Generate migration
npm run db:generate

# Apply migrations
npm run db:push

# View database
npm run db:studio
```

## 📁 Project Structure

```
src/
├── app/                 # Next.js app router
│   ├── api/auth/       # Authentication API routes
│   ├── auth/           # Auth pages (login, register, etc.)
│   └── page.tsx        # Dashboard
├── components/         # Reusable UI components
│   ├── auth/          # Authentication components
│   └── ui/            # Base UI components
├── lib/               # Utilities and configuration
│   ├── db/            # Database schema and connection
│   ├── validations/   # Zod schemas
│   └── auth.ts        # NextAuth configuration
├── services/          # Business logic layer
│   ├── user.service.ts
│   ├── auth.service.ts
│   ├── session.service.ts
│   └── audit.service.ts
└── types/             # TypeScript definitions
```

## 🛡️ Security Features

- **Password Hashing**: bcryptjs with 12 rounds
- **CSRF Protection**: Built-in NextAuth protection
- **Session Security**: Secure HTTP-only cookies
- **Input Validation**: Zod schema validation
- **SQL Injection Prevention**: Drizzle ORM parameterized queries
- **Audit Logging**: Complete action tracking
- **Role-Based Access**: Granular permission system

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token
- `GET/POST /api/auth/[...nextauth]` - NextAuth endpoints

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Environment Variables for Production
```env
DATABASE_URL="your-production-database-url"
NEXTAUTH_SECRET="your-production-secret"
NEXTAUTH_URL="https://yourdomain.com"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

## 🧪 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:generate  # Generate database migrations
npm run db:push      # Apply migrations to database
npm run db:studio    # Open Drizzle Studio
```

## 📚 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL + Drizzle ORM
- **Authentication**: NextAuth.js v4
- **Styling**: Tailwind CSS
- **Validation**: Zod
- **UI Components**: Custom components with Tailwind
- **Password Hashing**: bcryptjs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, please open an issue in the GitHub repository or contact the development team.

---

**Built with ❤️ using Next.js 15, TypeScript, and modern web technologies.**
