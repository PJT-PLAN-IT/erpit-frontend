import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login.jsx";
import PassChange from "../components/modal/PassChange.jsx";
import BuyerList from "../pages/manages/BuyerList.jsx";
import UserList from "../pages/manages/UserList.jsx";
import ItemList from "../pages/manages/ItemList.jsx";
import PriceList from "../pages/manages/PriceList.jsx";

import Home from "../pages/Home.jsx";
import OrderList from "../pages/order/OrderList.jsx";
import OrderForm from "../pages/order/OrderForm.jsx";
import OrderCheck from "../pages/order/OrderCheck";
import OrderStatList from "../pages/order/OrderStatList";
import OrderDetail from "../pages/order/orderDetail.jsx";
import OrderEdit from "../pages/order/OrderEdit.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/*로그인*/}
      <Route path={`/login`} element={<Login />} />
      <Route path={`/pass`} element={<PassChange />} />
      {/*리포트*/}
      <Route path={`/report`} />

      {/*오더*/}
      <Route path="/order" element={<OrderForm />} />
      <Route path="/order/list" element={<OrderList />} />
      <Route path="/order/detail" element={<OrderDetail />} />
      <Route path="/order/edit" element={<OrderEdit />} />
      <Route path="/orderCheck" element={<OrderCheck />} />
      <Route path="/orderStatList" element={<OrderStatList />} />

      {/*바이어관리*/}
      <Route path={`/buyer`} element={<BuyerList />} />
      {/*직원관리*/}
      <Route path={`/user`} element={<UserList />} />
      {/*판매부번관리*/}
      <Route path={`/item`} element={<ItemList />} />

      {/*바이어별 판매가격 관리*/}
      <Route path={`/price`} element={<PriceList />} />
    </Routes>
  );
}

export default AppRoutes;
