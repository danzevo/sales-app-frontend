import { useContext, useState, useEffect, useRef } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { getInitializedLetter } from '../../utils/Helper';

const Navbar = () => {
    const { logout, user } = useContext(AuthContext);
    const [ isDropdownOpen, setIsDropdownOpen ] = useState(false);
    const dropdownRef = useRef(null);

    const handleLogout = () => {
        logout("You have been logout successfully!");
    }

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if(dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        }
    }, []);

    const initial = getInitializedLetter(user.username);

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class="w-8 h-8 rounded-full">
                    <circle cx="50" cy="50" r="50" fill="#4C51BF"/>
                    <text x="50%" y="50%" text-anchor="middle" stroke="#fff" stroke-width="1px" dy=".3em" font-size="30" font-family="Arial" fill="#fff">${initial}</text>
                </svg>`;

    const encodedSvg = encodeURIComponent(svg);

    return (
        <header className="bg-blue-600 text-white shadow-md">
            <div className="container mx-auto flex justify-between item-center p-4">
                <h1 className="text-2xl font-bold">SalesApp</h1>

                {/* Profile and Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    {/* Profile Button */}
                    <button onClick={toggleDropdown}
                        className="flex items-center space-x-2 focus:outline-none hover:text-gray-300">
                        {/* Profile Picture */}
                        <img src={`data:image/svg+xml;utf8,${encodedSvg}`} alt="Profile" className="w-8 h-8 rounded-full"/>
                        <span>{user.username}</span>
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 bg-white text-black shadow-lg rounded-md w-48 z-10">
                            <ul>
                                <li>
                                    <button className="block w-full text-left px-4 py-2 hover:bg-blue-100"
                                            onClick={() => {
                                                console.log("Edit profile clicked");
                                                setIsDropdownOpen(false)
                                            }}>
                                                Profile
                                    </button>
                                </li>
                                <li>
                                    <button className="block w-full text-left px-4 py-2 hover:bg-blue-100"
                                            onClick={handleLogout}>
                                                Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;