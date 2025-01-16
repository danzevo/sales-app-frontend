import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Loader from './Loader';

const ProtectedRoute = ({ children, role }) => {
    const { user } = useContext(AuthContext);

    if(user === null) {
        return <Loader/>
    }
    if(!user && window.location.pathname !== '/register') return <Navigate to="/login" />;
    if(role && ![role, "ADMIN"].includes(user.role)) return <Navigate to="/"/>;

    return children;
}

export default ProtectedRoute;