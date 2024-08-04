import Navbar from "./Components/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Routes/Login";
import Homepage from "./Routes/Homepage";
import { useState, useEffect } from "react";
import AdminDashboard from "./Routes/AdminDashboard";
import AdminNavbar from "./Components/AdminNavbar";

function App() {
    const [token, setToken] = useState(localStorage.getItem('authToken'));
    const [roles, setRoles] = useState(JSON.parse(localStorage.getItem('roles')) || []);

    useEffect(() => {
        if (token) {
            localStorage.setItem('authToken', token);
        }
        if (roles.length > 0) {
            localStorage.setItem('roles', JSON.stringify(roles));
        }
    }, [token, roles]);

    const handleLoginSuccess = (token, roles) => {
        setToken(token);
        setRoles(roles);
    };

    const handleLogout = () => {
        setToken(null);
        setRoles([]);
        localStorage.removeItem('authToken');
        localStorage.removeItem('roles');
    };

    const isAdmin = roles.includes('Admin');


    return (
        <>
            <BrowserRouter>
                {isAdmin ? <AdminNavbar onLogout={handleLogout}/> : <Navbar onLogout={handleLogout}/>}
                <Routes>
                    <Route path="/Homepage" element={<Homepage />} />
                    <Route path="/Login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
                    <Route path="/" element={<Navigate to={token ? "/Dashboard" : "/Login"} />} />
                    <Route path="/Dashboard" element={<AdminDashboard />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
