import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const ProtectedRoute = ({ redirectPath = '/login', allowedRoles = [] }) => {
    const { user, loading } = useSelector(state => state.user);

    // If loading is true, display a loading spinner or message
    if (loading) {
        return <div>Loading...</div>; // You can replace this with a spinner or other UI
    }

    // If user exists and their role is not in allowedRoles, redirect to unauthorized
    // if (allowedRoles.length && user && !allowedRoles.includes(user.role)) {
    //     return <Navigate to="/unauthorized" />;
    // }

    // If no user is found, redirect to login
    return user ? <Outlet /> : <Navigate to={redirectPath} />;
};

export default ProtectedRoute;
