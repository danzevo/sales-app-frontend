import { useState, useEffect, useContext } from 'react';
import { login } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const LoginPage = () => {
    const [formData, setFormData] = useState({ username: '', password: ''});
    const [error, setError] = useState('');
    const [authMessage, setAuthMessage] = useState('');
    const navigate = useNavigate();
    const { fetchUser } = useContext(AuthContext);

    useEffect(() => {
        const message = localStorage.getItem('authMessage');
        if(message) {
            setAuthMessage(message);
            localStorage.removeItem('authMessage');
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value});
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const { data } = await login(formData);

            localStorage.setItem('token', data);

            const response = await fetchUser();
            const { role } = response;

            if( role === "ADMIN") {
                navigate("/admin");
            }else if( role === "KASIR") {
                navigate("/kasir");
            } else {
                setError("Unauthorized role. Please contact the administrator.");
            }
        } catch(err) {
            console.error("Login error: ", err);

            if (err?.response?.status === 401) {
                setError('Invalid username or password');
            } else if (err?.response?.data?.message) {
                setError(err.response.data.message); // If backend sends a custom error message
            } else {
                setError('Something went wrong. Please try again later.');
            }
        }
    }

    return (
        <div className="min-h-screen flex item-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md h-[600px]">
                <header className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-700">Welcome Back!</h1>
                </header>
                {authMessage && <p className="text-yellow-600 text-sm mb-3">{authMessage}</p>}
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-200">
                    <h1 className="text-xl font-bold mb-4">Login</h1>
                    {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
                    <div className="mb-4">
                        <label className="block text-gray-700">Username</label>
                        <input type="text" name="username" value={formData.username} onChange={handleChange} 
                                className="w-full p-3 border border-gray-300 rounded mt-1"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded mt-1"/>
                    </div>
                    <button type="submit" className="bg-blue-500 text-white w-full py-3 rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                        Login
                    </button>
                </form>
                <div className="mt-4">
                    <button onClick={() => navigate('/register')}
                        className="text-blue-500 hover:text-blue-700 text-sm">
                            Don't have an account ? Register
                        </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;