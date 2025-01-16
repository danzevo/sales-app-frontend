// import logo from './logo.svg';
import './App.css';
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate} from 'react-router-dom';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/Shared/ProtectedRoute';
import RegisterPage from './pages/RegisterPage';
import MainLayout from './components/Layout/MainLayout';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if(user && location.pathname === '/') {
      if(user.role === 'ADMIN') {
        return <Navigate to="/admin" />
      } else if(user.role === 'KASIR') {
        return <Navigate to="/kasir" />
      }
  }

  return (
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>

          {/* Protected routes with layout */}
          <Route path="/admin" element={
            <ProtectedRoute role="ADMIN">
              <MainLayout>
                <h1>Admin Page</h1>
              </MainLayout>
            </ProtectedRoute>
          }/>
          <Route path="/kasir"
            element={
              <ProtectedRoute role="KASIR">
                <MainLayout>
                  <h1>Kasir Page</h1>
                </MainLayout>
              </ProtectedRoute>
            }/>

          {/* If no route matches, show the NotFoundPage */}
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
  );
}

export default function AppWithProvider() {
  return (
    <Router>
      <AuthProvider>
        <App/>
      </AuthProvider>
    </Router>
  )
};
