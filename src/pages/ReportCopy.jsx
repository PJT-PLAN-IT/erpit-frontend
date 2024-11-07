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
        <div className={`flex flex-col h-full`}>
            <div className={`h-[55px] flex flex-row`}>
                <div className={`flex flex-row justify-center items-center`}>
                    <Input search={'user'}/>
                    <Buttons style={'green-sm'} word={'search'}/>
                </div>
            </div>
            <div className={`flex flex-row pb-10 h-[50%]`}>
                <div className={`w-[70%] mr-20 px-10 py-5 h-full bg-white shadow-lg rounded`}>
                    <Chart chart={chart}/>
                </div>
                <div className={`flex flex-col flex-grow`}>
                    <div className={`border-2 border-lime-300 h-1/3 mb-4 `}>
                        <img src={gifRevenue} alt={"revenue"} className={`h-[80%]`}/>
                        <p className={`text-lg`}>{revenue.toLocaleString()} 원</p>
                        <p className={`text-lg`}> 매출(연누계) </p>
                    </div>

                    <div className={` border-2 border-amber-400 h-1/3 mb-4`}>
                        <p className={`text-lg`}> 총 주문 건수 </p>
                        <p className={`text-lg`}>{orderCount.toLocaleString()} 회</p>
                    </div>
                    <div className={` border-2 border-lime-500 h-1/3`}>
                        <p className={`text-lg`}> 총 주문 금액 </p>
                        <p className={`text-lg`}>{orderPrice.toLocaleString()} 원</p>
                    </div>
                </div>
            </div>
            <div className={`flex flex-row border-lime-500 border-2`}>
                {/*<div className={`w-1/3 mr-10 p-5 bg-white shadow-lg rounded`}>*/}
                    <TopUsersList topUsersList={topUsersList}/>
                {/*</div>*/}
                {/*<div className={`w-1/3 bg-white shadow-lg rounded mr-10`}>*/}
                    <TopBuyerList topBuyerList={topBuyerList}/>
                {/*</div>*/}
                {/*<div className={`w-1/3 bg-white shadow-lg rounded`}>*/}
                    <TopSalesList topSalesList={topSalesList}/>
                {/*</div>*/}
            </div>
        </div>
    );
};

export default Report;
