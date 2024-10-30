import { useState, useEffect } from "react";
import useAxios from "../../hook/useAxios.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { Status } from "../../data/status.js";
import { months } from "../../data/month.js";
import { year } from "../../data/year.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";

function OrderList() {
  const [showModal, setShowModal] = useState(false);
  const [buyerInfo, setBuyerInfo] = useState("");
  const [tableList, setTableList] = useState([]);

  /*검색 상태 저장 */
  let [searchForm, setSearchForm] = useState({
    buyer: "",
    orderStatus: "",
    month: "",
    year: "",
  });

  const navigate = useNavigate();
  const { fetchData } = useAxios();
  const { user } = useAuth();
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const getOrderList = async () => {
      const finalData = {
        user: "",
        buyer: "",
        status: "",
        month: currentMonth,
        year: currentYear,
      };
      console.log(finalData);
      try {
        const result = await fetchData({
          config: { method: "POST", url: "/api/order/list" },
          body: finalData,
        });
        if (result) {
          console.log(result.data);
          setTableList(result.data);
        }
      } catch (error) {
        console.error("디비 접속에 문제: ", error);
      }
    };
    getOrderList();
  }, [searchForm]);

  /*바이어 검색 변화 저장 */
  const handleBuyerChange = (e) => {
    setSearchForm((prev) => ({
      ...prev,
      buyer: buyerInfo.buyerCd,
    }));
  };

  /*요청상태 검색 변화 저장 */
  const handleStatusChange = (e) => {
    console.log(e.target.value);
    setSearchForm((prev) => ({
      ...prev,
      orderStatus: e.target.value,
    }));
  };

  /*월별 검색 변화 저장 */
  const handleMonthChange = (e) => {
    console.log(e.target.value);
    setSearchForm((prev) => ({
      ...prev,
      month: e.target.value,
    }));
  };

  /*년도 검색 변화 저장 */
  const handleYearChange = (e) => {
    console.log(e.target.value);
    setSearchForm((prev) => ({
      ...prev,
      year: e.target.value,
    }));
  };

  /*디테일 페이지로 이동 */
  const showDetailPage = (detailNo, detailStatus) => {
    if (
      detailStatus === "CREATE" ||
      detailStatus === "APRV_CNCL" ||
      detailStatus === "REJECT"
    ) {
      navigate("/order/edit", {
        state: { detailNo: detailNo },
      });
    } else {
      navigate("order/detail", { state: { detailNo: detailNo } });
    }
  };

  /*오더내역 리스트 검색 기능 */
  const submitForm = async () => {
    setSearchForm = {
      user: user.userCd,
      buyer: searchForm.buyer,
      status: searchForm.orderStatus,
      month: searchForm.month,
      year: searchForm.year,
    };
    console.log(searchForm);
    try {
      const result = await fetchData({
        config: { method: "POST", url: "/api/order/list" },
        body: searchForm,
      });
      if (result) {
        console.log(result.data);
        setTableList(result.data);
      }
    } catch (error) {
      console.error("디비 접속에 문제: ", error);
    }
  };

  return (
    <div className="flex bg-gray-100 ">
      <div className="flex-row p-7 w-[100%]">
        <div className="flex justify-between mt-10">
          <form className="flex justify-evenly gap-10">
            <div className="flex border">
              <p className="border-r px-4 bg-erp-mint pt-1">바이어</p>
              <input
                className="w-60 px-1"
                type="text"
                value={
                  buyerInfo ? `${buyerInfo.buyerNm} / ${buyerInfo.buyerCd}` : ""
                }
                onClick={() => setShowModal(true)}
                onChange={handleBuyerChange}
              />
            </div>

            <div className="border flex">
              <p className="border-r px-4 bg-erp-mint pt-1">요청상태</p>
              <select className="px-10" onChange={handleStatusChange}>
                {Status.map((stat) => (
                  <option
                    key={stat.id}
                    value={stat.id}
                    className="hover:bg-gray-400"
                  >
                    {stat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="border flex">
              <p className="border-r px-4 bg-erp-mint pt-1">년도</p>
              <select className="px-10" onChange={handleYearChange}>
                <option defaultChecked disabled={true}></option>
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
            <div className="border flex">
              <p className="border-r px-4 bg-erp-mint pt-1">월 </p>
              <select className="px-10" onChange={handleMonthChange}>
                <option defaultChecked disabled={true}></option>
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
            <button
              className="border px-4 py-1 bg-erp-green text-white"
              type="button"
              onClick={submitForm}
            >
              조회
            </button>
          </form>
          <Link to={"/orderForm"}>
            <button className="border px-4 py-1 bg-erp-green text-white ">
              등록
            </button>
          </Link>
        </div>

        {showModal && (
          <>
            <div
              className="fixed inset-0 bg-black opacity-50 z-40"
              onClick={() => setShowModal(false)}
            ></div>
            <ShowBuyerModal
              showModal={showModal}
              setShowModal={setShowModal}
              setBuyerInfo={setBuyerInfo}
            />
          </>
        )}
        <div className="flex items-center justify-center mt-10">
          <table className="border border-erp-gray border-collapse w-[100%] mt-10 p-2">
            <thead>
              <tr className="bg-erp-mint">
                <th className="p-1 border border-erp-gray">순번</th>
                <th className="p-1 border border-erp-gray">오더번호</th>
                <th className="p-1 border border-erp-gray">주문일자</th>
                <th className="p-1 border border-erp-gray">바이어명</th>
                <th className="p-1 border border-erp-gray">바이어코드</th>
                <th className="p-1 border border-erp-gray">등록일자</th>
                <th className="p-1 border border-erp-gray">요청상태</th>
              </tr>
            </thead>
            <tbody>
              {tableList.map((table, index) => (
                <tr
                  key={table.orderid}
                  onClick={() => showDetailPage(table.id, table.status)}
                  className={table.status === "REJECT" ? "bg-red-300" : ""}
                >
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{table.orderno}</td>
                  <td className="text-center">{table.orderdate}</td>
                  <td className="text-center">{table.buyernm}</td>
                  <td className="text-center">{table.buyercode}</td>
                  <td className="text-center">{table.adddate}</td>
                  <td className="text-center">{table.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const ShowBuyerModal = ({ showModal, setShowModal, setBuyerInfo }) => {
  const { fetchData } = useAxios();
  const [buyerValue, setBuyerValue] = useState("");
  const [buyers, setBuyers] = useState([]);
  const search = <FontAwesomeIcon icon={faMagnifyingGlass} />;

  const storeBuyerValue = (e) => {
    setBuyerValue(e.target.value);
  };

  console.log(buyerValue);

  const searchBuyerCode = async () => {
    if (buyerValue) {
      try {
        const result = await fetchData({
          config: {
            method: "GET",
            url: `/api/buyer/list?buyer=${buyerValue}`,
          },
        });
        if (result) {
          console.log(result.data);
          setBuyers(result.data);
        }
      } catch (error) {
        console.error("디비 접속에 문제: ", error);
      }
    }
  };

  const addBuyer = (buyer) => {
    setBuyerInfo(buyer);
    setShowModal(false);
  };

  return (
    <div
      className={`${
        showModal ? "block" : "hidden"
      } fixed inset-0  top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50 bg-white w-[900px] h-[600px] flex-col p-10`}
    >
      <h1 className="text-center  mb-10 font-bold">바이어 검색</h1>
      <button
        className="absolute top-4 right-4"
        onClick={() => setShowModal(false)}
      >
        닫기
      </button>
      <div className="flex justify-around mb-40">
        <form>
          <div className="flex justify-between items-center gap-5 ">
            <p>바이어</p>
            <input
              className="border border-erp-gray w-[200px] text-sm p-1"
              type="text"
              placeholder="검색어를 입력하세요"
              onChange={storeBuyerValue}
            />
            <button
              className="-translate-x-11"
              type="button"
              onClick={searchBuyerCode}
            >
              {search}
            </button>
          </div>
        </form>
      </div>

      {buyers.length ? (
        <table className="border border-erp-gray border-collapse w-[100%] mt-10 p-2">
          <thead>
            <tr className="border border-erp-gray bg-erp-mint">
              <th className="border border-erp-gray p-1">순번</th>
              <th className="border border-erp-gray p-1">바이어코드</th>
              <th className="border border-erp-gray p-1">바이어명</th>
              <th className="border border-erp-gray p-1">전화번호</th>
              <th className="border border-erp-gray p-1">이메일</th>
              <th className="border border-erp-gray p-1">주소</th>
              <th className="border border-erp-gray p-1">등록일</th>
            </tr>
          </thead>
          <tbody>
            {buyers.map((buyer, index) => (
              <tr key={buyer.buyerId} onClick={() => addBuyer(buyer)}>
                <td className="border border-erp-gray text-center">
                  {index + 1}
                </td>
                <td className="border border-erp-gray text-center">
                  {buyer.buyerCd}
                </td>
                <td className="border border-erp-gray text-center">
                  {buyer.buyerNm}
                </td>
                <td className="border border-erp-gray text-center">
                  {buyer.tel}
                </td>
                <td className="border border-erp-gray text-center">
                  {buyer.email}
                </td>
                <td className="border border-erp-gray text-center truncate w-48">
                  {buyer.address}
                </td>
                <td className="border border-erp-gray text-center">
                  {buyer.addDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-400">검색 결과가 없습니다</p>
      )}
    </div>
  );
};

export default OrderList;
