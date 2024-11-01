import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import useAxios from "../../hook/useAxios";
import { useAuth } from "../../context/AuthContext";
import { rejects } from "../../data/rejects";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faCircleMinus } from "@fortawesome/free-solid-svg-icons";

function OrderForm() {
  const [reject, setReject] = useState("");
  const [buyerInfo, setBuyerInfo] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [leavePage, setleavepage] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const { error, fetchData } = useAxios();
  const { user } = useAuth();
  const [form, setForm] = useState({
    usercd: user.usercd,
    orderdate: "",
    buyercode: "",
    status: "CREATE",
    items: [],
  });

  console.log(form);

  /*테이블에 오더가 추가 될때마다 새로고침 */
  useEffect(() => {}, [form.items]);

  useEffect(() => {
    if (buyerInfo?.buyercd) {
      setForm((prev) => ({
        ...prev,
        buyercode: buyerInfo.buyercd,
      }));
      console.log("Updated searchForm buyer:", buyerInfo.buyerCd);
    }
  }, [buyerInfo]);
  /*아이템 테이블 행 삭제 */
  const deleteRow = (id) => {
    setForm((prevForm) => ({
      ...prevForm,
      items: prevForm.items.filter((item) => item.id !== id),
    }));
  };

  /*아이템 테이블 변경사항 저장 */
  const handleItemChange = (id, field, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      items: prevForm.items.map((item) => {
        if (item.itemcd === id) {
          const updatedItem = { ...item, [field]: value };
          updatedItem.totalprice =
            (updatedItem.setprice + updatedItem.tax) * updatedItem.quantity;
          return updatedItem;
        }
        return item;
      }),
    }));
  };

  /*오더 수량 전체 계산 */
  const calculateTotalQuantity = () =>
    form.items.reduce((sum, item) => sum + item.orderqty, 0);

  /*오더 원가 전체 계산 */
  const calculateTotalOriginPrice = () =>
    form.items.reduce((sum, item) => sum + item.originprice, 0);

  /*오더 공급가 전체 계산 */
  const calculateTotalSetPrice = () =>
    form.items.reduce((sum, item) => sum + item.ordersupplyprice, 0);

  /*오더 부가세 전체 계산 */
  const calculateTotalTax = () =>
    form.items.reduce((sum, item) => sum + item.ordersurtax, 0);

  const calculateTotalsupplyPrice = () =>
    form.items.reduce((sum, item) => sum + item.ordersalesprice, 0);

  /*오더 합계금액 전체 계산 */
  const calculateTotalPrice = () =>
    form.items.reduce(
      (sum, item) => sum + item.ordersalesprice * item.orderqty,
      0
    );

  /*오더 총 합계 계산 */
  const calculateTotalSum = () =>
    form.items.reduce(
      (sum, item) => sum + item.ordersalesprice * item.orderqty,
      0
    );

  /*오더폼 삭제 */
  const deleteOrderForm = () => {
    const confirmDelete = window.confirm(
      "작성하시던 폼을 삭제하시겠습니까? 삭제시 오더 리스트로 리다이렉팅합니다."
    );
    if (confirmDelete) {
      setForm({});
      setleavepage(true);
    }
  };

  if (leavePage) {
    return <Navigate to="/order/list" replace />;
  }

  /*헤더 날짜 변화 저장 */
  const handleOrderDateChange = (e) => {
    setForm((prev) => ({
      ...prev,
      orderdate: e.target.value,
    }));
  };

  /*오더 날짜 변화 저장 */
  const handleDateChange = (itemid, event) => {
    const newItemList = form.items.map((item) =>
      item.itemcd === itemid
        ? { ...item, deliverydate: event.target.value || "" }
        : item
    );

    setForm((prevDetail) => ({
      ...prevDetail,
      items: newItemList,
    }));
  };
  /*요청상태 검색 변화 저장 */
  const handleStatusChange = (e) => {
    setForm((prev) => ({
      ...prev,
      status: e.target.value,
    }));
  };

  /*반려 변화 저장 */
  const handleRejectChange = (e) => {
    setReject(e.target.value);
    setForm((prev) => ({
      ...prev,
      reject: e.target.value,
    }));
  };

  /*반려 사유 저장 */
  const handleRejectInfoChange = (e) => {
    setForm((prev) => ({
      ...prev,
      rejectInfo: e.target.value,
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

  console.log(form.orderdate);
  /*오더폼 확인 */
  const validateOrderForm = () => {
    console.log(form.orderdate);
    if (!form.orderdate) {
      alert("주문 날짜를 입력해주세요");
      return false;
    }
    if (!form.buyercode) {
      alert("바이어 정보를 입력해주세요");
      return false;
    }

    for (const item of form.items) {
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

  const filteredItemList = form.items.map(
    ({
      itemcd,
      ordersupplyprice,
      ordersurtax,
      ordersalesprice,
      orderqty,
      deliverydate,
    }) => ({
      itemcd,
      ordersupplyprice,
      ordersurtax,
      ordersalesprice,
      orderqty,
      deliverydate,
    })
  );

  console.log(filteredItemList);
  /*오더폼 등록 */
  const submitOrderForm = async () => {
    const orderFormInfo = {
      orderdate: form.orderdate,
      usercd: form.usercd,
      buyercd: form.buyercode,
      status: form.status,
      orderItemList: filteredItemList,
    };

    if (!validateOrderForm(form)) {
      return;
    }

    const isApproved = window.confirm(
      "결제요청을 하시겠습니까? 취소 선택시 저장만 됩니다."
    );
    if (isApproved) {
      orderFormInfo.status = "APRV_REQ";
    }

    try {
      const resultData = await fetchData({
        config: { method: "POST", url: "/api/order" },
        body: orderFormInfo,
      });
      if (resultData?.status === "OK") {
        setRedirect(true);
      } else if (error) {
        console.error("Error: ", error);
        alert("오더폼을 등록할수 없습니다. 다시 시도해주세요");
      }
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  if (redirect) {
    return <Navigate to="/order/list" replace />;
  }

  return (
    <div className="flex">
      <div className="flex-col bg-erp-soft-gray p-7 w-[100%]">
        <div className="flex justify-self-end gap-4 w-[150px] my-10 pl-12 ">
          <button
            className="border border-erp-gray px-4 bg-white text-black"
            onClick={deleteOrderForm}
          >
            삭제
          </button>
          <button
            className="border border-erp-gray px-4 bg-erp-green text-white"
            onClick={submitOrderForm}
          >
            등록
          </button>
        </div>
        <div className="headerTable">
          <table className="border border-erp-gray border-collapse w-[100%] mt-10 bg-white">
            <tr>
              <td className="border border-erp-gray bg-erp-mint text-center">
                오더번호
              </td>
              <td className="border border-erp-gray bg-gray-300"></td>
              <td className="border border-erp-gray bg-erp-mint text-center">
                주문일자
              </td>
              <td className="border border-erp-gray">
                <input
                  className="w-[90%]"
                  type="date"
                  onChange={handleOrderDateChange}
                />
              </td>
              <td className="border border-erp-gray bg-erp-mint text-center">
                등록일자
              </td>
              <td className="border border-erp-gray">{currentDate}</td>
            </tr>
            <tr>
              <td className="border border-erp-gray bg-erp-mint text-center">
                직원코드
              </td>
              <td>{form.usercd}</td>
              <td className="border border-erp-gray bg-erp-mint text-center ">
                바이어 코드
              </td>
              <td className="border border-erp-gray">
                <input
                  className="hover:cursor-pointer"
                  type="text"
                  placeholder="바이어코드 검색"
                  value={buyerInfo ? `${buyerInfo.buyercd}` : ""}
                  onClick={() => setShowModal(true)}
                />
                {buyerInfo.buyercd && (
                  <button
                    onClick={() => {
                      setBuyerInfo("");
                      setForm((prev) => ({ ...prev, buyer: "" }));
                    }}
                    className=" px-2 text-black hover:text-gray-600"
                  >
                    ✕
                  </button>
                )}
              </td>
              <td className="border border-erp-gray bg-erp-mint text-center">
                바이어명
              </td>
              <td className="border border-erp-gray ">
                <input
                  className="hover:cursor-pointer"
                  type="text"
                  placeholder="바이어명 검색"
                  value={buyerInfo ? `${buyerInfo.buyernm}` : ""}
                  onClick={() => setShowModal(true)}
                />
                {buyerInfo.buyernm && (
                  <button
                    onClick={() => {
                      setBuyerInfo("");
                      setForm((prev) => ({ ...prev, buyer: "" }));
                    }}
                    className=" px-2 text-black hover:text-gray-600"
                  >
                    ✕
                  </button>
                )}
              </td>
            </tr>
            <tr className="">
              <td className="border border-erp-gray bg-erp-mint text-center">
                상태관리
              </td>
              <td className="border border-erp-gray">
                <select className="px-10" onChange={handleStatusChange}>
                  <option
                    value={"CREATE"}
                    className="border border-erp-gray hover:bg-gray-400"
                  >
                    생성중
                  </option>
                </select>
              </td>
              <>
                {form.status === "REJECT" ? (
                  <>
                    <td className="border border-erp-gray bg-erp-mint text-center">
                      반려사유
                    </td>
                    <td className=" border-erp-gray border flex gap-5 text-center">
                      <select className="px-10" onChange={handleRejectChange}>
                        {rejects.map((reject) => (
                          <option
                            key={reject.id}
                            value={reject.id}
                            className="border border-erp-gray hover:bg-gray-400"
                          >
                            {reject.name}
                          </option>
                        ))}
                      </select>
                      {form.reject === "ETC" ? (
                        <input
                          className="border border-erp-gray w-[200px]"
                          type="text"
                          placeholder="기타사유를 입력하세요"
                          onChange={handleRejectInfoChange}
                        />
                      ) : (
                        ""
                      )}
                    </td>
                  </>
                ) : (
                  ""
                )}
              </>
            </tr>
          </table>
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
              setForm={setForm}
              setBuyerInfo={setBuyerInfo}
            />
          </>
        )}

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
                {form.items.map((item, index) => (
                  <tr key={item.itempriceid}>
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
                            item.itemcd,
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
                            item.itemcd,
                            "ordersupplyprice",
                            parseFloat(e.target.value) || 0
                          )
                        }
                      />
                    </td>
                    <td className="text-center border border-erp-gray">
                      {
                        (item.ordersurtax = Math.round(
                          item.ordersupplyprice / 10
                        ))
                      }
                    </td>
                    <td className="text-center border border-erp-gray">
                      {(item.ordersalesprice =
                        item.ordersupplyprice +
                        item.ordersurtax).toLocaleString(undefined, {
                        maximumFractionDigits: 3,
                      })}
                    </td>
                    <td className="text-center border border-erp-gray">
                      {item.ordersalesprice * item.orderqty}
                    </td>
                    <td className="text-center border border-erp-gray">
                      {item.stock}
                    </td>
                    <td className="text-center border border-erp-gray">
                      {item.unit}
                    </td>
                    <td className="text-center border border-erp-gray">
                      <input
                        type="date"
                        onChange={(event) =>
                          handleDateChange(item.itemcd, event)
                        }
                      />
                    </td>
                    <td className="text-center  border border-erp-gray">
                      <button onClick={() => deleteRow(item.itemcd)}>
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
        <ItemTable setForm={setForm} form={form} />
      </div>
    </div>
  );
}

function ItemTable({ setForm, form }) {
  const search = <FontAwesomeIcon icon={faMagnifyingGlass} />;
  const [item, setItem] = useState("");

  const [searchResult, setSearchResult] = useState([]);
  const { error, fetchData } = useAxios();

  const handleItem = (e) => {
    if (!form.buyercode) {
      alert("바이어 정보를 입력해주세요");
      return false;
    }
    setItem(e.target.value);
  };

  const fetchItemTable = async () => {
    try {
      const response = await fetchData({
        config: {
          method: "GET",
          url: `/api/item/price/list?item=${item}&buyer=${form.buyercode}`,
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
      ordersalesprice: 0,
      originprice: newItem.originprice,
      itempriceid: newItem.itempriceId,
      itemcd: newItem.itemcd,
      itemnm: newItem.itemnm,
      deliverydate: newItem.adddate,
    };
    setForm((prevForm) => ({
      ...prevForm,
      items: [...prevForm.items, updatedItem],
    }));
  };

  return (
    <div className="itemTable">
      <h1 className="text-center text-xl my-5">바이어별 판매가 검색</h1>
      <div className="flex gap-10 items-center ">
        <p className="text-gray-500">판매부번</p>
        <input type="text" className="p-1" onChange={handleItem} />
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
export default OrderForm;
