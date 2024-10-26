import {Route, Routes} from "react-router-dom";
import Login from "../pages/Login.jsx";
import PassChange from "../components/modal/PassChange.jsx";

function AppRoutes(){
    return(
        <Routes>
            {/*로그인*/}
            <Route path={`/login`} element={<Login />} />
            <Route path={`/pass`} element={<PassChange />} />

            {/*리포트*/}
            <Route path={`/reports`} />

            {/*오더*/}
            <Route path={`/orders/:user/:buyer/:status/:year/:month`} />
            <Route path={`/orders/detail/:orderid`} />


            {/*바이어관리*/}
            <Route path={`/buyers/:buyer`} />


            {/*직원관리*/}
            <Route path={`/users/:user`} />


            {/*판매부번관리*/}
            <Route path={`/items/:item`} />


            {/*바이어별 판매가격 관리*/}
            <Route path={`/buyer-sales/:item/:buyer`} />
            <Route path={`/buyer-sales`} />


        </Routes>
    )
}

export default AppRoutes;