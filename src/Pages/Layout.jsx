// import React, { useEffect } from 'react';
// import Header from '../Components/Header';
// import { Outlet, useLocation } from 'react-router-dom';
// import Chatbot from '../Components/Chatbot';



// const Layout = () => {
//     const location = useLocation();
//     useEffect(() => {
//         const parent = document.querySelector("#parent")
//         parent.scrollTo(0, 0);
//     }, [location.pathname, parent]);

//     return (
//         <div className="flex flex-col h-screen">
//             <Header />

//             <div className="flex-grow overflow-auto" id='parent'>
//                 <Outlet />
//             </div>

//             <Chatbot />
//         </div>
//     );
// };

// export default Layout;

import React, { useEffect } from "react";
import Header from "../Components/Header";
import { Outlet, useLocation } from "react-router-dom";
import Chatbot from "../Components/Chatbot";

const Layout = () => {
    const location = useLocation();

    useEffect(() => {
        const parent = document.getElementById("parent");
        if (parent) {
            parent.scrollTo(0, 0);
        }
    }, [location.pathname]);

    return (
        <div className="flex flex-col h-screen">
            <Header />

            <div className="flex-grow overflow-auto" id="parent">
                <Outlet />
            </div>

            <Chatbot />
        </div>
    );
};

export default Layout;
