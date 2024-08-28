import Navbar from "../Layout/Navbar";
import {Routes, Route, Navigate, useNavigate} from "react-router-dom";
import Login from "./Login";
import Homepage from "./Homepage";
import { useState, useEffect } from "react";
import AdminDashboard from "./Admin/AdminDashboard";
import AdminNavbar from "../Layout/AdminNavbar";
import CheckIn from "./CheckIn";
import EnrollPerson from "./Admin/EnrollPerson";
import RetrieveAllPerson from "./Admin/RetrieveAllPerson";
import CreateCollection from "./Admin/CreateCollection";
import ListRooms from "./Admin/ListRooms";
import Footer from "../Layout/Footer";
import ViewPresence from "./Professor/ViewPresence";
import ProfessorDashboard from "./Professor/ProfessorDashboard";
import ProfessorNavbar from "../Layout/ProfessorNavbar";
import ViewClasses from "./Professor/ViewClasses";
import RegisterUser from "./Admin/RegisterUser";
import StudentDashboard from "./Student/StudentDashboard";
import {ProfessorProtectedRoute, ProtectedRoute, StudentProtectedRoute} from "./ProtectedRoute";
import CollectionInfo from "./Professor/CollectionInfo";
import {AddStudentToCollection} from "./Admin/AddStudentToCollection";
import StudentNavbar from "../Layout/StudentNavbar";
import Attendance from "./Student/Attendance";
import Classes from "./Student/Classes";


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
    const isStudent = roles.includes('Student');


    return (
        <>
            {isAdmin ? <AdminNavbar handleLogout={handleLogout}  /> : isProfessor ? <ProfessorNavbar handleLogout={handleLogout} /> : isStudent ? <StudentNavbar handleLogout={handleLogout}/> :  <Navbar/>}
            <Routes>
                <Route path="/Homepage" element={<Homepage/>} />
                <Route path="/CheckIn" element={<CheckIn/>}/>
                <Route path="/Login" element={<Login onLoginSuccess={handleLoginSuccess}/>} />
                <Route path="/" element={<Navigate to={"/Homepage"}/>} />

                <Route path="/Dashboard" element={
                    <ProtectedRoute role={isAdmin && 'Admin' }>
                        <AdminDashboard />
                    </ProtectedRoute>
                } />
                <Route path="/EnrollStudent" element={
                    <ProtectedRoute role={isAdmin && "Admin"}>
                        <EnrollPerson />
                    </ProtectedRoute>
                } />

                <Route path="/RetrieveAllStudents" element={<RetrieveAllPerson/>} />
                <Route path="/CreateCollection" element={<CreateCollection/>} />
                <Route path="ListRooms" element={<ListRooms/>}/>
                <Route path="/ViewPresence" element={<ViewPresence/>}/>

                <Route path="/ProfessorDashboard" element={
                    <ProfessorProtectedRoute role={isProfessor && "Professor"}>
                        <ProfessorDashboard />
                    </ProfessorProtectedRoute>
                } />

                <Route path="/ViewClasses" element={<ViewClasses/>}/>
                <Route path="/RegisterUser" element={<RegisterUser/>}/>

                <Route path="/StudentDashboard" element={
                    <StudentProtectedRoute role={isStudent && "Student" }>
                        <StudentDashboard />
                    </StudentProtectedRoute>
                } />
                <Route path="/Attendance" element={<Attendance/>}/>
                <Route path="/Classes" element={<Classes/>}/>
                <Route path="/CollectionInfo" element={<CollectionInfo/>}/>
                <Route path="/AddStudentToCollection" element={<AddStudentToCollection/>}/>
            </Routes>
            {isAdmin || <Footer/> }
        </>
    );
}

export default Navigation;