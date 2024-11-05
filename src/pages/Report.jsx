import {useAuth} from "../context/AuthContext.jsx";
import Chart from "../components/reports/Chart.jsx";
import {useEffect, useState} from "react";
import useAxios from "../hook/useAxios.js";
import TopSalesList from "../components/reports/TopSalesList.jsx";
import TopUsersList from "../components/reports/TopUsersList.jsx";
import TopBuyerList from "../components/reports/TopBuyerList.jsx";

const Report = () => {
    const {user} = useAuth();
    const {error, fetchData} = useAxios();
    let today = new Date();
    const initData = {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        user: ''
    };

    const [chart, setChart] = useState([]);
    const [topBuyerList, setTopBuyerList] = useState([]);
    const [topSalesList, setTopSalesList] = useState([]);
    const [topUsersList, setTopUsersList] = useState([]);
    const [search, setSearch] = useState(initData);
    const [orderCount, setOrderCount] = useState(0);
    const [orderPrice, setOrderPrice] = useState(0);
    const [revenue, setRevenue] = useState(0);
    useEffect(() => {
        fetchReportList();
    }, []);

    const fetchReportList = async () => {
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
            <div className={`flex flex-col justify-between h-full`}>
                <div className={`flex flex-row h-1/10 pb-10`}>

                </div>
                <div className={`flex flex-row h-2/3 pb-10`}>
                    <div className={`w-3/5 mr-20 p-10 py-16 h-full bg-white shadow-lg rounded`}>
                        <Chart chart={chart}/>
                    </div>
                    <div className={`w-2/5 h-full`}>
                        <div className={`h-1/3 w-full pb-5`}>
                            <div className={`bg-white w-full h-full shadow-lg rounded p-5 flex flex-col`}>
                                <h1 className={`font-semibold text-2xl text-erp-green pb-7`}>{today.getMonth() + 1}월 총 주문 현황</h1>
                                <div className={`flex-1 flex flex-col space-y-4`}>
                                    <div
                                        className={`border-b border-erp-soft-gray flex flex-row justify-between items-center p-3`}>
                                        <p className={`text-lg`}> 총 주문 건수 </p>
                                        <p className={`text-lg`}>{orderCount}</p>
                                    </div>
                                    <div
                                        className={`border-b border-erp-soft-gray flex flex-row justify-between items-center p-3`}>
                                        <p className={`text-lg`}> 총 주문 금액 </p>
                                        <p className={`text-lg`}>{orderPrice} 원</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <TopSalesList topSalesList={topSalesList}/>
                    </div>
                </div>
                <div className={`flex flex-row h-2/3`}>
                    <div className={`w-1/2 mr-20 shadow-lg rounded`}>
                        <TopUsersList topUsersList={topUsersList}/>
                    </div>
                    <div className={`w-1/2 shadow-lg rounded`}>
                        <TopBuyerList topBuyerList={topBuyerList}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Report;
