import {Route, Routes} from "react-router-dom";
import Login from "../pages/Login.jsx";
import BuyerList from "../pages/manages/BuyerList.jsx";
import UserList from "../pages/manages/UserList.jsx";
import ItemList from "../pages/manages/ItemList.jsx";
import PriceList from "../pages/manages/PriceList.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import NotFound from "../pages/error/Notfound.jsx";
import ReportSub from "../pages/ReportSub.jsx";
import {useAuth} from "../context/AuthContext.jsx";
import OrderForm from "../pages/order/OrderForm.jsx";
import OrderList from "../pages/order/OrderList.jsx";
import OrderDetail from "../pages/order/OrderDetail.jsx";
import OrderEdit from "../pages/order/OrderEdit.jsx";
import OrderCheck from "../pages/order/OrderCheck.jsx";
import OrderStatList from "../pages/order/OrderStatList.jsx";
import PriceInsert from "../pages/manages/PriceInsert.jsx";
import PassChange from "../components/modal/PassChange.jsx";

const AppRoutes = () => {
    const {user} = useAuth();

    return (
        <Routes>
            {/* 로그인 */}
            <Route path={`/login`} element={<Login/>}/>

            {/* 비밀번호 변경 */}
            <Route path={`/passchange`} element={<PrivateRoute sidebar={false}/>}>
                <Route index={true} element={<PassChange/>}/>
            </Route>

            {/* 메인 */}
            <Route path={`/`} element={<PrivateRoute sidebar={true}/>}>
                <Route index={true} element={<ReportSub/>}/>
            </Route>

            {/* 리포트 */}
            <Route path={`/report`} element={<PrivateRoute sidebar={true}/>}>
                <Route index={true} element={<ReportSub/>}/>
            </Route>

            {/* 직원관리 */}
            <Route path={`/user`} element={<PrivateRoute sidebar={true}/>}>
                <Route index={true} element={<UserList/>}/>
            </Route>

            {/* 바이어관리 */}
            <Route path={`/buyer`} element={<PrivateRoute sidebar={true}/>}>
                <Route index={true} element={<BuyerList/>}/>
            </Route>

            {/* 판매부번관리 */}
            <Route path={`/item`} element={<PrivateRoute sidebar={true}/>}>
                <Route index={true} element={<ItemList/>}/>
            </Route>

            {/* 바이어별 판매가격 관리 */}
            <Route path={`/price`} element={<PrivateRoute sidebar={true}/>}>
                <Route index={true} element={<PriceList/>}/>
            </Route>

            {user.role === "ROLE_USER" && (
                <>
                    {/* 오더 */}
                    <Route path={`/order`} element={<PrivateRoute sidebar={true}/>}>
                        <Route index={true} element={<OrderForm/>}/>
                    </Route>
                    <Route path={`/order/list`} element={<PrivateRoute sidebar={true}/>}>
                        <Route index={true} element={<OrderList/>}/>
                    </Route>
                    <Route path={`/order/detail`} element={<PrivateRoute sidebar={true}/>}>
                        <Route index={true} element={<OrderDetail/>}/>
                    </Route>
                    <Route path={`/order/edit`} element={<PrivateRoute sidebar={true}/>}>
                        <Route index={true} element={<OrderEdit/>}/>
                    </Route>
                </>
            )}

            {user.role === "ROLE_ADMIN" && (
                <>
                    {/* 관리자 오더  */}
                    <Route path={`/order/check`} element={<PrivateRoute sidebar={true}/>}>
                        <Route index={true} element={<OrderCheck/>}/>
                    </Route>
                    <Route path={`/order/statlist`} element={<PrivateRoute sidebar={true}/>}>
                        <Route index={true} element={<OrderStatList/>}/>
                    </Route>
                    {/* 바이어별 판매가격 관리 */}
                    <Route path={`/price/add`} element={<PrivateRoute sidebar={true}/>}>
                        <Route index={true} element={<PriceInsert/>}/>
                    </Route>
                </>
            )}

            {/* Not Found */}
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    );
};

export default AppRoutes;
