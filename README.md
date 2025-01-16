# Sales Application Frontend

This is the frontend of the Sales Application, built with React.js and styled using Tailwind CSS. It connects to the backend API https://github.com/danzevo/sales-app to provide an interface for managing transactions, products, and user authentication.

## Features

- **User Authentication**: Login with JWT stored in local storage.
- **Transaction Management**: View and manage transactions.
- **Product Management**: Manage product data and stock.
- **Responsive Design**: Styled with Tailwind CSS for a modern look.

## Technologies Used

- **React.js**
- **Tailwind CSS**
- **Axios**: Pre-configured instance for API communication with token-based authentication.
- **React Router**: Navigation and routing.

## Setup and Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/sales-app-frontend.git
   cd sales-app-frontend
2. **Install dependencies**  
   Install the required npm dependencies by running the following command:
   ```bash
   npm install
3. **Set up environment variables**  
   Create a .env file in the root directory and configure the following:
   ```bash
   REACT_APP_API_URL=http://localhost:8080/api  
4. **Run the development**  
   server Start the React development server by running:
   ```bash
   npm start  
6. **Build for production**  
   To create a production build of the app, use the following command:  
   ```bash
   npm run build  
