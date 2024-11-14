import {useAuth} from "../context/AuthContext.jsx";
import {useEffect, useState} from "react";
import useAxios from "../hook/useAxios.js";
import Chart from "../components/reports/Chart.jsx";
import TopSalesList from "../components/reports/TopSalesList.jsx";
import TopUsersList from "../components/reports/TopUsersList.jsx";
import TopBuyerList from "../components/reports/TopBuyerList.jsx";
import Buttons from "../components/items/Buttons.jsx";
import Input from "../components/items/Input.jsx";
import gifRevenue from "../assets/img/revenue.gif";
import gifCount from "../assets/img/count.gif";
import gifOrderPrice from "../assets/img/orderprice.gif";
import {months} from "../data/month.js";
import {year} from "../data/year.js";
import UserSearch from "../components/modal/UserSearch.jsx";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faWonSign} from "@fortawesome/free-solid-svg-icons";

const initUser = {
    usercd: ''
}
const initSales = {
    '1월': 0,
    '2월': 0,
    '3월': 0,
    '4월': 0,
    '5월': 0,
    '6월': 0,
    '7월': 0,
    '8월': 0,
    '9월': 0,
    '10월': 0,
    '11월': 0,
    '12월': 0
};
const ReportSub = () => {
    const {user} = useAuth();
    const {error, fetchData} = useAxios();

    let today = new Date();
    const [month, setMonth] = useState(today.getMonth() + 1);
    const initData = {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        user: user.role === 'ROLE_ADMIN' ? '' : user.usercd
    }

    const [chart, setChart] = useState([]);
    const [sales, setSales] = useState(initSales);
    const [revenue, setRevenue] = useState(0);
    const [orderCount, setOrderCount] = useState(0);
    const [orderPrice, setOrderPrice] = useState(0);
    const [topBuyerList, setTopBuyerList] = useState([]);
    const [topSalesList, setTopSalesList] = useState([]);
    const [topUsersList, setTopUsersList] = useState([]);

    const [search, setSearch] = useState(initData);

    const [searchUserModalOpen, setSearchUserModalOpen] = useState(false);
    const [updateData, setUpdateData] = useState(initUser);
    const WonSign = <FontAwesomeIcon className={`size-6`} icon={faWonSign}/>

    useEffect(() => {
        if (user.role === 'ROLE_ADMIN') {
            fetchReportList();
        } else if (user.role === 'ROLE_USER' && search.user) {
            fetchReportList();
        }
    }, []);

    useEffect(() => {
        if (user.usercd) {
            setSearch({
                ...search,
                user: user.role === 'ROLE_ADMIN' ? '' : user.usercd
            });
        }
    }, [user]);

    useEffect(() => {
        if (user.role === 'ROLE_ADMIN') {
            fetchReportList();
        } else if (user.role === 'ROLE_USER' && search.user) {
            fetchReportList();
        }
    }, [search]);

    useEffect(() => {
        setSearch((prevData) => ({
            year: prevData.year,
            month: prevData.month,
            user: updateData.usercd || prevData.usercd,
        }));
    }, [updateData]);

    const fetchReportList = async () => {
        console.log("search보냄",search);
        try {
            const resultData = await fetchData({
                config: {method: "POST", url: "/api/report"},
                body: search
            });
            if (resultData) {
                const result = resultData.data;
                console.log("결과데이터", result);
                setChart(result.chart);
                setTopBuyerList(result.topBuyerList);
                setTopSalesList(result.topSalesList);
                setTopUsersList(result.topUsersList);
                setOrderCount(result.orderCount);
                setOrderPrice(result.orderPrice);
                setRevenue(result.revenue);
                setSales(initSales);
                setMonth(search.month);
            } else if (error) {
                console.error("Error: ", error);
            }
        } catch (err) {
            console.error("Error: ", err);
        }
    };

    const onSearchParam = (e) => {
        setSearch({
            year: today.getFullYear(),
            month: today.getMonth() + 1,
            user: user.role === 'ROLE_ADMIN' ? e : user.usercd
        })
        console.log(user.usercd, "확인");
    }
    const onHandleKeyDown = (e) => {
        if (e.key === 'Enter') {
            fetchReportList();
        }
    }

    const handleChange = (e) => {
        console.log("search",search);
        console.log(e);
        let {name, value} = e.target;
        setSearch({...search, [name]: value})
    }

    return (
        <div className="flex flex-col items-center justify-start bg-gray-100 h-full">
            <div className="w-full h-[5%] bg-amber-200 flex items-center justify-end rounded-lg shadow-lg mb-4 pr-10">
                <div className="flex justify-center items-center">
                    <p className="px-4 pt-1">년도</p>
                    <select
                        onChange={handleChange}
                        defaultValue={initData.year}
                        name="year"
                        className="mx-3 w-52 h-10 border border-erp-gray pl-2"
                    >
                        {year.map((year) => (
                            <option
                                key={year.id}
                                value={year.id}
                                className="hover:bg-gray-400"
                            >
                                {year.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-center items-center">
                    <p className="px-4 pt-1">월별</p>
                    <select
                        onChange={handleChange}
                        defaultValue={initData.month}
                        name="month"
                        className=" mx-3 w-52 h-10 border border-erp-gray pl-2"
                    >
                        {months.map((month) => (
                            <option
                                key={month.id}
                                value={month.id}
                                className="hover:bg-gray-400"
                            >
                                {month.name}
                            </option>
                        ))}
                    </select>
                </div>
                {user.role === 'ROLE_ADMIN' &&
                    <Input search={'user'} searchData={onSearchParam}
                           onKeyDown={onHandleKeyDown} onClick={() => setSearchUserModalOpen(true)}
                           data={updateData.usercd}/>
                }
                <Buttons style={'green-sm'} word={'reset'} onClick={fetchReportList}/>
            </div>

            <div className="w-full h-[50%] text-white flex mb-10">
                <div
                    className="w-[70%] h-full flex items-center justify-center bg-white rounded-lg shadow-lg p-10 mr-10">
                    <Chart chart={chart} sales={sales} setSales={setSales}/>
                </div>

                <div className="w-[30%] h-full flex flex-col justify-between">
                    <div className="w-full h-[33%] flex items-center mb-10 rounded-lg shadow-lg bg-white pl-7">
                        <div className={`size-32 justify-start`}>
                            <img src={gifRevenue} className={`h-full w-full`} alt={"revenue"}/>
                        </div>
                        <div className={`flex-row flex-grow justify-center`}>
                            <p className={`h-20 flex justify-end pr-10 text-5xl text-erp-green`}> {WonSign} {revenue.toLocaleString()} </p>
                            <p className={`h-10 flex justify-end items-center pr-10 text-xl text-black`}>연 매출</p>
                        </div>
                    </div>
                    <div className="w-full h-[33%] flex items-center mb-10 rounded-lg shadow-lg bg-white pl-7">
                        <div className={`size-32 justify-start`}>
                            <img src={gifCount} className={`h-full w-full`} alt={"revenue"}/>
                        </div>
                        <div className={`flex-row flex-grow justify-center`}>
                            <p className={`h-20 flex justify-end pr-10 text-5xl text-erp-green`}> {orderCount.toLocaleString()} 회 </p>
                            <p className={`h-10 flex justify-end items-center pr-10 text-xl text-black`}>총 주문 건수</p>
                        </div>
                    </div>
                    <div className="w-full h-[33%] flex items-center rounded-lg shadow-lg bg-white pl-7">
                        <div className={`size-32 justify-start`}>
                            <img src={gifOrderPrice} className={`h-full w-full`} alt={"revenue"}/>
                        </div>
                        <div className={`flex-row flex-grow justify-center`}>
                            <p className={`h-20 flex justify-end pr-10 text-5xl text-erp-green align-middle`}> {WonSign} {orderPrice.toLocaleString()}</p>
                            <p className={`h-10 flex justify-end items-center pr-10 text-xl text-black`}>총 주문 금액</p>
                        </div>
                    </div>
                </div>
            </div>


            <div className="w-full h-[40%] flex items-center justify-center">

                <TopUsersList topUsersList={topUsersList} month={month}/>

                <TopBuyerList topBuyerList={topBuyerList} month={month}/>

                <TopSalesList topSalesList={topSalesList} month={month}/>
            </div>
            <UserSearch searchUserModalOpen={searchUserModalOpen} setSearchUserModalOpen={setSearchUserModalOpen}
                        setUpdateData={setUpdateData}/>
        </div>


    );
};

export default ReportSub;
