/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import {Navigate, Outlet} from "react-router-dom";
import Header from "../components/Header.jsx";
import SideBarContent from "../components/sidebar/SideBarContent.jsx";

const PrivateRoute = ({sidebar}) => {
    return (
        localStorage.getItem('Access-Token') && sidebar === true ? (
            <>
                <div className={`flex h-screen bg-erp-soft-gray`}>
                    <SideBarContent/>
                    <div className={`flex flex-col w-full`}>
                        <Header/>
                        <div className={`m-10 h-full`}>
                            <Outlet/>
                        </div>
                    </div>
                </div>
            </>
        ) : localStorage.getItem('Access-Token') && sidebar === false ?(
            <Outlet/>
        ) : (
            <Navigate to={"/login"} replace={true}/>
        )
    );
};

export default PrivateRoute;