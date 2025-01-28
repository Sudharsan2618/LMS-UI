import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ redirectPath = '/login', allowedRoles = [], children }) => {
    const { loading } = useSelector(state => state.user); // Assuming `user` is part of Redux state
    const user = JSON.parse(localStorage.getItem("user"))

    // Display loading spinner or message when loading
    if (loading) {
        return <div>Loading...</div>; // Replace this with a spinner component if needed
    }

    // If user exists and their role is not in allowedRoles, redirect to unauthorized
    // if (user && allowedRoles.length && !allowedRoles.includes(user.role)) {
    //     return <Navigate to="/unauthorized" />;
    // }

    // If no user is found, redirect to login


    return user ? children : <Navigate to={redirectPath} />;
};

export default ProtectedRoute;
