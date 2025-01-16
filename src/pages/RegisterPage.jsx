import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/auth';
import Loader from '../components/Shared/Loader';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username:'',
        // email:'',
        password:'',
        confirmPassword:'',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    };

    const validateForm = () => {
        const { password, confirmPassword } = formData;
        if( password !== confirmPassword ) {
            setError('Password don\'t match');
            return false;
        }
        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!validateForm()) return;

        setLoading(true);
        setError(null);

        try {
            await register(formData);
            navigate('/login');
        } catch(err) {
            setError('Registration failed. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md h-[600px]">
                <header className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-700">Create an Account</h1>
                </header>
                {loading ? (<Loader/>) :
                    (
                        <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                            <div className="mb-4">
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                                <input 
                                    type="text"
                                    name="username"
                                    id="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 mt-1 border border-gray-300 rounded-md"/>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                <input 
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 mt-1 border border-gray-300 rounded-md"/>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                <input 
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 mt-1 border border-gray-300 rounded-md"/>
                            </div>
                            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                            <button type="submit" className="w-full py-3 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                                Register
                            </button>
                        </form>
                    )
                }
                <footer className="mt-6 text-sm text-gray-500">
                    © {new Date().getFullYear()} SalesApp. All rights reserved.
                </footer>
            </div>
        </div>
    );
};

export default RegisterPage;