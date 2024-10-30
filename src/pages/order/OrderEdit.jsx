import { useState, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import useAxios from "../../hook/useAxios";
import { useAuth } from "../../context/AuthContext";
import { rejects } from "../../data/rejects";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faCircleMinus } from "@fortawesome/free-solid-svg-icons";

function OrderEdit() {
  const { user } = useAuth();
  const [detail, setDetail] = useState({
    orderid: null,
    orderno: null,
    orderdate: "",
    usercd: user.usercd,
    buyercd: "",
    status: "",
    rejectcode: "",
    rejectreason: "",
    itemList: [],
  });
  console.log(detail);
  const location = useLocation();
  const { detailNo } = location.state || {};
  const [reject, setReject] = useState("");
  const [leavePage, setleavepage] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const { error, fetchData } = useAxios();

  useEffect(() => {
    if (detailNo) {
      const getDetail = async () => {
        try {
          const result = await fetchData({
            config: { method: "GET", url: `/api/order/detail/${detailNo}` },
          });
          if (result) {
            console.log(result.data);
            setDetail(result.data);
          }
        } catch (error) {
          console.error("디비 접속에 문제:", error);
        }
      };

      getDetail();
    }
  }, [detailNo]);

  /*아이템 테이블 행 삭제 */
  const deleteRow = (id) => {
    setDetail((prevForm) => ({
      ...prevForm,
      itemList: prevForm.itemList.filter((item) => item.id !== id),
    }));
  };

  /*아이템 테이블 변경사항 저장 */
  const handleItemChange = (id, field, value) => {
    setDetail((prevForm) => ({
      ...prevForm,
      itemList: prevForm.itemList.map((item) => {
        if (item.orderitemid === id) {
          const updatedItem = { ...item, [field]: value };
          updatedItem.ordersalesprice =
            (updatedItem.ordersupplyprice + updatedItem.ordersurtax) *
            updatedItem.orderqty;
          return updatedItem;
        }
        return item;
      }),
    }));
  };

  /*오더 수량 전체 계산 */
  const calculateTotalQuantity = () =>
    detail.itemList.reduce((sum, item) => sum + item.orderqty, 0);

  /*오더 원가 전체 계산 */
  const calculateTotalOriginPrice = () =>
    detail.itemList.reduce((sum, item) => sum + item.originprice, 0);

  /*오더 공급가 전체 계산 */
  const calculateTotalSetPrice = () =>
    detail.itemList.reduce((sum, item) => sum + item.ordersupplyprice, 0);

  /*오더 부가세 전체 계산 */
  const calculateTotalTax = () =>
    detail.itemList.reduce((sum, item) => sum + Number(item.ordersurtax), 0);

  const calculateTotalsupplyPrice = () =>
    detail.itemList.reduce((sum, item) => sum + item.ordersupplyprice, 0);

  /*오더 합계금액 전체 계산 */
  const calculateTotalPrice = () =>
    detail.itemList.reduce((sum, item) => sum + item.ordersalesprice, 0);

  /*오더 총 합계 계산 */
  const calculateTotalSum = () =>
    detail.itemList.reduce(
      (sum, item) => sum + item.ordersalesprice * item.orderqty,
      0
    );

  /*오더폼 삭제 */
  const deleteOrderForm = () => {
    const confirmDelete = window.confirm(
      "작성하시던 폼을 삭제하시겠습니까? 삭제시 오더 리스트로 리다이렉팅합니다."
    );
    if (confirmDelete) {
      setDetail({});
      setleavepage(true);
    }
  };

  if (leavePage) {
    return <Navigate to="/orderList" replace />;
  }

  /*요청상태 검색 변화 저장 */
  const handleDateChange = (e) => {
    setDetail((prev) => ({
      ...prev,
      orderdate: e.target.value,
    }));
  };

  /*요청상태 검색 변화 저장 */
  const handleStatusChange = (e) => {
    setDetail((prev) => ({
      ...prev,
      status: e.target.value,
    }));
  };

  /*날짜 */
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  const currentDate = month + "/" + date + "/" + year;

  /*아이콘  */
  const deleteIcon = <FontAwesomeIcon icon={faCircleMinus} />;

  /*오더폼 확인 */
  const validateOrderForm = (detail) => {
    if (!detail.orderdate) {
      alert("주문 날짜를 입력해주세요");
      return false;
    }
    if (!detail.buyercode) {
      alert("바이어 정보를 입력해주세요");
      return false;
    }

    for (const item of detail.itemList) {
      if (item.orderqty === 0 || item.orderqty <= 0) {
        alert("발주 수량을 입력해주세요");
        return false;
      }
      if (item.ordersalesprice === 0) {
        alert("공급가를 입력해주세요.");
        return false;
      }
      if (!item.deliverydate) {
        alert("납품 요청일을 입력해주세요");
        return false;
      }
    }

    return true;
  };
  /*오더폼 등록 */
  const submitOrderForm = async (detail) => {
    const itemLists = detail.itemList.map((item) => ({
      buyeritemcd: item.itemcd,
      ordersalesprice: item.salesprice,
      ordersupplyprice: item.ordersupplyprice,
      ordersurtax: item.ordersurtax,
      orderqty: item.orderqty,
      deliverydate: item.deliverydate,
    }));

    const orderFormInfo = {
      orderno: detail.orderno,
      orderdate: detail.orderdate,
      usercd: detail.usercd,
      buyercd: detail.buyercd,
      status: detail.status,
      itemLists: itemLists,
    };

    if (!validateOrderForm(detail)) {
      return;
    }

    /*axios */
    if (window.confirm("오더를 등록하시겠습니까?")) {
      orderFormInfo.status = "APRV_REQ";
      try {
        await axios.post("/order", orderFormInfo, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setRedirect(true);
      } catch (error) {
        console.error("디비 접속에 문제: ", error);
      }
    }
  };

  if (redirect) {
    return <Navigate to="/orderList" replace />;
  }
  /*테이블에 오더가 추가 될때마다 새로고침 */
  //   useEffect(() => {}, [detail.itemList]);

  return (
    <div className="flex">
      <div className="flex-col bg-erp-soft-gray p-7 w-[100%]">
        <div className="flex justify-self-end gap-4 w-[200px] my-10 pl-20">
          {detail.status === "CREATE" ? (
            <button
              className="border border-erp-gray px-4 bg-white text-black"
              onClick={deleteOrderForm}
            >
              삭제
            </button>
          ) : (
            <button
              className="border border-erp-gray px-4 bg-white text-black"
              onClick={deleteOrderForm}
            >
              종결처리
            </button>
          )}
          <button
            className="border border-erp-gray px-4 bg-erp-green text-white"
            onClick={submitOrderForm}
          >
            등록
          </button>
        </div>
        <div className="headerTable">
          <table className="border border-erp-gray border-collapse w-[100%] mt-10 bg-white">
            <tbody>
              <tr>
                <td className="border border-erp-gray bg-erp-mint text-center">
                  오더번호
                </td>
                <td className="border border-erp-gray">{detail.orderno}</td>
                <td className="border border-erp-gray bg-erp-mint text-center">
                  주문일자
                </td>
                <td className="border border-erp-gray">{detail.orderdate}</td>
                <td className="border border-erp-gray bg-erp-mint text-center">
                  등록일자
                </td>
                <td className="border border-erp-gray">{currentDate}</td>
              </tr>
              <tr>
                <td className="border border-erp-gray bg-erp-mint text-center">
                  직원코드
                </td>
                <td>{detail.usercd}</td>
                <td className="border border-erp-gray bg-erp-mint text-center ">
                  바이어 코드
                </td>
                <td className="border border-erp-gray">{detail.buyercd}</td>
                <td className="border border-erp-gray bg-erp-mint text-center">
                  바이어명
                </td>
                <td className="border border-erp-gray ">{detail.buyernm}</td>
              </tr>
              <tr className="">
                <td className="border border-erp-gray bg-erp-mint text-center">
                  상태관리
                </td>
                <td className="border border-erp-gray">
                  {detail.status && detail.status == "CREATE" ? (
                    <select className="px-10" onChange={handleStatusChange}>
                      <option
                        value={detail.status}
                        className="border border-erp-gray hover:bg-gray-400"
                      >
                        생성중
                      </option>
                      <option
                        value={detail.status}
                        className="border border-erp-gray hover:bg-gray-400"
                      >
                        승인취소
                      </option>
                    </select>
                  ) : (
                    <p>반려</p>
                  )}
                </td>
                <>
                  <td className="border border-erp-gray bg-erp-mint text-center">
                    반려사유
                  </td>
                  {detail.status === "REJECT" ? (
                    <td className="flex gap-5 text-center">
                      {detail.rejectcodenm}
                    </td>
                  ) : (
                    ""
                  )}
                </>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="orderListTable mt-5 ">
          <h1 className="text-center font-medium text-xl">오더 품목 리스트</h1>
          <div className="max-h-96 overflow-y-auto">
            <table className="border border-erp-gray border-collapse w-[100%] my-5 bg-white">
              <thead>
                <tr>
                  <th className="border border-erp-gray bg-erp-mint">순번</th>
                  <th className="border border-erp-gray bg-erp-mint">
                    판매부번 코드
                  </th>
                  <th className="border border-erp-gray bg-erp-mint">품명</th>
                  <th className="border border-erp-gray bg-erp-mint">
                    발주수량
                  </th>
                  <th className="border border-erp-gray bg-erp-mint">원가</th>
                  <th className="border border-erp-gray bg-erp-mint">공급가</th>
                  <th className="border border-erp-gray bg-erp-mint">부가세</th>
                  <th className="border border-erp-gray bg-erp-mint">
                    공급대가
                  </th>
                  <th className="border border-erp-gray bg-erp-mint">
                    합계금액
                  </th>
                  <th className="border border-erp-gray bg-erp-mint">재고</th>
                  <th className="border border-erp-gray bg-erp-mint">단위</th>
                  <th className="border border-erp-gray bg-erp-mint">
                    납품요청일
                  </th>
                  <th className="border border-erp-gray bg-erp-mint">삭제</th>
                </tr>
              </thead>
              <tbody>
                {detail.itemList.map((item, index) => (
                  <tr key={item.orderitemid}>
                    <td className="text-center border border-erp-gray">
                      {index + 1}
                    </td>
                    <td className="text-center border border-erp-gray">
                      {item.itemcd}
                    </td>
                    <td className="text-center border border-erp-gray">
                      {item.itemnm}
                    </td>
                    <td className="text-center border border-erp-gray">
                      <input
                        className="text-center"
                        type="text"
                        min="0"
                        value={item.orderqty}
                        onChange={(e) =>
                          handleItemChange(
                            item.orderitemid,
                            "orderqty",
                            parseInt(e.target.value) || 0
                          )
                        }
                      />
                    </td>
                    <td className="text-center border border-erp-gray">
                      {item.originprice}
                    </td>
                    <td className="text-center border border-erp-gray">
                      <input
                        className="text-center"
                        type="text"
                        min="0"
                        value={item.ordersupplyprice}
                        onChange={(e) =>
                          handleItemChange(
                            item.orderitemid,
                            "ordersupplyprice",
                            parseFloat(e.target.value) || 0
                          )
                        }
                      />
                    </td>
                    <td className="text-center border border-erp-gray">
                      {
                        (item.ordersurtax = (
                          item.ordersupplyprice / 10
                        ).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }))
                      }
                    </td>
                    <td className="text-center border border-erp-gray">
                      {item.ordersupplyprice.toLocaleString(undefined, {
                        maximumFractionDigits: 3,
                      })}
                    </td>
                    <td className="text-center border border-erp-gray">
                      {detail.itemList
                        ? item.ordersalesprice
                        : (item.salesprice * item.orderqty).toLocaleString(
                            undefined,
                            {
                              maximumFractionDigits: 3,
                            }
                          )}
                    </td>
                    <td className="text-center border border-erp-gray">
                      {item.stock}
                    </td>
                    <td className="text-center border border-erp-gray">
                      {item.unit}
                    </td>
                    <td className="text-center border border-erp-gray">
                      {detail.itemList ? (
                        <input
                          type="date"
                          value={item.deliverydate}
                          onChange={handleDateChange}
                        />
                      ) : (
                        <input type="date" onChange={handleDateChange} />
                      )}
                    </td>
                    <td className="text-center  border border-erp-gray">
                      <button onClick={() => deleteRow(item.id)}>
                        {deleteIcon}
                      </button>
                    </td>
                  </tr>
                ))}
                <tr className="border border-erp-gray-t-2">
                  <td colSpan={3} className="border border-erp-gray"></td>
                  <td className="text-center border border-erp-gray">
                    {calculateTotalQuantity()}
                  </td>
                  <td className="text-center border border-erp-gray">
                    {calculateTotalOriginPrice().toLocaleString()}
                  </td>
                  <td className="text-center border border-erp-gray">
                    {calculateTotalSetPrice().toLocaleString()}
                  </td>
                  <td className="text-center border border-erp-gray">
                    {calculateTotalTax().toLocaleString()}
                  </td>
                  <td className="text-center border border-erp-gray">
                    {calculateTotalsupplyPrice().toLocaleString()}
                  </td>
                  <td className="text-center border border-erp-gray">
                    {calculateTotalPrice().toLocaleString()}
                  </td>
                  <td
                    colSpan={2}
                    className="text-center border border-erp-gray bg-erp-mint"
                  >
                    합계:
                  </td>
                  <td
                    colSpan={3}
                    className="text-center  border border-erp-gray"
                  >
                    {calculateTotalSum().toLocaleString(undefined, {
                      maximumFractionDigits: 3,
                    })}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <ItemTable setDetail={setDetail} detail={detail} />
      </div>
    </div>
  );
}

function ItemTable({ setDetail, detail }) {
  const search = <FontAwesomeIcon icon={faMagnifyingGlass} />;
  const [item, setItem] = useState("");
  const [trigger, setTrigger] = useState(0);
  const [searchResult, setSearchResult] = useState([]);
  const { error, fetchData } = useAxios();
  const [basicParam, setbasicParam] = useState(null);

  const handleClick = () => {
    setTrigger((prev) => prev + 1);
  };
  const handleItem = (e) => {
    if (!detail.buyercode) {
      alert("바이어 정보를 입력해주세요");
      return false;
    }
    setItem(e.target.value);
  };

  const fetchItemTable = async () => {
    setbasicParam({ item: item, buyer: detail.buyercode });
    try {
      const response = await fetchData({
        config: {
          method: "GET",
          url: `/api/item/price/list?item=${item}&buyer=${detail.buyercode}`,
        },
      });
      if (response) {
        console.log("검색결과:", response.data);
        setSearchResult(response.data);
      }
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  const addToOrderTable = (newItem) => {
    const updatedItem = {
      ...newItem,
      orderqty: 0,
      ordersupplyprice: 0,
      ordersurtax: 0,
    };
    setDetail((prevForm) => ({
      ...prevForm,
      itemList: [...prevForm.itemList, updatedItem],
    }));
  };

  return (
    <div className="itemTable">
      <h1 className="text-center text-xl my-5">바이어별 판매가 검색</h1>
      <div className="flex gap-10 items-center ">
        <p className="text-gray-500">판매부번</p>
        <input
          type="text"
          className="p-1 border-erp-gray border"
          onChange={handleItem}
        />
        <button className="-translate-x-16" onClick={fetchItemTable}>
          {search}
        </button>
      </div>
      <table className="border border-erp-gray border-collapse w-[100%] my-5 bg-white">
        <thead>
          <th className="p-1 border border-erp-gray bg-erp-mint">순번</th>
          <th className="p-1 border border-erp-gray bg-erp-mint">
            판매부번 코드
          </th>
          <th className="p-1 border border-erp-gray bg-erp-mint">품명</th>
          <th className="p-1 border border-erp-gray bg-erp-mint">
            바이어 코드
          </th>
          <th className="p-1 border border-erp-gray bg-erp-mint">바이어명</th>
          <th className="p-1 border border-erp-gray bg-erp-mint">원가</th>
          <th className="p-1 border border-erp-gray bg-erp-mint">공급가</th>
          <th className="p-1 border border-erp-gray bg-erp-mint">부가세</th>
          <th className="p-1 border border-erp-gray bg-erp-mint">공급대가</th>
          <th className="p-1 border border-erp-gray bg-erp-mint">단위</th>
        </thead>
        {searchResult && searchResult.length > 0 ? (
          <tbody>
            {searchResult.map((result, index) => (
              <tr
                key={result.itempriceid}
                onClick={() => addToOrderTable(result)}
              >
                <td className="border border-erp-gray text-center">
                  {index + 1}
                </td>
                <td className="border border-erp-gray text-center">
                  {result.itempriceid}
                </td>
                <td className="border border-erp-gray text-center">
                  {result.itemnm}
                </td>
                <td className="border border-erp-gray text-center">
                  {result.buyercd}
                </td>
                <td className="border border-erp-gray text-center">
                  {result.buyernm}
                </td>
                <td className="border border-erp-gray text-center">
                  {result.originprice}
                </td>
                <td className="border border-erp-gray text-center">
                  {result.buyersupplyprice}
                </td>
                <td className="border border-erp-gray text-center">
                  {result.surtax}
                </td>
                <td className="border border-erp-gray text-center">
                  {result.salesprice}
                </td>
                <td className="border border-erp-gray text-center">
                  {result.unit}
                </td>
              </tr>
            ))}
          </tbody>
        ) : null}
      </table>
      {(!searchResult || searchResult.length === 0) && (
        <p className="mx-auto py-5 text-center">검색결과가 없습니다.</p>
      )}
    </div>
  );
}

export default OrderEdit;
