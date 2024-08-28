import React from 'react';
import {Navigate} from "react-router-dom";

export const ProtectedRoute = ({ role, children }) =>{
    if (role !== "Admin") {
        return <Navigate to="/Homepage" replace />;
    }

    return children;
}

export const ProfessorProtectedRoute = ({ role, children }) =>{
    if (role !== "Professor") {
        return <Navigate to="/Homepage" replace />;
    }

    return children;
}

export const StudentProtectedRoute = ({ role, children }) =>{
    if (role !== "Student") {
        return <Navigate to="/Homepage" replace />;
    }

    return children;
}