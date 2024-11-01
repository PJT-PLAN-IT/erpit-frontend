import {adminRoutes, userRoutes} from "../../data/nav.js"; // 이거 권한별로 나눠야 메뉴바 사라질듯
import {Link, NavLink} from "react-router-dom";

import SidebarSubmenu from "./SideBarSubMenu.jsx";
import {useAuth} from "../../context/AuthContext.jsx";

function SidebarContent() {
    const {user} = useAuth();
    const authRoutes = user.role === 'ROLE_ADMIN' ? adminRoutes : userRoutes;

    return (
        <div className="py-4 text-white bg-erp-green w-[300px] h-[100%] ">
            <Link to={"/"}>
                <h1 className="text-center my-10 text-5xl font-bold">ERP-IT</h1>
            </Link>
            <div className="h-5 bg-dark"></div>
            <ul className="mt-6 flex-col">
                {authRoutes.map((route) =>
                        route.routes ? (
                            <SidebarSubmenu route={route} key={route.name} value={route.name}/>
                        ) : (
                            <li className="relative px-6 py-3 mt-10 " key={route.name}>
                                <NavLink
                                    exact
                                    to={route.path}
                                    className="inline-flex items-center w-full text-sm font-semibold  duration-150 "
                                >
                                    <span className="absolute inset-y-0 left-0 w-1 rounded-tr-lg rounded-br-lg"></span>

                                    <span className="ml-4 hover:underline text-xl">
                  {route.name}
                </span>
                                </NavLink>
                            </li>
                        )
                )}
            </ul>
        </div>
    );
}

export default SidebarContent;
