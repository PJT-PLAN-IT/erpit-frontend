// eslint-disable-next-line no-unused-vars
import React from 'react';
import {Navigate, Outlet} from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";

const PrivateRoute = () => {
    return (
        localStorage.getItem('Access-Token') ? (
            <>
                <Header/>
                <Sidebar/>
                <div className={`m-10`}>
                    <Outlet/>
                </div>
            </>
        ) : (
            <Navigate to={"/login"} replace={true}/>
        )
    );
};

export default PrivateRoute;