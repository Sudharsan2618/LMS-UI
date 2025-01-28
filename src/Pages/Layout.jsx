import React from 'react';
import Header from '../Components/Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="flex flex-col h-screen">
            <Header />

            <div className="flex-grow overflow-auto">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
