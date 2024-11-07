import {useAuth} from "../context/AuthContext.jsx";
import Chart from "../components/reports/Chart.jsx";
import {useEffect, useState} from "react";
import useAxios from "../hook/useAxios.js";
import TopSalesList from "../components/reports/TopSalesList.jsx";
import TopUsersList from "../components/reports/TopUsersList.jsx";
import TopBuyerList from "../components/reports/TopBuyerList.jsx";
import Buttons from "../components/items/Buttons.jsx";
import Input from "../components/items/Input.jsx";
import gifRevenue from "../assets/img/revenue.gif";

const Report = () => {
    const {user} = useAuth();
    const {error, fetchData} = useAxios();
    let today = new Date();
    const initData = {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        user:  user.role ==='ROLE_ADMIN' ? '' : user.usercd
    };
    console.log("??",user.role,",",user.usercd);
    const [chart, setChart] = useState([]);
    const [topBuyerList, setTopBuyerList] = useState([]);
    const [topSalesList, setTopSalesList] = useState([]);
    const [topUsersList, setTopUsersList] = useState([]);
    const [search, setSearch] = useState(initData);
    const [orderCount, setOrderCount] = useState(0);
    const [orderPrice, setOrderPrice] = useState(0);
    const [revenue, setRevenue] = useState(0);
    useEffect(() => {
        console.log(user.role,",",user.usercd);
        fetchReportList();
    }, []);

    const fetchReportList = async () => {
        console.log(search);
        try {
            const resultData = await fetchData({
                config: {method: "POST", url: "/api/report"},
                body: search
            });
            if (resultData) {
                console.log("resultdata", resultData);
                const result = resultData.data;
                setChart(result.chart);
                setTopBuyerList(result.topBuyerList);
                setTopSalesList(result.topSalesList);
                setTopUsersList(result.topUsersList);
                setOrderCount(result.orderCount);
                setOrderPrice(result.orderPrice);
                setRevenue(result.revenue);
            } else if (error) {
                console.error("Error: ", error);
            }
        } catch (err) {
            console.error("Error: ", err);
        }
    };

    return (
        <div className="flex flex-col items-center justify-start bg-gray-100 h-full">
            {/* 첫 번째 박스 */}
            <div
                className="w-full h-[5%] bg-amber-300 text-white flex items-center justify-center rounded-lg shadow-lg mb-4">
                첫 번째 박스 (5%)
            </div>

            {/* 두 번째 박스 */}
            <div className="w-full h-[50%] bg-blue-500 text-white flex mb-10">
                {/* 왼쪽 60% 차지하는 div */}
                <div className="w-[60%] h-full bg-green-900 flex items-center justify-center">
                    왼쪽 박스 (60%)
                </div>

                {/* 오른쪽 40% 차지하는 div, 내부에 3개의 세로 정렬된 div */}
                <div className="w-[40%] h-full flex flex-col justify-between">
                    <div className="w-full h-[33%] bg-red-300 text-white flex items-center justify-center">
                        세로 박스 1
                    </div>
                    <div className="w-full h-[33%] bg-red-400 text-white flex items-center justify-center">
                        세로 박스 2
                    </div>
                    <div className="w-full h-[33%] bg-red-500 text-white flex items-center justify-center">
                        세로 박스 3
                    </div>
                </div>
            </div>

            {/* 세 번째 박스 */}
            <div
                className="w-full h-[40%] bg-red-500 text-white flex items-center justify-center rounded-lg shadow-lg">
                세 번째 박스 (45%)
            </div>
        </div>

    );
};

export default Report;
