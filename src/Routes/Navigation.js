import Navbar from "../Components/Navbar";
import {Routes, Route, Navigate, useNavigate} from "react-router-dom";
import Login from "./Login";
import Homepage from "./Homepage";
import { useState, useEffect } from "react";
import AdminDashboard from "./AdminDashboard";
import AdminNavbar from "../Components/AdminNavbar";
import CheckIn from "./CheckIn";
import EnrollPerson from "./EnrollPerson";
import RetrieveAllPerson from "./RetrieveAllPerson";
import CreateCollection from "./CreateCollection";
import ListRooms from "./ListRooms";
import Footer from "../Components/Footer";
import ViewPresence from "./ViewPresence";
import ProfessorDashboard from "./ProfessorDashboard";
import ProfessorNavbar from "../Components/ProfessorNavbar";
import ViewClasses from "./ViewClasses";

function Navigation() {
    const [token, setToken] = useState(localStorage.getItem('authToken'));
    const [roles, setRoles] = useState(JSON.parse(localStorage.getItem('roles')) || []);

    const navigate = useNavigate();
    useEffect(() => {
        if (token) {
            localStorage.setItem('authToken', token);
        } else {
            localStorage.removeItem('authToken');
        }

        if (roles.length > 0) {
            localStorage.setItem('roles', JSON.stringify(roles));
        } else {
            localStorage.removeItem('roles');
        }
    }, [token, roles]);


    const handleLoginSuccess = (token, roles) => {
        setToken(token);
        setRoles(roles);
    };

    const handleLogout = () => {
        setToken("");
        setRoles([]);
        localStorage.removeItem('authToken');
        localStorage.removeItem('roles');
        navigate("/Homepage");
    };

    const isAdmin = roles.includes('Admin');
    const isProfessor = roles.includes('Professor');

    console.log('Render')

    return (
        <>
            {isAdmin ? <AdminNavbar handleLogout={handleLogout}  />: isProfessor ? <ProfessorNavbar handleLogout={handleLogout} />: <Navbar/>}

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
                <Route path="/ProfessorDashboard" element={<ProfessorDashboard/>}/>
                <Route path="/ViewClasses" element={<ViewClasses/>}/>
            </Routes>

            {isAdmin || <Footer/> }
        </>
    );
}

export default Navigation;