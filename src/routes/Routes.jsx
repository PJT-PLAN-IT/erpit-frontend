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

function AppRoutes() {
    return (
        <Routes>

            <Route path={`/sidebar`} element={<Sidebar/>}/>
            <Route path={`/header`} element={<Header/>}/>
            <Route path={`/userTables`} element={<UserTables/>}/>
            <Route path={`/buyerTables`} element={<BuyerTables/>}/>
            <Route path={`/priceTables`} element={<PriceTables/>}/>
            <Route path={`/itemTables`} element={<ItemTables/>}/>
            <Route path={`/input`} element={<Input/>}/>

            {/*로그인*/}
            <Route path={`/login`} element={<Login/>}/>
            <Route path={`/pass`} element={<PassChange/>}/>

            {/*리포트*/}
            <Route path={`/report`}/>

            {/*오더*/}
            <Route path={`/order`}/>
            <Route path={`/order/detail`}/>


            {/*바이어관리*/}
            <Route path={`/buyer`} element={<BuyerList/>}/>


            {/*직원관리*/}
            <Route path={`/user`} element={<UserList/>}/>


            {/*판매부번관리*/}
            <Route path={`/item`} element={<ItemList/>}/>


            {/*바이어별 판매가격 관리*/}
            <Route path={`/price`} element={<PriceList/>}/>


        </Routes>
    )
}

export default AppRoutes;