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
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  /*검색 상태 저장 */
  let [searchForm, setSearchForm] = useState({
    user: "",
    buyer: "",
    orderStatus: "APRV_REQ",
    month: currentMonth,
    year: currentYear,
  });

  console.log("searchForm:", searchForm);
  const navigate = useNavigate();
  const { fetchData } = useAxios();

  useEffect(() => {
    const getOrderList = async () => {
      const finalData = {
        user: "",
        buyer: "",
        status: "APRV_REQ",
        month: currentMonth,
        year: currentYear,
      };
      console.log("initial load Data: ", finalData);
      try {
        const result = await fetchData({
          config: { method: "POST", url: "/api/order/list" },
          body: finalData,
        });
        if (result) {
          console.log("result data from init: ", result.data);
          setTableList(result.data);
        }
      } catch (error) {
        console.error("디비 접속에 문제: ", error);
      } finally {
        setIsInitialLoad(false);
      }
    };
    if (isInitialLoad) getOrderList();
  }, [isInitialLoad]);

  useEffect(() => {
    if (buyerInfo?.buyerCd) {
      setSearchForm((prev) => ({
        ...prev,
        buyer: buyerInfo.buyerCd,
      }));
      console.log("Updated searchForm buyer:", buyerInfo.buyerCd);
    }
  }, [buyerInfo]);

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
      navigate("/order/detail", { state: { detailNo: detailNo } });
    }
  };

  /*오더내역 리스트 검색 기능 */
  const submitForm = async () => {
    const searchOrders = {
      user: "",
      buyer: buyerInfo.buyercd || "",
      status: searchForm.orderStatus || "",
      month: searchForm.month,
      year: searchForm.year,
    };
    console.log("new search req: ", searchOrders);

    try {
      const result = await fetchData({
        config: { method: "POST", url: "/api/order/list" },
        body: searchOrders,
      });
      if (result) {
        console.log(result);
        setTableList(result.data);
      }
      setIsInitialLoad(true);
    } catch (error) {
      console.error("디비 접속에 문제: ", error);
    } finally {
      setIsInitialLoad(false);
    }
  };

  /*초기화 버튼 */
  const resetButton = async () => {
    setSearchForm({
      buyer: "",
      orderStatus: "APRV_REQ",
      month: currentMonth,
      year: currentYear,
    });
    setBuyerInfo("");
    const searchOrders = {
      buyer: "",
      status: "APRV_REQ",
      month: currentMonth,
      year: currentYear,
    };

    try {
      const result = await fetchData({
        config: { method: "POST", url: "/api/order/list" },
        body: searchOrders,
      });
      if (result) {
        console.log(result);
        setTableList(result.data);
      }
    } catch (error) {
      console.error("디비 접속에 문제: ", error);
    } finally {
      setIsInitialLoad(false);
    }
  };

  const getStatName = (statusId) => {
    const statusObj = Status.find((status) => status.id === statusId);
    return statusObj ? statusObj.name : statusId;
  };

  return (
    <div className="flex bg-gray-100 ">
      <div className="flex-row p-7 w-[100%]">
        <div className="flex mt-10">
          <form className="flex justify-evenly gap-2">
            <div className="flex -ml-4">
              <p className="px-4  pt-1">바이어</p>
              <input
                className="w-60 px-1 border border-erp-gray hover:cursor-pointer"
                placeholder="검색어를 입력하세요"
                type="text"
                value={
                  buyerInfo ? `${buyerInfo.buyernm} / ${buyerInfo.buyercd}` : ""
                }
                onClick={() => setShowModal(true)}
              />
            </div>
            {buyerInfo && (
              <button
                onClick={() => {
                  setBuyerInfo("");
                  setSearchForm((prev) => ({ ...prev, buyer: "" }));
                }}
                className=" px-2 text-black hover:text-gray-600 z-50"
              >
                ✕
              </button>
            )}
            <div className="flex">
              <p className=" px-4 pt-1">요청상태</p>
              <select
                className="px-10 border border-erp-gray"
                onChange={handleStatusChange}
                defaultValue={searchForm.orderStatus}
              >
                {Status.map((stat) => (
                  <option
                    key={stat.id}
                    value={stat.id}
                    selected={searchForm.orderStatus === stat.id}
                    className="hover:bg-gray-400"
                  >
                    {stat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className=" flex">
              <p className="px-4  pt-1">년도</p>
              <select
                className="px-10  border border-erp-gray"
                onChange={handleYearChange}
                defaultValue={currentYear}
              >
                {year.map((year) => (
                  <option
                    key={year.id}
                    value={year.id}
                    selected={year.id === searchForm.year}
                    className="hover:bg-gray-400"
                  >
                    {year.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex">
              <p className=" px-4 pt-1">월별 </p>
              <select
                className="px-10  border border-erp-gray"
                onChange={handleMonthChange}
                defaultValue={currentMonth}
              >
                {months.map((month) => (
                  <option
                    key={month.id}
                    value={month.id}
                    selected={month.id === searchForm.month}
                    className="hover:bg-gray-400"
                  >
                    {month.name}
                  </option>
                ))}
              </select>
            </div>
            <div className=" ml-5 flex gap-5">
              <button
                className="border px-4 py-1 bg-erp-green text-white"
                type="button"
                onClick={submitForm}
              >
                조회
              </button>
              <button
                className="border px-4 bg-white border-erp-gray"
                onClick={resetButton}
                type="button"
              >
                초기화
              </button>
            </div>
          </form>
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
        <div className="relative">
          <div className="mt-10 absolute w-[100%] max-h-[75vh] overflow-y-auto">
            {tableList && tableList.length > 0 ? (
              <table className="border border-erp-gray border-collapse w-[100%] mt-10 p-2 bg-white">
                <thead className="sticky top-0">
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
                      onClick={() =>
                        showDetailPage(table.orderno, table.status)
                      }
                      className="hover:bg-erp-soft-gray cursor-pointer"
                    >
                      <td className="text-center border border-erp-gray">
                        {index + 1}
                      </td>
                      <td className="text-center border border-erp-gray">
                        {table.orderno}
                      </td>
                      <td className="text-center border border-erp-gray">
                        {table.orderdate}
                      </td>
                      <td className="text-center border border-erp-gray">
                        {table.buyernm}
                      </td>
                      <td className="text-center border border-erp-gray">
                        {table.buyercode}
                      </td>
                      <td className="text-center border border-erp-gray">
                        {table.adddate}
                      </td>
                      <td className="text-center border border-erp-gray">
                        {getStatName(table.status)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="mx-auto py-10 text-center">검색결과가 없습니다.</p>
            )}
          </div>
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
  const [initLoad, setInitLoad] = useState(true);
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

  useEffect(() => {
    const searchBuyerCode = async () => {
      try {
        const result = await fetchData({
          config: {
            method: "GET",
            url: `/api/buyer/list`,
          },
        });
        if (result) {
          console.log(result.data);
          setBuyers(result.data);
        }
      } catch (error) {
        console.error("디비 접속에 문제: ", error);
      }
    };
    searchBuyerCode();
    setInitLoad(false);
  }, [initLoad]);

  const FindBuyerCode = (e) => {
    {
      if (e.key == "Enter") {
        e.preventDefault();
        searchBuyerCode();
      }
    }
  };

  const addBuyer = (buyer) => {
    console.log("Selected Buyer:", buyer);
    setBuyerInfo(buyer);
    setShowModal(false);
  };

  return (
    <div
      className={`${
        showModal ? "block" : "hidden"
      } fixed inset-0  top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50 bg-white w-[900px] h-[600px] flex-col p-10`}
    >
      <div className="relative">
        <h1 className="text-center text-2xl  mb-5 font-bold">바이어 검색</h1>
        <button
          className="absolute top-4 right-4"
          onClick={() => setShowModal(false)}
        >
          ✕
        </button>
        <div className=" flex justify-start mb-14">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="flex justify-between items-center gap-2 ">
              <p>바이어</p>
              <input
                className="border border-erp-gray w-[200px] text-xs p-1"
                type="text"
                placeholder="검색어를 입력하세요"
                onChange={storeBuyerValue}
                onKeyDown={FindBuyerCode}
              />
              <button
                className="-translate-x-12 z-50  px-1"
                type="button"
                onClick={searchBuyerCode}
              >
                {search}
              </button>
            </div>
          </form>
        </div>

        {buyers.length ? (
          <div className="absolute top-24 max-h-[450px] overflow-y-auto w-[100%] ">
            <table className="border border-erp-gray border-collapse w-[100%] mt-10 p-2 ">
              <thead className="sticky top-0 w-[100%]">
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
                  <tr
                    key={buyer.buyerId}
                    onClick={() => addBuyer(buyer)}
                    className="hover:cursor-pointer hover:bg-erp-soft-gray"
                  >
                    <td className="border border-erp-gray text-center">
                      {index + 1}
                    </td>
                    <td className="border border-erp-gray text-center">
                      {buyer.buyercd}
                    </td>
                    <td className="border border-erp-gray text-center">
                      {buyer.buyernm}
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
                      {buyer.adddate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mp-10 text-center text-gray-400">
            검색 결과가 없습니다
          </p>
        )}
      </div>
    </div>
  );
};

export default OrderList;
