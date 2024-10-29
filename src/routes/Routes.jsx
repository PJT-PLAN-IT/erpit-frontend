import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login.jsx";
import PassChange from "../components/modal/PassChange.jsx";
import BuyerList from "../pages/manages/BuyerList.jsx";
import UserList from "../pages/manages/UserList.jsx";
import ItemList from "../pages/manages/ItemList.jsx";
import PriceList from "../pages/manages/PriceList.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import NotFound from "../pages/error/Notfound.jsx";
import Report from "../pages/Report.jsx";
import OrderList from "../pages/order/OrderList.jsx";
import OrderForm from "../pages/order/OrderForm.jsx";
import OrderCheck from "../pages/order/OrderCheck";
import OrderStatList from "../pages/order/OrderStatList";
import OrderDetail from "../pages/order/orderDetail.jsx";
import OrderEdit from "../pages/order/OrderEdit.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      {/* 로그인 */}
      <Route path={`/login`} element={<Login />} />

      {/* 메인 */}
      <Route path={`/`} element={<PrivateRoute />}>
        <Route index={true} element={<Report />} />
      </Route>

      {/* 리포트 */}
      <Route path={`/report`} element={<PrivateRoute />}>
        <Route index={true} element={<Report />} />
      </Route>

      {/* 오더 */}
      <Route path={`/order`} element={<PrivateRoute />}>
        <Route index={true} />
      </Route>
      <Route path={`/order/detail`} element={<PrivateRoute />}>
        <Route index={true} />
      </Route>

      {/*오더*/}
      <Route path="/order" element={<OrderForm />} />
      <Route path="/order/list" element={<OrderList />} />
      <Route path="/order/detail" element={<OrderDetail />} />
      <Route path="/order/edit" element={<OrderEdit />} />
      <Route path="/orderCheck" element={<OrderCheck />} />
      <Route path="/orderStatList" element={<OrderStatList />} />

      {/* 바이어관리 */}
      <Route path={`/buyer`} element={<PrivateRoute />}>
        <Route index={true} element={<BuyerList />} />
      </Route>

      {/* 직원관리 */}
      <Route path={`/user`} element={<PrivateRoute />}>
        <Route index={true} element={<UserList />} />
      </Route>

      {/* 판매부번관리 */}
      <Route path={`/item`} element={<PrivateRoute />}>
        <Route index={true} element={<ItemList />} />
      </Route>

      {/* 바이어별 판매가격 관리 */}
      <Route path={`/price`} element={<PrivateRoute />}>
        <Route index={true} element={<PriceList />} />
      </Route>

      {/* Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
