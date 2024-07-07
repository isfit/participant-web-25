import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthenticationContext';

interface PrivateRouteProps {
    children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const { user } = useAuth();
    if (!user) {
        return <Navigate to="/login" />;
    }
    return children;

}



export default PrivateRoute;