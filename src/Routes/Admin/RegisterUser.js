import React, { useState } from 'react';
import request from '../../Services/ApiService';
import { BaseURL, HttpHeaders, HttpMethods } from '../../Services/Constants';
import useToastify from '../../Hooks/useToastify';
import { ToastContainer } from 'react-toastify';

function RegisterUser() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const { success, error } = useToastify();

    const handleRegister = async (e) => {
        e.preventDefault();

        const data = {
            email: email,
            password: password
        };

        try {
            const registerResponse = await request(HttpMethods.post, HttpHeaders.BaseHeader, BaseURL.Register, data);

            if (registerResponse) {
                success('User registered successfully!');

                await handleAssignRole(email, role);
            } else {
                error(`Registration failed: ${registerResponse.message}`);
            }
        } catch (err) {
            console.error('An error occurred during registration:', err);
            error('Failed to register user. Please try again.');
        }
    };

    const handleAssignRole = async (username, roleName) => {
        try {

            const assignRoleResponse = await request(HttpMethods.post, HttpHeaders.BaseHeader,`${BaseURL.Assign}?username=${username}&roleName=${roleName}`);

            if (assignRoleResponse) {
                success('Role assigned successfully!');
                setEmail('');
                setPassword('');
                setRole('');
            } else {
                error(`Failed to assign role: ${assignRoleResponse.message}`);
            }
        } catch (err) {
            console.error('An error occurred during role assignment:', err);
            error('Failed to assign role. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-50 to-gray-100">
            <div className="w-full max-w-lg bg-white shadow-xl rounded-lg m-8 p-8">
                <h2 className="text-4xl font-bold text-center text-blue-800 mb-8">Register User </h2>

                {/* Validation Rules */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Please follow the rules below:</h3>
                    <ul className="list-disc list-inside text-gray-700">
                        <li>Email must contain "@"</li>
                        <li>Password must be at least 8 characters long</li>
                        <li>Password must contain an uppercase letter, a number, and a special character</li>
                        <li>Role must be provided</li>
                    </ul>
                </div>

                <form onSubmit={handleRegister} className="space-y-6">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full px-4 py-2 border ${
                                email.includes('@') ? 'border-gray-300' : 'border-red-500'
                            } rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
                                email.includes('@') ? 'focus:ring-blue-500' : 'focus:ring-red-500'
                            }`}
                            placeholder="Enter email"
                            required
                        />
                        {!email.includes('@') && (
                            <p className="text-red-500 text-sm mt-2">Email must contain "@"</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full px-4 py-2 border ${
                                /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)
                                    ? 'border-gray-300'
                                    : 'border-red-500'
                            } rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
                                /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)
                                    ? 'focus:ring-blue-500'
                                    : 'focus:ring-red-500'
                            }`}
                            placeholder="Enter password"
                            required
                        />
                        {!(password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password) && /[@$!%*?&]/.test(password)) && (
                            <p className="text-red-500 text-sm mt-2">
                                Password must be at least 8 characters long, contain an uppercase letter, a number, and a special character.
                            </p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Role</label>
                        <input
                            type="text"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className={`w-full px-4 py-2 border ${
                                role ? 'border-gray-300' : 'border-red-500'
                            } rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
                                role ? 'focus:ring-blue-500' : 'focus:ring-red-500'
                            }`}
                            placeholder="Enter role"
                            required
                        />
                        {!role && (
                            <p className="text-red-500 text-sm mt-2">Role is required.</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg shadow-lg
                         hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                         disabled:bg-blue-400"
                        disabled={
                            !email.includes('@') ||
                            !(password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password) && /[@$!%*?&]/.test(password)) ||
                            !role
                        }
                    >
                        Register User
                    </button>
                </form>
                <ToastContainer />
            </div>
        </div>
    );


}

export default RegisterUser;
