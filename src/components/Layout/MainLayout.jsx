import React from 'react';
import Navbar from '../Shared/Navbar';
import Sidebar from '../Shared/Sidebar';

const MainLayout = ({children}) => {
    return (
        <div className="flex">
            <Sidebar/>
            <div className="flex-1">
                <Navbar/>
                <main className="p-6 bg-gray-100 min-h-screen">{children}</main>
            </div>
        </div>
    );
};

export default MainLayout;