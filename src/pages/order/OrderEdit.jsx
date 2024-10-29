// import { useState, useEffect } from "react";
// import { useLocation, Navigate } from "react-router-dom";
// import axios from "axios";
// import { rejects } from "../../data/rejects";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
// import { faCircleMinus } from "@fortawesome/free-solid-svg-icons";

// function OrderEdit() {
//   const [detail, setDetail] = useState({
//     orderid: null,
//     orderno: null,
//     orderdate: "",
//     usercd: "",
//     buyercd: "",
//     status: "",
//     rejectcode: "",
//     rejectreason: "",
//     itemList: [],
//   });
//   const location = useLocation();
//   const { detailNo } = location.state || {};
//   const [reject, setReject] = useState("");
//   const [leavePage, setleavepage] = useState(false);
//   const [redirect, setRedirect] = useState(false);

//   useEffect(() => {
//     if (detailNo) {
//       const getDetail = async () => {
//         try {
//           const result = await axios.get("order/detail", {
//             params: { orderno: detailNo },
//           });
//           if (result) {
//             console.log(result.data);
//             setDetail(result.data);
//           }
//         } catch (error) {
//           console.error("디비 접속에 문제:", error);
//         }
//       };

//       getDetail();
//     }
//   }, [detailNo]);

//   /*아이템 테이블 행 삭제 */
//   const deleteRow = (id) => {
//     setDetail((prevForm) => ({
//       ...prevForm,
//       items: prevForm.items.filter((item) => item.id !== id),
//     }));
//   };

//   /*아이템 테이블 변경사항 저장 */
//   const handleItemChange = (id, field, value) => {
//     setDetail((prevForm) => ({
//       ...prevForm,
//       items: prevForm.items.map((item) => {
//         if (item.id === id) {
//           const updatedItem = { ...item, [field]: value };
//           updatedItem.totalprice =
//             (updatedItem.setprice + updatedItem.tax) * updatedItem.quantity;
//           return updatedItem;
//         }
//         return item;
//       }),
//     }));
//   };

//   /*오더 수량 전체 계산 */
//   const calculateTotalQuantity = () =>
//     detail.items.reduce((sum, item) => sum + item.orderqty, 0);

//   /*오더 원가 전체 계산 */
//   const calculateTotalOriginPrice = () =>
//     detail.items.reduce((sum, item) => sum + item.originprice, 0);

//   /*오더 공급가 전체 계산 */
//   const calculateTotalSetPrice = () =>
//     detail.items.reduce((sum, item) => sum + item.buyersupplyprice, 0);

//   /*오더 부가세 전체 계산 */
//   const calculateTotalTax = () =>
//     detail.items.reduce((sum, item) => sum + item.surtax, 0);

//   /*오더 합계금액 전체 계산 */
//   const calculateTotalPrice = () =>
//     detail.items.reduce(
//       (sum, item) => sum + item.salesprice * item.orderqty,
//       0
//     );

//   /*오더 총 합계 계산 */
//   const calculateTotalSum = () =>
//     detail.items.reduce(
//       (sum, item) => sum + item.salesprice * item.orderqty,
//       0
//     );

//   /*오더폼 삭제 */
//   const deleteOrderForm = () => {
//     const confirmDelete = window.confirm(
//       "작성하시던 폼을 삭제하시겠습니까? 삭제시 오더 리스트로 리다이렉팅합니다."
//     );
//     if (confirmDelete) {
//       setDetail({});
//       setleavepage(true);
//     }
//   };

//   if (leavePage) {
//     return <Navigate to="/orderList" replace />;
//   }

//   /*요청상태 검색 변화 저장 */
//   const handleDateChange = (e) => {
//     setDetail((prev) => ({
//       ...prev,
//       orderdate: e.target.value,
//     }));
//   };

//   /*요청상태 검색 변화 저장 */
//   const handleStatusChange = (e) => {
//     setDetail((prev) => ({
//       ...prev,
//       status: e.target.value,
//     }));
//   };

//   /*반려 변화 저장 */
//   const handleRejectChange = (e) => {
//     setReject(e.target.value);
//     setDetail((prev) => ({
//       ...prev,
//       reject: e.target.value,
//     }));
//   };

//   /*반려 사유 저장 */
//   const handleRejectInfoChange = (e) => {
//     setDetail((prev) => ({
//       ...prev,
//       rejectInfo: e.target.value,
//     }));
//   };

//   /*날짜 */
//   const today = new Date();
//   const month = today.getMonth() + 1;
//   const year = today.getFullYear();
//   const date = today.getDate();
//   const currentDate = month + "/" + date + "/" + year;

//   /*아이콘  */
//   const deleteIcon = <FontAwesomeIcon icon={faCircleMinus} />;

//   /*오더폼 확인 */
//   const validateOrderForm = (form) => {
//     // Check if form-level required fields are filled
//     if (!form.orderdate) {
//       alert("주문 날짜를 입력해주세요");
//       return false;
//     }
//     if (!form.buyercode) {
//       alert("바이어 정보를 입력해주세요");
//       return false;
//     }

//     // Check if all required item fields are filled
//     for (const item of form.items) {
//       if (item.orderqty === 0 || item.orderqty <= 0) {
//         alert("발주 수량을 입력해주세요");
//         return false;
//       }
//       if (item.ordersalesprice === 0) {
//         alert("공급가를 입력해주세요.");
//         return false;
//       }
//       if (!item.deliverydate) {
//         alert("납품 요청일을 입력해주세요");
//         return false;
//       }
//     }

//     return true;
//   };
//   /*오더폼 등록 */
//   const submitOrderForm = async (form) => {
//     const itemLists = form.items.map((item) => ({
//       buyeritemcd: item.itemcd,
//       ordersalesprice: item.salesprice,
//       ordersupplyprice: item.ordersupplyprice,
//       ordersurtax: item.ordersurtax,
//       orderqty: item.orderqty,
//       deliverydate: item.deliverydate,
//     }));

//     const orderFormInfo = {
//       orderdate: form.orderdate,
//       usercd: "ER20240002",
//       buyercd: form.buyercode,
//       status: form.status,
//       itemLists: itemLists,
//     };

//     if (!validateOrderForm(form)) {
//       return;
//     }

//     /*axios */
//     if (window.confirm("오더를 등록하시겠습니까?")) {
//       orderFormInfo.status = "APRV_REQ";
//       try {
//         await axios.post("/order", orderFormInfo, {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//         setRedirect(true);
//       } catch (error) {
//         console.error("디비 접속에 문제: ", error);
//       }
//     }
//   };

//   if (redirect) {
//     return <Navigate to="/orderList" replace />;
//   }
//   /*테이블에 오더가 추가 될때마다 새로고침 */
//   //   useEffect(() => {}, [detail.itemList]);

//   return (
//     <div className="flex">
//       <div
//         className="flex-col bg-erp-soft-gray p-7"
//         style={{ width: "calc(100% - 300px)" }}
//       >
//         <div className="flex justify-self-end gap-4 w-[170px] my-10 ">
//           <button
//             className="border border-erp-gray px-4 bg-white text-black"
//             onClick={deleteOrderForm}
//           >
//             삭제
//           </button>
//           <button
//             className="border border-erp-gray px-4 bg-erp-green text-white"
//             onClick={submitOrderForm}
//           >
//             등록
//           </button>
//         </div>
//         <div className="headerTable">
//           <table className="border border-erp-gray border-collapse w-[100%] mt-10 bg-white">
//             <tr>
//               <td className="border border-erp-gray bg-erp-mint text-center">
//                 오더번호
//               </td>
//               <td className="border border-erp-gray">{detail.orderno}</td>
//               <td className="border border-erp-gray bg-erp-mint text-center">
//                 주문일자
//               </td>
//               <td className="border border-erp-gray">{detail.orderdate}</td>
//               <td className="border border-erp-gray bg-erp-mint text-center">
//                 등록일자
//               </td>
//               <td className="border border-erp-gray">{currentDate}</td>
//             </tr>
//             <tr>
//               <td className="border border-erp-gray bg-erp-mint text-center">
//                 직원코드
//               </td>
//               <td>{detail.usercd}</td>
//               <td className="border border-erp-gray bg-erp-mint text-center ">
//                 바이어 코드
//               </td>
//               <td className="border border-erp-gray">{detail.buyercd}</td>
//               <td className="border border-erp-gray bg-erp-mint text-center">
//                 바이어명
//               </td>
//               <td className="border border-erp-gray ">
//                 {/*get buyername from db */}
//               </td>
//             </tr>
//             <tr className="">
//               <td className="border border-erp-gray bg-erp-mint text-center">
//                 상태관리
//               </td>
//               <td className="border border-erp-gray">
//                 <select className="px-10" onChange={handleStatusChange}>
//                   <option
//                     value={detail.status}
//                     className="border border-erp-gray hover:bg-gray-400"
//                   >
//                     생성중
//                   </option>
//                 </select>
//               </td>
//               <>
//                 <td className="border border-erp-gray bg-erp-mint text-center">
//                   반려사유
//                 </td>
//                 {detail.status === "REJECT" ? (
//                   <td className="border border-erp-gray border border-erp-gray-r-0 flex gap-5 text-center">
//                     <select className="px-10" onChange={handleRejectChange}>
//                       {rejects.map((reject) => (
//                         <option
//                           key={reject.id}
//                           value={reject.id}
//                           className="border border-erp-gray hover:bg-gray-400"
//                         >
//                           {reject.name}
//                         </option>
//                       ))}
//                     </select>
//                     {detail.rejectcode === "ETC" ? (
//                       <input
//                         className="border border-erp-gray w-[200px]"
//                         type="text"
//                         placeholder="기타사유를 입력하세요"
//                         onChange={handleRejectInfoChange}
//                       />
//                     ) : (
//                       ""
//                     )}
//                   </td>
//                 ) : (
//                   ""
//                 )}
//               </>
//             </tr>
//           </table>
//         </div>

//         <div className="orderListTable mt-5 ">
//           <h1 className="text-center font-medium text-xl">오더 품목 리스트</h1>
//           <div className="max-h-96 overflow-y-auto">
//             <table className="border border-erp-gray border-collapse w-[100%] my-5 bg-white">
//               <thead>
//                 <tr>
//                   <th className="border border-erp-gray bg-erp-mint">순번</th>
//                   <th className="border border-erp-gray bg-erp-mint">
//                     판매부번 코드
//                   </th>
//                   <th className="border border-erp-gray bg-erp-mint">품명</th>
//                   <th className="border border-erp-gray bg-erp-mint">
//                     발주수량
//                   </th>
//                   <th className="border border-erp-gray bg-erp-mint">원가</th>
//                   <th className="border border-erp-gray bg-erp-mint">공급가</th>
//                   <th className="border border-erp-gray bg-erp-mint">부가세</th>
//                   <th className="border border-erp-gray bg-erp-mint">
//                     공급대가
//                   </th>
//                   <th className="border border-erp-gray bg-erp-mint">
//                     합계금액
//                   </th>
//                   <th className="border border-erp-gray bg-erp-mint">재고</th>
//                   <th className="border border-erp-gray bg-erp-mint">단위</th>
//                   <th className="border border-erp-gray bg-erp-mint">
//                     납품요청일
//                   </th>
//                   <th className="border border-erp-gray bg-erp-mint">삭제</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {form.items.map((item, index) => (
//                   <tr key={item.buyercd}>
//                     <td className="text-center border border-erp-gray">
//                       {index + 1}
//                     </td>
//                     <td className="text-center border border-erp-gray">
//                       {item.buyercd}
//                     </td>
//                     <td className="text-center border border-erp-gray">
//                       {item.itemnm}
//                     </td>
//                     <td className="text-center border border-erp-gray">
//                       <input
//                         className="text-center"
//                         type="text"
//                         min="0"
//                         value={item.orderqty}
//                         onChange={(e) =>
//                           handleItemChange(
//                             item.id,
//                             "orderqty",
//                             parseInt(e.target.value) || 0
//                           )
//                         }
//                       />
//                     </td>
//                     <td className="text-center border border-erp-gray">
//                       {item.originprice}
//                     </td>
//                     <td className="text-center border border-erp-gray">
//                       <input
//                         className="text-center"
//                         type="text"
//                         min="0"
//                         value={item.ordersupplyprice}
//                         onChange={(e) =>
//                           handleItemChange(
//                             item.id,
//                             "ordersupplyprice",
//                             parseFloat(e.target.value) || 0
//                           )
//                         }
//                       />
//                     </td>
//                     <td className="text-center border border-erp-gray">
//                       {
//                         (item.ordersurtax = (
//                           item.ordersupplyprice / 10
//                         ).toFixed(2))
//                       }
//                     </td>
//                     <td className="text-center border border-erp-gray">
//                       {item.buyersupplyprice.toLocaleString(undefined, {
//                         maximumFractionDigits: 3,
//                       })}
//                     </td>
//                     <td className="text-center border border-erp-gray">
//                       {(item.salesprice * item.orderqty).toLocaleString(
//                         undefined,
//                         {
//                           maximumFractionDigits: 3,
//                         }
//                       )}
//                     </td>
//                     <td className="text-center border border-erp-gray">
//                       {item.stock}
//                     </td>
//                     <td className="text-center border border-erp-gray">
//                       {item.unit}
//                     </td>
//                     <td className="text-center border border-erp-gray">
//                       <input type="date" onChange={handleDateChange} />
//                     </td>
//                     <td className="text-center  border border-erp-gray">
//                       <button onClick={() => deleteRow(item.id)}>
//                         {deleteIcon}
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//                 <tr className="border border-erp-gray-t-2">
//                   <td colSpan={3} className="border border-erp-gray"></td>
//                   <td className="text-center border border-erp-gray">
//                     {calculateTotalQuantity()}
//                   </td>
//                   <td className="text-center border border-erp-gray">
//                     {calculateTotalOriginPrice().toLocaleString()}
//                   </td>
//                   <td className="text-center border border-erp-gray">
//                     {calculateTotalSetPrice().toLocaleString()}
//                   </td>
//                   <td className="text-center border border-erp-gray">
//                     {calculateTotalTax().toLocaleString()}
//                   </td>
//                   <td className="text-center border border-erp-gray">
//                     {calculateTotalPrice().toLocaleString()}
//                   </td>
//                   <td
//                     colSpan={2}
//                     className="text-center border border-erp-gray bg-erp-mint"
//                   >
//                     합계:
//                   </td>
//                   <td
//                     colSpan={3}
//                     className="text-center  border border-erp-gray"
//                   >
//                     {calculateTotalSum().toLocaleString(undefined, {
//                       maximumFractionDigits: 3,
//                     })}
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//         <ItemTable setForm={setForm} form={form} />
//       </div>
//     </div>
//   );
// }

// function ItemTable(setForm, form) {
//   const search = <FontAwesomeIcon icon={faMagnifyingGlass} />;
//   const [item, setItem] = useState("");
//   const [trigger, setTrigger] = useState(0);
//   const [searchResult, setSearchResult] = useState([]);

//   const handleClick = () => {
//     setTrigger((prev) => prev + 1);
//   };
//   const handleItem = (e) => {
//     setItem(e.target.value);
//   };

//   useEffect(() => {
//     if (!item) return;

//     const fetchData = async () => {
//       const itemquery = {
//         item: item,
//         buyer: form.buyercode,
//       };
//       try {
//         const response = await axios.post("/item/price/list", itemquery, {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//         console.log("검색결과:", response.data);
//         setSearchResult(response.data.buyerSalesList);
//       } catch (error) {
//         console.error("오류:", error);
//       }
//     };
//     fetchData();
//   }, [item]);

//   const addToOrderTable = (newItem) => {
//     const updatedItem = {
//       ...newItem,
//       orderqty: 0,
//       ordersupplyprice: 0,
//       ordersurtax: 0,
//     };
//     setForm((prevForm) => ({
//       ...prevForm,
//       items: [...prevForm.items, updatedItem],
//     }));
//   };

//   return (
//     <div className="itemTable">
//       <h1 className="text-center text-xl my-5">바이어별 판매가 검색</h1>
//       <div className="flex gap-10 items-center ">
//         <p className="text-gray-500">판매부번</p>
//         <input type="text" className="p-1" onChange={handleItem} />
//         <button className="-translate-x-16" onClick={handleClick}>
//           {search}
//         </button>
//       </div>
//       <table className="border border-erp-gray border-collapse w-[100%] my-5 bg-white">
//         <thead>
//           <th className="p-1 border border-erp-gray bg-erp-mint">순번</th>
//           <th className="p-1 border border-erp-gray bg-erp-mint">
//             판매부번 코드
//           </th>
//           <th className="p-1 border border-erp-gray bg-erp-mint">품명</th>
//           <th className="p-1 border border-erp-gray bg-erp-mint">
//             바이어 코드
//           </th>
//           <th className="p-1 border border-erp-gray bg-erp-mint">바이어명</th>
//           <th className="p-1 border border-erp-gray bg-erp-mint">원가</th>
//           <th className="p-1 border border-erp-gray bg-erp-mint">공급가</th>
//           <th className="p-1 border border-erp-gray bg-erp-mint">부가세</th>
//           <th className="p-1 border border-erp-gray bg-erp-mint">공급대가</th>
//           <th className="p-1 border border-erp-gray bg-erp-mint">단위</th>
//         </thead>
//         <tbody>
//           <tr>
//             <td className="border border-erp-gray text-center">1</td>
//             <td className="border border-erp-gray text-center">ER09036</td>
//             <td className="border border-erp-gray text-center">YAKULT WILL</td>
//             <td className="border border-erp-gray text-center">jinbang</td>
//             <td className="border border-erp-gray text-center">Jinbang&Co</td>
//             <td className="border border-erp-gray text-center">600</td>
//             <td className="border border-erp-gray text-center">1000</td>
//             <td className="border border-erp-gray text-center">100</td>
//             <td className="border border-erp-gray text-center">1,100</td>
//             <td className="border border-erp-gray text-center">6EA</td>
//           </tr>

//           {searchResult.map((result, index) => (
//             <tr
//               key={result.itempriceid}
//               onClick={() => addToOrderTable(result)}
//             >
//               <td className="border border-erp-gray text-center">
//                 {index + 1}
//               </td>
//               <td className="border border-erp-gray text-center">
//                 {result.itempriceid}
//               </td>
//               <td className="border border-erp-gray text-center">
//                 {result.itemnm}
//               </td>
//               <td className="border border-erp-gray text-center">
//                 {result.buyercd}
//               </td>
//               <td className="border border-erp-gray text-center">
//                 {result.buyernm}
//               </td>
//               <td className="border border-erp-gray text-center">
//                 {result.originprice}
//               </td>
//               <td className="border border-erp-gray text-center">
//                 {result.buyersupplyprice}
//               </td>
//               <td className="border border-erp-gray text-center">
//                 {result.surtax}
//               </td>
//               <td className="border border-erp-gray text-center">
//                 {result.salesprice}
//               </td>
//               <td className="border border-erp-gray text-center">
//                 {result.unit}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default OrderEdit;
