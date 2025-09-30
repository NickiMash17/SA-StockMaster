# SA-StockMaster 🚀

![Status](https://img.shields.io/badge/Status-Production%20Ready-green)
![React](https://img.shields.io/badge/React-18.2-blue)
![.NET](https://img.shields.io/badge/.NET-8.0-purple)
![Database](https://img.shields.io/badge/Database-SQLite-lightgrey)

> Enterprise Inventory Management System built for South African businesses

A comprehensive, full-stack inventory management solution featuring real-time stock tracking, supplier management, and VAT-compliant reporting. Built with modern technologies to streamline business operations.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Development](#-development)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [License](#-license)

## ✨ Features

### 📊 Dashboard & Analytics
- **Real-time Metrics**: Live inventory statistics and stock value tracking
- **Stock Alerts**: Intelligent low-stock and critical stock notifications
- **Visual Analytics**: Progress bars and status indicators for quick insights
- **Trend Analysis**: Stock value and product count trends with percentage changes

### 🏷️ Product Management
- **Complete CRUD Operations**: Create, read, update, and delete products
- **Advanced Search**: Filter by product name, SKU, or category
- **Stock Tracking**: Real-time quantity and minimum level monitoring
- **Supplier Integration**: Link products to suppliers with contact information

### 📦 Inventory Control
- **Stock Movements**: Track inventory inflows and outflows
- **Automated Alerts**: Notifications when stock reaches minimum levels
- **Batch Operations**: Bulk stock adjustments and updates
- **Inventory Valuation**: Real-time stock value calculations

### 👥 Supplier Management
- **Supplier Database**: Comprehensive supplier information management
- **Contact Tracking**: Store phone numbers and addresses
- **Product Linking**: Associate products with their suppliers

### 📈 Reporting & Settings
- **Custom Reports**: Generate inventory and transaction reports
- **VAT Configuration**: South Africa-specific tax settings (15% default)
- **Date Range Filtering**: Customizable reporting periods
- **System Settings**: Configure business information and preferences

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern UI framework with hooks
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Heroicons** - Beautiful SVG icons
- **Vite** - Fast build tool and dev server

### Backend
- **.NET 8** - High-performance web framework
- **Entity Framework Core** - Object-relational mapper
- **SQLite** - Lightweight database engine
- **Swagger/OpenAPI** - API documentation
- **C#** - Backend programming language

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) 18+ and npm
- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/NickiMash17/SA-StockMaster.git
cd SA-StockMaster
```

2. **Backend Setup**
```bash
cd backend
dotnet restore
dotnet run
```
Backend will be available at `https://localhost:7000`

3. **Frontend Setup**

Open a new terminal:
```bash
cd frontend
npm install
npm run dev
```
Frontend will be available at `http://localhost:5173`

4. **Database Setup**

The SQLite database is automatically created on first run. If needed, manually run:
```bash
cd backend
dotnet ef database update
```

## 🏗 Project Structure

```
SA-StockMaster/
├── frontend/                 # React TypeScript application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── services/         # API service layer
│   │   ├── types/            # TypeScript type definitions
│   │   └── assets/           # Static assets
│   ├── public/               # Public files
│   └── package.json          # Dependencies and scripts
│
├── backend/                  # .NET 8 Web API
│   ├── Controllers/          # API endpoints
│   ├── Models/               # Data models
│   ├── Data/                 # Database context
│   ├── Services/             # Business logic
│   └── Program.cs            # Application entry point
│
└── README.md                 # This file
```

## 📚 API Documentation

### Base URL
```
https://localhost:7000/api
```

### Key Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/products` | GET | Get all products |
| `/api/products/{id}` | GET | Get product by ID |
| `/api/products` | POST | Create new product |
| `/api/products/{id}` | PUT | Update product |
| `/api/products/{id}` | DELETE | Delete product |
| `/api/dashboard/stats` | GET | Get dashboard statistics |
| `/api/suppliers` | GET | Get all suppliers |
| `/api/categories` | GET | Get all categories |
| `/api/stockmovements` | GET | Get stock movements |

### Example API Call

```javascript
// Get dashboard statistics
fetch('https://localhost:7000/api/dashboard/stats')
  .then(response => response.json())
  .then(data => console.log(data));
```

For full API documentation, visit `https://localhost:7000/swagger` when the backend is running.

## 🔧 Development

### Backend Development

```bash
cd backend
dotnet watch run  # Hot reload for development
```

### Frontend Development

```bash
cd frontend
npm run dev      # Development server with hot reload
npm run build    # Production build
npm run preview  # Preview production build
```

### Database Migrations

```bash
cd backend
dotnet ef migrations add MigrationName
dotnet ef database update
```

### Code Standards
- Use TypeScript for type safety
- Follow React best practices with hooks
- Implement proper error handling
- Write meaningful commit messages
- Include appropriate documentation

## 🚀 Deployment

### Production Build

**Frontend:**
```bash
cd frontend
npm run build
```

**Backend:**
```bash
cd backend
dotnet publish -c Release -o ./publish
```

### Environment Variables

**Backend** (`appsettings.json`):
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=sa_stockmaster.db"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information"
    }
  }
}
```

**Frontend** (`.env`):
```
VITE_API_BASE_URL=https://your-api-domain.com/api
```

## 🐛 Troubleshooting

### Common Issues

**Backend won't start:**
- Ensure .NET 8 SDK is installed: `dotnet --version`
- Check if port 7000 is available
- Verify database connection string

**Frontend build errors:**
- Clear node_modules: `rm -rf node_modules package-lock.json`
- Reinstall dependencies: `npm install`
- Check TypeScript compiler options

**Database issues:**
- Run: `dotnet ef database update`
- Check file permissions for SQLite database
- Verify connection string configuration

**CORS errors:**
- Ensure backend CORS policy allows frontend origin
- Check API base URL in frontend configuration

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👩‍💻 Developer

**Nicolette Mashaba** - Full Stack Developer

- Frontend: React, TypeScript, Tailwind CSS
- Backend: .NET 8, Entity Framework Core, SQLite
- Design: UI/UX, Responsive Design

## 📞 Support

For issues or questions:
- Create an issue in the [repository](https://github.com/NickiMash17/SA-StockMaster/issues)
- Email: nene171408@gmail.com

## 🙏 Acknowledgments

- React team for the amazing framework
- .NET team for robust backend capabilities
- Tailwind CSS for the utility-first approach
- South African business community for inspiration

---

**SA-StockMaster** - Professional inventory management for South African businesses 🇿🇦

Built with ❤️ by Nicolette Mashaba