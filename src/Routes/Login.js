import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import request from '../Services/ApiService';
import { BaseURL, HttpHeaders, HttpMethods } from '../Services/Constants';
import useToastify from '../Hooks/useToastify';
import { ToastContainer } from 'react-toastify';

function Login({ onLoginSuccess }) {
    const { success, error } = useToastify();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            email,
            password
        };
        try {
            const response = await request(HttpMethods.post, HttpHeaders.BaseHeader, BaseURL.Login, payload);
            console.log('Full Response:', response); // Log the full response

            if (response.ok) {
                const { token, roles } = response; // Ensure these fields are correctly extracted
                localStorage.setItem('authToken', token);
                localStorage.setItem('roles', JSON.stringify(roles));
                onLoginSuccess(token, roles);
                success('Successfully Logged In!');

                if (roles.includes('Admin')) {
                    navigate('/Dashboard'); // Redirect to admin page
                } else {
                    navigate('/Homepage'); // Redirect to user page
                }
            } else {
                error('Login failed, Please Try Again');
                console.error('Error Response:', response);
            }
        } catch (err) {
            error(err.message);
            console.log('Error:', err);
        }
    };

    return (
        <div className="min-h-screen flex">
            <div className="w-1/2 bg-gradient-to-r from-blue-300 to-blue-600 flex items-center justify-center">
                <div className="text-white text-center">
                    <h1 className="text-5xl font-bold mb-4">Welcome Back!</h1>
                    <p className="text-lg">Manage your students with ease and efficiency.</p>
                </div>
            </div>
            <div className="w-1/2 flex items-center justify-center bg-white">
                <div className="max-w-md w-full p-10">
                    <h2 className="text-3xl font-semibold mb-5 text-center text-gray-800">MySEEU</h2>
                    <h3>Sign in with your SEE University account</h3>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <div className="mt-1">
                                <input
                                    type="email"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="example@seeu.edu.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <div className="mt-1">
                                <input
                                    type="password"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="********"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
}

export default Login;
