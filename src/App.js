import Navbar from "./Components/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Routes/Login";
import Homepage from "./Routes/Homepage";
import { useState, useEffect } from "react";

function App() {
    const [token, setToken] = useState(localStorage.getItem('authToken'));

    const handleLoginSuccess = (token) => {
        setToken(token);
        localStorage.setItem('authToken', token);
    };

    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem('authToken');
    };

    useEffect(() => {
        // Validate token if necessary
        // Here you could add logic to validate the token with the server
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    return (
        <>
            <BrowserRouter>
                <Navbar onLogout={handleLogout} />
                <Routes>
                    <Route path="/Homepage" element={<Homepage />} />
                    <Route path="/Login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
