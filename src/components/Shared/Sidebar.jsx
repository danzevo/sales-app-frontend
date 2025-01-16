import { useState } from 'react';
import { FaBars, FaBox, FaShoppingCart, FaChartBar } from 'react-icons/fa';

const Sidebar = () => {
    const [ isMinimized, setIsMinimized ] = useState(false);

    const toggleSidebar = () => {
        setIsMinimized(!isMinimized);
    };

    return (
        <aside className={`bg-gray-800 text-white min-h-screen p-4 transition-all duration-300 ${
                            isMinimized ? 'w-20' : 'w-64'
                        }`}>
            {/* Sidebar Header */}
            <div className="flex justify-between item-center mb-6">
                <h2 className={`text-2xl font-bold text-center transition-all ${
                    isMinimized ? 'hidden' : 'block'
                }`}>
                    Menu
                </h2>
                <button onClick={toggleSidebar} className="text-white">
                    <FaBars className="text-3xl"/>
                </button>
            </div>

            {/* Sidebar Links */}
            <ul>
                <li>
                    <a href="/product" title="Product" className={`flex items-center py-2 px-4 mb-2 rounded-lg hover:bg-blue-600 transition-all ${
                                                    isMinimized ? 'justify-center' : 'justify-start'
                                                }`}>
                        <FaBox size={20} className={`${ isMinimized ? '' : 'mr-3'}`}/> 
                        {!isMinimized && <span>Product</span>}
                    </a>
                </li>
                <li>
                <a href="/transaction" title="Transaction" className={`flex items-center py-2 px-4 mb-2 rounded-lg hover:bg-blue-600 transition-all ${
                                                    isMinimized ? 'justify-center' : 'justify-start'
                                                }`}>
                        <FaShoppingCart size={20} className={`${ isMinimized ? '' : 'mr-3'}`}/> 
                        {!isMinimized && <span>Transaction</span>}
                    </a>
                </li>
                <li>
                    <a href="/report" title="Report" className={`flex items-center py-2 px-4 mb-2 rounded-lg hover:bg-blue-600 transition-all ${
                                                    isMinimized ? 'justify-center' : 'justify-start'
                                                }`}>
                        <FaChartBar size={20} className={`${ isMinimized ? '' : 'mr-3'}`}/> 
                        {!isMinimized && <span>Report</span>}
                    </a>
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;