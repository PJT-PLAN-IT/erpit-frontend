import {Route, Routes} from "react-router-dom";
import Login from "../pages/Login.jsx";
import PassChange from "../components/modal/PassChange.jsx";
import UserTables from "../components/tables/UserTables.jsx";
import BuyerTables from "../components/tables/BuyerTables.jsx";
import PriceTables from "../components/tables/PriceTables.jsx";
import ItemTables from "../components/tables/ItemTables.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import Input from "../components/items/Input.jsx";
import BuyerList from "../pages/manages/BuyerList.jsx";
import UserList from "../pages/manages/UserList.jsx";
import ItemList from "../pages/manages/ItemList.jsx";
import PriceList from "../pages/manages/PriceList.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import NotFound from "../pages/error/Notfound.jsx";
import Report from "../pages/Report.jsx";
import {useAuth} from "../context/AuthContext.jsx";

const AppRoutes = () => {
    const {user} = useAuth();

    return (
        <Routes>
            {/* 로그인 */}
            <Route path={`/login`} element={<Login/>}/>

            {
                (user.role === 'ROLE_USER' || user.role === 'ROLE_ADMIN') && (
                    <>
                        {/* 메인 */}
                        <Route path={`/`} element={<PrivateRoute/>}>
                            <Route index={true} element={<Report/>}/>
                        </Route>

                        {/* 리포트 */}
                        <Route path={`/report`} element={<PrivateRoute/>}>
                            <Route index={true} element={<Report/>}/>
                        </Route>

                        {/* 오더 */}
                        <Route path={`/order`} element={<PrivateRoute/>}>
                            <Route index={true}/>
                        </Route>
                        <Route path={`/order/detail`} element={<PrivateRoute/>}>
                            <Route index={true}/>
                        </Route>
                    </>
                )
            }

            {
                user.role === 'ROLE_ADMIN' && (
                    <>
                        {/* 직원관리 */}
                        <Route path={`/user`} element={<PrivateRoute/>}>
                            <Route index={true} element={<UserList/>}/>
                        </Route>
                    </>
                )
            }
            {/* 바이어관리 */}
            <Route path={`/buyer`} element={<PrivateRoute/>}>
                <Route index={true} element={<BuyerList/>}/>
            </Route>

            {/* 판매부번관리 */}
            <Route path={`/item`} element={<PrivateRoute/>}>
                <Route index={true} element={<ItemList/>}/>
            </Route>

            {/* 바이어별 판매가격 관리 */}
            <Route path={`/price`} element={<PrivateRoute/>}>
                <Route index={true} element={<PriceList/>}/>
            </Route>

            {/* Not Found */}
            <Route path="*" element={<NotFound/>}/>

            {/* 테스트 중 */}
            <Route path={`/sidebar`} element={<Sidebar/>}/>
            <Route path={`/header`} element={<Header/>}/>
            <Route path={`/userTables`} element={<UserTables/>}/>
            <Route path={`/buyerTables`} element={<BuyerTables/>}/>
            <Route path={`/priceTables`} element={<PriceTables/>}/>
            <Route path={`/itemTables`} element={<ItemTables/>}/>
            <Route path={`/input`} element={<Input/>}/>
            <Route path={`/pass`} element={<PassChange/>}/>
        </Routes>
    );
};

export default AppRoutes;