import Navbar from "./Components/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Routes/Login";
import Homepage from "./Routes/Homepage";
import { useState, useEffect } from "react";
import AdminDashboard from "./Routes/AdminDashboard";
import AdminNavbar from "./Components/AdminNavbar";
import CheckIn from "./Routes/CheckIn";
import EnrollPerson from "./Routes/EnrollPerson";
import RetrieveAllPerson from "./Routes/RetrieveAllPerson";
import CreateCollection from "./Routes/CreateCollection";
import ListRooms from "./Routes/ListRooms";
import Footer from "./Components/Footer";
import ViewPresence from "./Routes/ViewPresence";

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
                    <Route path="/" element={<Navigate to={token ? "/Dashboard" : "/Homepage"} />} />
                    <Route path="/Dashboard" element={<AdminDashboard />} />
                    <Route path="/CheckIn" element={<CheckIn/>}/>
                    <Route path="/EnrollStudent" element={<EnrollPerson />} />
                    <Route path="/RetrieveAllStudents" element={<RetrieveAllPerson/>} />
                    <Route path="/CreateCollection" element={<CreateCollection/>} />
                    <Route path="ListRooms" element={<ListRooms/>}/>
                    <Route path="/ViewPresence" element={<ViewPresence/>}/>
                </Routes>
                {isAdmin ? "" : <Footer/> }
            </BrowserRouter>
        </>
    );
}

export default App;
