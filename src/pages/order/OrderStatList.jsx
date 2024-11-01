import { useState, useEffect } from "react";
import useAxios from "../../hook/useAxios.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { Status } from "../../data/status.js";
import { months } from "../../data/month.js";
import { year } from "../../data/year.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";

function OrderStatList() {
  const [showModal, setShowModal] = useState(false);
  const [buyerInfo, setBuyerInfo] = useState("");
  const [tableList, setTableList] = useState([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  /*검색 상태 저장 */
  let [searchForm, setSearchForm] = useState({
    buyer: "",
    orderStatus: "",
    month: "",
    year: "",
  });

  const navigate = useNavigate();
  const { fetchData } = useAxios();
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const getOrderList = async () => {
      const finalData = {
        user: "",
        buyer: "",
        status: "APRV_REQ",
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
          console.log("db data:", result.data);
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
  const showDetailPage = (detailNo) => {
    navigate("/order/check", {
      state: { detailNo: detailNo },
    });
  };

  /*오더내역 리스트 검색 기능 */
  const submitForm = async () => {
    const searchOrders = {
      buyer: buyerInfo.buyercd || "",
      status: searchForm.orderStatus || "",
      month: searchForm.month,
      year: searchForm.year,
    };
    console.log(searchOrders);

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

  const getStatName = (statusId) => {
    const statusObj = Status.find((status) => status.id === statusId);
    return statusObj ? statusObj.name : statusId;
  };

  return (
    <div className="flex bg-gray-100 ">
      <div className="flex-row p-7 w-[100%]">
        <div className="flex justify-between mt-10">
          <form className="flex justify-evenly gap-10">
            <div className="flex ">
              <p className="px-4  pt-1">바이어</p>
              <input
                className="w-60 px-1 border hover:cursor-pointer"
                placeholder="검색어를 입력하세요"
                type="text"
                value={
                  buyerInfo ? `${buyerInfo.buyernm} / ${buyerInfo.buyercd}` : ""
                }
                onClick={() => setShowModal(true)}
              />
              {buyerInfo.buyerCd && (
                <button
                  onClick={() => {
                    setBuyerInfo("");
                    setSearchForm((prev) => ({ ...prev, buyer: "" }));
                  }}
                  className=" px-2 text-black hover:text-gray-600"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex">
              <p className=" px-4 pt-1">요청상태</p>
              <select className="px-10" onChange={handleStatusChange}>
                <option>전체</option>
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
                    selected={year.id === currentYear}
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
                    selected={month.id === currentMonth}
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

        <div className="flex items-center justify-center mt-10 max-h-[600px] overflow-y-auto bg-gray-100 ">
          {tableList && tableList.length > 0 ? (
            <table className="border border-erp-gray border-collapse w-[100%] mt-10 p-2 bg-white  ">
              <thead className="sticky top-0 border border-erp-gray">
                <tr className="bg-erp-mint ">
                  <th className="p-1 border border-erp-gray ml-10 w-[10%]">
                    순번
                  </th>
                  <th className="p-1 border border-erp-gray ml-10 w-[10%]">
                    오더번호
                  </th>
                  <th className="p-1 border border-erp-gray ml-10  w-[15%]">
                    주문일자
                  </th>
                  <th className="p-1 border border-erp-gray ml-10 w-[30%]">
                    바이어명
                  </th>
                  <th className="p-1 border border-erp-gray ml-10 w-[10%]">
                    바이어코드
                  </th>
                  <th className="p-1 border border-erp-gray ml-10 w-[15%]">
                    등록일자
                  </th>
                  <th className="p-1 border border-erp-gray ml-10 w-[10%]">
                    요청상태
                  </th>
                </tr>
              </thead>

              <tbody className="">
                {tableList.map((table, index) => (
                  <tr
                    key={table.orderid}
                    onClick={() => showDetailPage(table.orderno)}
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
              <tr
                key={buyer.buyerId}
                onClick={() => addBuyer(buyer)}
                className="hover:cursor-pointer"
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
      ) : (
        <p className=" mp-10 mx-auto text-gray-400">검색 결과가 없습니다</p>
      )}
    </div>
  );
};

export default OrderStatList;
