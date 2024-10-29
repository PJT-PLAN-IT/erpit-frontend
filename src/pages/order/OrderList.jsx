import { useState, useEffect } from "react";
import axios from "axios";
import { status } from "../../data/status.js";
import { months } from "../../data/month.js";
import SidebarContent from "../../components/sidebar/SideBarContent.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";

function OrderList() {
  const [showModal, setShowModal] = useState(false);
  const [buyerInfo, setBuyerInfo] = useState("");
  const [tableList, setTableList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {}, [tableList]);

  /*검색 상태 저장 */
  const [searchForm, setSearchForm] = useState({
    buyer: "",
    orderStatus: "",
    month: "",
    year: "",
  });

  /*바이어 검색 변화 저장 */
  const handleBuyerChange = (e) => {
    setSearchForm((prev) => ({
      ...prev,
      buyer: e.target.value,
    }));
  };

  /*요청상태 검색 변화 저장 */
  const handleStatusChange = (e) => {
    setSearchForm((prev) => ({
      ...prev,
      orderStatus: e.target.value,
    }));
  };

  /*월별 검색 변화 저장 */
  const handleMonthChange = (e) => {
    setSearchForm((prev) => ({
      ...prev,
      month: e.target.value,
    }));
  };

  /*년도 검색 변화 저장 */
  const handleYearChange = (e) => {
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
    const finalData = {
      user: "ER20240002",
      buyer: searchForm.buyer,
      status: searchForm.orderStatus,
      month: searchForm.month,
      year: searchForm.year,
    };

    try {
      const result = await axios.post("/order/list", finalData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (result) {
        console.log(result.data);
        setTableList(result.data.orderList);
      }
    } catch (error) {
      console.error("디비 접속에 문제: ", error);
    }
  };

  return (
    <div className="flex bg-gray-100">
      <SidebarContent />

      <div className="p-7 " style={{ width: "calc(100% - 300px)" }}>
        <div className="flex justify-between mt-10 ">
          <form className="flex justify-evenly gap-10 ">
            <div className="flex border">
              <p className="border-r px-4 bg-erp-mint pt-1">바이어</p>
              <input
                type="text"
                value={buyerInfo}
                onClick={() => setShowModal(true)}
                onChange={handleBuyerChange}
              />
            </div>

            <div className="border flex">
              <p className="border-r px-4 bg-erp-mint pt-1">요청상태</p>
              <select className="px-10" onChange={handleStatusChange}>
                {status.map((stat) => (
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
                <option className="hover:bg-gray-400" value={2024}>
                  2024
                </option>
              </select>
            </div>
            <div className="border flex">
              <p className="border-r px-4 bg-erp-mint pt-1">월 </p>
              <select className="px-10" onChange={handleMonthChange}>
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
                  className={table.status === "REJECT" ? "bg-red-400" : ""}
                >
                  <td>{index + 1}</td>
                  <td>{table.orderno}</td>
                  <td>{table.orderdate}</td>
                  <td>{table.buyernm}</td>
                  <td>{table.buyercode}</td>
                  <td>{table.adddate}</td>
                  <td>{table.status}</td>
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
  const [buyerValue, setBuyerValue] = useState("");
  const [buyers, setBuyers] = useState([]);
  const search = <FontAwesomeIcon icon={faMagnifyingGlass} />;

  const storeBuyerValue = (e) => {
    setBuyerValue(e.target.value);
  };

  const searchBuyerCode = async () => {
    if (buyerValue) {
      try {
        const result = await axios.get("/buyer/list", {
          params: { buyer: buyerValue },
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (result) {
          console.log(result.data);
          setBuyers(result.data.buyerList);
        }
      } catch (error) {
        console.error("디비 접속에 문제: ", error);
      }
    }
  };

  const addBuyer = (buyer) => {
    setBuyerInfo(`${buyer.buyernm} / ${buyer.id}`);
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
        <table>
          <thead>
            <tr>
              <th>순번</th>
              <th>바이어코드</th>
              <th>바이어명</th>
              <th>전화번호</th>
              <th>이메일</th>
              <th>주소</th>
              <th>등록일</th>
            </tr>
          </thead>
          <tbody>
            {buyers.map((buyer, index) => (
              <tr key={buyer.buyerid} onClick={() => addBuyer(buyer)}>
                <td>{index + 1}</td>
                <td>{buyer.buyercd}</td>
                <td>{buyer.buyernm}</td>
                <td>{buyer.tel}</td>
                <td>{buyer.email}</td>
                <td className="truncate w-48">{buyer.address}</td>
                <td>{buyer.adddate}</td>
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

// const ShowBuyerModal = ({ showModal, setShowModal, setBuyerInfo }) => {
//   // const [nameValue, setNameValue] = useState("");
//   const [codeValue, setCodeValue] = useState("");
//   const [buyers, setBuyers] = useState([]);
//   const search = <FontAwesomeIcon icon={faMagnifyingGlass} />;

//   const storeCodeValue = (e) => {
//     setCodeValue(e.target.value);
//   };

//   const searchBuyerCode = async () => {
//     if (codeValue) {
//       try {
//         const result = await axios.get("/buyer/list", {
//           params: { buyer: codeValue },
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//         if (result) {
//           console.log(result.data);
//           setBuyers(result.data.buyerList);
//         }
//       } catch (error) {
//         console.error("디비 접속에 문제: ", error);
//       }
//     }
//   };

//   // const searchBuyerName = async () => {
//   //   if (nameValue) {
//   //     try {
//   //       const result = await axios.post(
//   //         "",
//   //         { nameValue },
//   //         {
//   //           headers: {
//   //             "Content-Type": "application/json",
//   //           },
//   //         }
//   //       );
//   //       if (result) {
//   //         console.log(result.data);
//   //         setBuyers(result.data);
//   //       }
//   //     } catch (error) {
//   //       console.error("디비 접속에 문제: ", error);
//   //     }
//   //   }
//   // };

//   // const storeNameValue = (e) => {
//   //   setNameValue(e.target.value);
//   // };

//   const addBuyer = (buyer) => {
//     setBuyerInfo(`${buyer.buyernm} / ${buyer.id}`);
//     setShowModal(false);
//   };

//   return (
//     <div
//       className={`${
//         showModal ? "block" : "hidden"
//       } fixed inset-0  top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50 bg-white w-[900px] h-[600px] flex-col p-10`}
//     >
//       <h1 className="text-center  mb-10 font-bold">바이어 검색</h1>
//       <button
//         className="absolute top-4 right-4"
//         onClick={() => setShowModal(false)}
//       >
//         닫기
//       </button>
//       <div className="flex justify-around mb-40">
//         <form>
//           <div className="flex justify-between items-center gap-5 ">
//             <p>바이어</p>
//             <input
//               className="border w-[200px] text-sm p-1"
//               type="text"
//               placeholder="검색어를 입력하세요"
//               onChange={storeCodeValue}
//             />
//             <button
//               className="-translate-x-11"
//               type="button"
//               onClick={searchBuyerCode}
//             >
//               {search}
//             </button>
//           </div>
//         </form>
//         {/* <form>
//           <div className="flex justify-between items-center gap-5 ">
//             <p>바이어명</p>
//             <input
//               className="border  w-[200px] text-sm p-1"
//               type="text"
//               placeholder="바이어명을 입력하세요"
//               onChange={storeNameValue}
//             />
//             <button
//               className="-translate-x-11"
//               type="button"
//               onClick={searchBuyerName}
//             >
//               {search}
//             </button>
//           </div>
//         </form> */}
//       </div>

//       {buyers.length ? (
//         <table>
//           <thead>
//             <tr>
//               <th>순번</th>
//               <th>바이어코드</th>
//               <th>바이어명</th>
//               <th>전화번호</th>
//               <th>이메일</th>
//               <th>주소</th>
//               <th>등록일</th>
//             </tr>
//           </thead>
//           <tbody>
//             {buyers.map((buyer, index) => (
//               <tr key={buyer.buyerid} onClick={() => addBuyer(buyer)}>
//                 <td>{index + 1}</td>
//                 <td>{buyer.buyercd}</td>
//                 <td>{buyer.buyernm}</td>
//                 <td>{buyer.tel}</td>
//                 <td>{buyer.email}</td>
//                 <td className="truncate w-48">{buyer.address}</td>
//                 <td>{buyer.adddate}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p className="text-center text-gray-400">검색 결과가 없습니다</p>
//       )}
//     </div>
//   );
// };

export default OrderList;
