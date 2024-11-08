/* eslint-disable no-useless-escape */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import useAxios from "../../hook/useAxios";
import { useAuth } from "../../context/AuthContext";
import { Status } from "../../data/status";
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
  const [leavePage, setleavepage] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [item, setItem] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const { error, fetchData } = useAxios();
  const location = useLocation();
  const { detailNo } = location.state || {};

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

  useEffect(() => {
    if (detail.buyercd != "") {
      fetchItemTable();
    }
  }, [detail.buyercd]);

  const fetchItemTable = async () => {
    try {
      const response = await fetchData({
        config: {
          method: "GET",
          url: `/api/item/price/list?item=${item}&buyer=${detail.buyercd}`,
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

  /*아이템 테이블 행 삭제 */
  const deleteRow = (id) => {
    console.log(id);
    setDetail((prevForm) => ({
      ...prevForm,
      itemList: prevForm.itemList.filter((_, index) => index !== id),
    }));
  };

  /*아이템 테이블 변경사항 저장 */
  const handleItemChange = (index, field, value) => {
    setDetail((prevForm) => ({
      ...prevForm,
      itemList: prevForm.itemList.map((item, idx) => {
        if (idx === index) {
          return { ...item, [field]: value };
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
    detail.itemList.reduce((sum, item) => sum + item.ordersurtax, 0);

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

  /*반려처리 */
  const setFinishStatus = async () => {
    const setFinish = window.confirm(
      "종결처리 하시겠습니까? 종결처리시 수정불가합니다"
    );

    if (setFinish) {
      const finishStatus = {
        orderno: detail.orderno,
        status: "FINISH",
        rejectcode: detail.rejectcode || "",
        rejectreason: detail.rejectreason || "",
      };
      console.log("반려처리:", finishStatus);
      try {
        const resultData = await fetchData({
          config: {
            method: "PUT",
            url: "/api/order/status",
          },
          body: finishStatus,
        });
        console.log(resultData);
        if (resultData?.status === "OK") {
          setRedirect(true);
        }
      } catch (err) {
        console.error("Error: ", err);
      }
      setleavepage(true);
    }
  };

  /*오더폼 삭제 */
  const deleteOrderForm = async () => {
    const confirmDelete = window.confirm("오더를 삭제하시겠습니까?");
    if (confirmDelete) {
      try {
        const resultData = await fetchData({
          config: {
            method: "DELETE",
            url: `/api/order?orderno=${detail.orderno}`,
          },
        });
        if (resultData?.status === "OK") {
          setRedirect(true);
        }
      } catch (err) {
        console.error("Error: ", err);
      }
      setleavepage(true);
    }
  };

  if (leavePage) {
    return <Navigate to="/order/list" replace />;
  }

  const handleDateChange = (index, event) => {
    const input = event.target;
    let value = input.value;

    let number = value.replace(/[^0-9\-]/g, "");
    if (value !== number) {
      alert("숫자와 하이픈(-) 이외의 값은 입력하실 수 없습니다.");
      value = number;
    }

    let digits = value.replace(/-/g, "");

    let ymd = "";

    if (digits.length <= 4) {
      ymd = digits;
    } else if (digits.length <= 6) {
      ymd = digits.substr(0, 4) + "-" + digits.substr(4);
    } else {
      ymd =
        digits.substr(0, 4) +
        "-" +
        digits.substr(4, 2) +
        "-" +
        digits.substr(6, 2);
    }

    const isDateValid = (dateStr) => {
      const [year, month, day] = dateStr.split("-").map(Number);

      if (month < 1 || month > 12) return false;
      if (day < 1) return false;

      const daysInMonth = [
        31,
        year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31,
      ];

      if (day > daysInMonth[month - 1]) return false;

      const date = new Date(dateStr);
      return (
        !isNaN(date) &&
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
      );
    };

    if (ymd.length === 10) {
      if (!isDateValid(ymd)) {
        alert(`${ymd}는 유효한 날짜가 아닙니다. 다시 입력하여주세요`);
        ymd = "";
      } else {
        const enteredDate = new Date(ymd);
        const limitDate = new Date();

        enteredDate.setHours(0, 0, 0, 0);
        limitDate.setHours(0, 0, 0, 0);

        if (enteredDate < limitDate) {
          alert(
            `${limitDate.toLocaleDateString()} 이전의 날짜는 설정하실 수 없습니다`
          );
          ymd = "";
        }
      }
    }

    const updatedItemList = [...detail.itemList];
    updatedItemList[index] = {
      ...updatedItemList[index],
      deliverydate: ymd,
    };
    setDetail({ ...detail, itemList: updatedItemList });
  };

  /*날짜 */
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");
  const currentDate = year + "-" + month + "-" + day;

  /*아이콘  */
  const deleteIcon = <FontAwesomeIcon icon={faCircleMinus} />;

  const filteredItemList = detail.itemList.map(
    ({ itemnm, originprice, stock, unit, orderno, ...remainingFields }) =>
      remainingFields
  );

  const orderFormInfo = {
    orderno: String(detail.orderno),
    orderdate: detail.orderdate,
    usercd: detail.usercd,
    buyercd: detail.buyercd,
    status: detail.status,
    orderItemList: filteredItemList,
  };
  console.log(orderFormInfo);

  const checkDateFormat = (dateString) => {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    return datePattern.test(dateString);
  };

  const validateOrderForm = () => {
    for (let i = 0; i < detail.itemList.length; i++) {
      const item = detail.itemList[i];

      if (item.orderqty === 0 || item.orderqty <= 0) {
        alert(`${i + 1}번: ${item.itemnm}의 발주 수량을 입력해주세요`);
        return false;
      }

      if (item.ordersalesprice === 0) {
        alert(`${i + 1}번: ${item.itemnm}의 공급가를 입력해주세요.`);
        return false;
      }

      if (!item.deliverydate) {
        alert(`${i + 1}번: ${item.itemnm}의 납품 요청일을 입력해주세요`);
        return false;
      } else if (!checkDateFormat(item.deliverydate)) {
        alert(
          `${i + 1}번: ${
            item.itemnm
          }의 납품 요청일을 YYYY-MM-DD 형식에 맞춰 입력해주세요`
        );
        return false;
      }
    }

    return true;
  };

  /*오더폼 수정 */
  const submitOrderForm = async () => {
    if (!validateOrderForm(detail)) {
      return;
    }
    /*axios */
    const isApproved = window.confirm("결제요청을 하시겠습니까? ");

    if (isApproved) {
      orderFormInfo.status = "APRV_REQ";
    } else {
      return;
    }

    try {
      const resultData = await fetchData({
        config: { method: "PUT", url: "/api/order" },
        body: orderFormInfo,
      });
      console.log(resultData);
      if (resultData?.status === "OK") {
        setRedirect(true);
      } else {
        console.error("Unexpected response: ", resultData);
      }
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  const checkOrderQty = (e, item, id) => {
    const newOrderQty = parseInt(e.target.value.replace(/,/g, "")) || 0;

    const totalRequestedQty =
      detail.itemList.reduce((sum, itm) => {
        return itm.itemcd === id ? sum + itm.orderqty : sum;
      }, 0) -
      item.orderqty +
      newOrderQty;

    if (totalRequestedQty > item.stock) {
      alert(
        `${item.itemnm}: 품목 재고량을 초과하셨습니다. 현재 재고: ${
          item.stock - (totalRequestedQty - newOrderQty)
        }`
      );
      return false;
    }

    setDetail((prevForm) => ({
      ...prevForm,
      itemList: prevForm.itemList.map((itm) =>
        itm.itemcd === id
          ? { ...itm, leftStock: item.stock - totalRequestedQty }
          : itm
      ),
    }));

    return true;
  };

  function formatWithCommas(value) {
    if (!value) return "";
    const number = Number(value);
    return number.toLocaleString();
  }

  function OrderFormInput({
    index,
    item,
    field,
    handleItemChange,
    checkOrderQty,
  }) {
    const [inputValue, setInputValue] = useState(formatWithCommas(item[field]));

    const handleChange = (e) => {
      const rawValue = e.target.value.replace(/,/g, "");
      setInputValue(rawValue);
    };

    const handleBlur = (e) => {
      const numericValue = Number(inputValue.replace(/,/g, "")) || 0;

      if (field === "ordersupplyprice") {
        if (numericValue < item.originalSupplyPrice) {
          alert(
            `입력하신 공급가: ${numericValue}원은 기존 금액: ${item.originalSupplyPrice}원보다 낮습니다.\n 다시 지정해주세요.`
          );
          setInputValue(formatWithCommas(item.ordersupplyprice));
          handleItemChange(index, field, item.ordersupplyprice);
          return;
        } else if (numericValue > item.originalSupplyPrice * 1.5) {
          alert(
            `입력하신 공급가: ${numericValue}원은 기존 금액: ${
              item.originalSupplyPrice
            }원의 150%인 \n${
              item.originalSupplyPrice * 1.5
            }원을 초과할 수 없습니다. 다시 지정해주세요.`
          );
          setInputValue(formatWithCommas(item.ordersupplyprice));
          handleItemChange(index, field, item.ordersupplyprice);
          return;
        }
      }

      if (field === "orderqty" && !checkOrderQty(e, item, item.itemcd)) {
        setInputValue(formatWithCommas(item[field]));
        return;
      }

      handleItemChange(index, field, numericValue);
      setInputValue(formatWithCommas(numericValue));
    };

    return (
      <input
        type="text"
        className="m-auto text-right w-[100%] border border-erp-gray"
        value={inputValue || 0}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    );
  }

  const checkDateLength = (index) => {
    const deliveryDate = detail.itemList[index]?.deliverydate || "";

    if (deliveryDate.length < 8 && deliveryDate.length > 1) {
      console.log(deliveryDate.length);
      alert(
        `${
          index + 1
        }번의 납품요청일을 포맷에 맞춰 다시 입력하여주세요: YYYYMMDD`
      );
      const updatedItemList = [...detail.itemList];
      updatedItemList[index] = {
        ...updatedItemList[index],
        deliverydate: "",
      };
      setDetail({ ...detail, itemList: updatedItemList });
    }
  };

  const getStatName = (statusId) => {
    const statusObj = Status.find((status) => status.id === statusId);
    return statusObj ? statusObj.name : statusId;
  };

  if (redirect) {
    return <Navigate to="/order/list" replace />;
  }

  return (
    <div className="flex">
      <div className="flex-col items-center justify-center bg-erp-soft-gray p-7 w-[100%] relative ">
        <div className="absolute -top-[20px] left-1/2 -translate-x-1/2 w-[100%]">
          <div className="flex justify-self-end gap-2 max-w-[300px] my-5 pl-20 ">
            {detail.status === "CREATE" ? (
              <button
                className="border border-erp-gray m-2 h-10 px-4 bg-white text-black"
                onClick={deleteOrderForm}
              >
                삭제
              </button>
            ) : (
              <button
                className="border border-erp-gray px-4 m-2 h-10 bg-white text-black"
                onClick={setFinishStatus}
              >
                종결처리
              </button>
            )}
            <button
              className="border border-erp-gray px-4 m-2 h-10 bg-erp-green text-white"
              onClick={submitOrderForm}
            >
              승인요청
            </button>
          </div>
          <div className="headerTable">
            <table className="border border-erp-gray border-collapse w-[100%] mt-10 bg-white">
              <tbody>
                <tr>
                  <td className="border border-erp-gray bg-erp-mint text-center font-semibold">
                    오더번호
                  </td>
                  <td className="border border-erp-gray">{detail.orderno}</td>
                  <td className="border border-erp-gray bg-erp-mint text-center font-semibold">
                    주문일자
                  </td>
                  <td className="border border-erp-gray">{detail.orderdate}</td>
                  <td className="border border-erp-gray bg-erp-mint text-center font-semibold">
                    등록일자
                  </td>
                  <td className="border border-erp-gray">{currentDate}</td>
                </tr>
                <tr>
                  <td className="border border-erp-gray bg-erp-mint text-center font-semibold">
                    직원코드
                  </td>
                  <td>{detail.usercd}</td>
                  <td className="border border-erp-gray bg-erp-mint text-center font-semibold">
                    바이어 코드
                  </td>
                  <td className="border border-erp-gray">{detail.buyercd}</td>
                  <td className="border border-erp-gray bg-erp-mint text-center font-semibold">
                    바이어명
                  </td>
                  <td className="border border-erp-gray ">{detail.buyernm}</td>
                </tr>
                <tr className="">
                  <td className="border border-erp-gray bg-erp-mint text-center font-semibold">
                    상태관리
                  </td>
                  <td className="border border-erp-gray">
                    {getStatName(detail.status)}
                  </td>
                  <>
                    {detail.status === "REJECT" ? (
                      <>
                        <td className="border border-erp-gray bg-erp-mint text-center font-semibold">
                          반려사유
                        </td>
                        <td className="flex gap-5 text-center">
                          {detail.rejectcode == "ETC"
                            ? detail.rejectreason
                            : detail.rejectcodenm}
                        </td>
                      </>
                    ) : (
                      ""
                    )}
                  </>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className=" mt-5 absolute top-[175px] left-1/2 -translate-x-1/2 w-[100%] h-[333px] shadow-md p-5 rounded-lg bg-white">
          <div className="z-30">
            <h1 className="text-left text-xl font-semibold ml-2">
              오더 품목 리스트
            </h1>
            <div className="relative bg-white h-[250px] top-5">
              <table className="w-[100%] absolute top-0 z-20">
                <thead className="border border-erp-gray">
                  <tr>
                    <th className="border border-erp-gray bg-erp-mint w-[40px]">
                      순번
                    </th>
                    <th className="border border-erp-gray bg-erp-mint w-[100px]">
                      판매부번 코드
                    </th>
                    <th className="border border-erp-gray bg-erp-mint w-[200px]">
                      품명
                    </th>
                    <th className="border border-erp-gray bg-erp-mint w-[100px]">
                      발주수량
                    </th>
                    <th className="border border-erp-gray bg-erp-mint w-[100px]">
                      원가
                    </th>
                    <th className="border border-erp-gray bg-erp-mint w-[100px]">
                      공급가
                    </th>
                    <th className="border border-erp-gray bg-erp-mint w-[100px]">
                      부가세
                    </th>
                    <th className="border border-erp-gray bg-erp-mint w-[100px]">
                      공급대가
                    </th>
                    <th className="border border-erp-gray bg-erp-mint w-[100px]">
                      합계금액
                    </th>
                    <th className="border border-erp-gray bg-erp-mint w-[100px]">
                      재고
                    </th>
                    <th className="border border-erp-gray bg-erp-mint w-[100px]">
                      단위
                    </th>
                    <th className="border border-erp-gray bg-erp-mint w-[150px]">
                      납품요청일
                    </th>
                    <th className="border border-erp-gray bg-erp-mint w-[50px]">
                      삭제
                    </th>
                  </tr>
                </thead>
              </table>
              <div className="orderListTable max-h-[250px] overflow-y-auto absolute top-[4px] w-[100%] bg-white">
                <table className="border border-erp-gray border-collapse w-[100%] my-5 bg-white ">
                  <tbody>
                    {detail.itemList.map((item, index) => (
                      <tr key={index}>
                        <td className="text-center border border-erp-gray w-[40px]">
                          {index + 1}
                        </td>
                        <td className="text-center border border-erp-gray w-[100px]">
                          {item.itemcd}
                        </td>
                        <td className="text-center border border-erp-gray w-[200px]">
                          {item.itemnm}
                        </td>
                        <td className="text-right border border-erp-gray  w-[100px]">
                          <OrderFormInput
                            index={index}
                            item={item}
                            field="orderqty"
                            handleItemChange={handleItemChange}
                            checkOrderQty={checkOrderQty}
                          />
                        </td>
                        <td className="text-right border border-erp-gray  w-[100px]">
                          {item.originprice}
                        </td>
                        <td className="text-right border border-erp-gray  w-[100px]">
                          <OrderFormInput
                            index={index}
                            item={item}
                            field="ordersupplyprice"
                            handleItemChange={handleItemChange}
                            checkOrderQty={checkOrderQty}
                          />
                        </td>
                        <td className="text-right border border-erp-gray  w-[100px]">
                          {(item.ordersurtax = Math.round(
                            item.ordersupplyprice / 10
                          )).toLocaleString(undefined, {
                            maximumFractionDigits: 3,
                          })}
                        </td>
                        <td className="text-right border border-erp-gray  w-[100px]">
                          {(item.ordersalesprice =
                            item.ordersupplyprice +
                            item.ordersurtax).toLocaleString(undefined, {
                            maximumFractionDigits: 3,
                          })}
                        </td>
                        <td className="text-right border border-erp-gray  w-[100px]">
                          {(
                            item.ordersalesprice * item.orderqty
                          ).toLocaleString(undefined, {
                            maximumFractionDigits: 3,
                          })}
                        </td>
                        <td className="text-center border border-erp-gray  w-[100px]">
                          {item.stock}
                        </td>
                        <td className="text-center border border-erp-gray  w-[100px]">
                          {item.unit}
                        </td>
                        <td className="text-center border border-erp-gray w-[150px]">
                          <input
                            className="border text-center w-[100%] border-erp-gray"
                            type="text"
                            onChange={(event) => handleDateChange(index, event)}
                            onBlur={() => checkDateLength(index)}
                            value={item.deliverydate || ""}
                          />
                        </td>
                        <td className="text-center  border border-erp-gray w-[50px]">
                          <button onClick={() => deleteRow(index)}>
                            {deleteIcon}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <table className="w-[100%] absolute top-[235px] z-20">
                <tr className="border-erp-gray-t-2 sticky bottom-0 bg-slate-300 border border-erp-gray">
                  <td
                    colSpan={3}
                    className="border border-erp-gray w-[149px]"
                  ></td>
                  <td className="text-right border border-erp-gray w-[120px]">
                    {calculateTotalQuantity()}
                  </td>
                  <td className="text-right border border-erp-gray w-[120px]">
                    {calculateTotalOriginPrice().toLocaleString()}
                  </td>
                  <td className="text-right border border-erp-gray w-[120px]">
                    {calculateTotalSetPrice().toLocaleString()}
                  </td>
                  <td className="text-right border border-erp-gray w-[120px]">
                    {calculateTotalTax().toLocaleString()}
                  </td>
                  <td className="text-right border border-erp-gray w-[120px]">
                    {calculateTotalPrice().toLocaleString()}
                  </td>

                  <td
                    colSpan={3}
                    className="text-center border border-erp-gray bg-erp-mint w-[87px]"
                  >
                    합계:
                  </td>
                  <td
                    colSpan={3}
                    className="text-center border border-erp-gray w-[132px]"
                  >
                    {calculateTotalSum().toLocaleString(undefined, {
                      maximumFractionDigits: 3,
                    })}
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <ItemTable
          item={item}
          setItem={setItem}
          setDetail={setDetail}
          detail={detail}
          searchResult={searchResult}
          setSearchResult={setSearchResult}
          fetchItemTable={fetchItemTable}
        />
      </div>
    </div>
  );
}

function ItemTable({
  item,
  setItem,
  setDetail,
  detail,
  searchResult,
  setSearchResult,
  fetchItemTable,
}) {
  const search = <FontAwesomeIcon icon={faMagnifyingGlass} />;
  const { error, fetchData } = useAxios();

  const handleItem = (e) => {
    setItem(e.target.value);
  };

  const addToOrderTable = (newItem) => {
    const updatedItem = {
      ...newItem,
      orderqty: 0,
      ordersupplyprice: newItem.buyersupplyprice,
      ordersurtax: 0,
      ordersalesprice: 0,
      originprice: newItem.originprice,
      itempriceid: newItem.itempriceId,
      itemcd: newItem.itemcd,
      itemnm: newItem.itemnm,
      deliverydate: "",
      leftStock: newItem.stock,
    };
    setDetail((prevForm) => ({
      ...prevForm,
      itemList: [...prevForm.itemList, updatedItem],
    }));
  };

  const enterItemTable = (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
      fetchItemTable();
    }
  };

  return (
    <div className="itemTable absolute top-[560px] left-1/2 -translate-x-1/2 w-[100%] shadow-md p-5 rounded-lg bg-white h-[265px]">
      <h1 className="text-left text-xl mt-1 font-bold ml-2">
        바이어별 판매가 검색
      </h1>
      <div className="flex gap-3 items-center mt-5 pl-2">
        <p className="text-gray-500 font-semibold">판매부번</p>
        <input
          autoFocus
          type="text"
          className="p-1 border w-[250px] border-erp-gray"
          value={item}
          onChange={handleItem}
          onKeyDown={enterItemTable}
          placeholder="판매부번명 또는 번호를 입력하세요"
        />
        <button className="-translate-x-12" onClick={fetchItemTable}>
          {search}
        </button>
      </div>
      <div className=" max-h-[185px] overflow-y-auto mt-2">
        <table className="border border-erp-gray border-collapse w-[100%] mt-5 bg-white">
          <thead className="sticky top-0  bg-erp-mint">
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
                    {result.itemcd}
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
                  <td className="border border-erp-gray text-right">
                    {result.originprice.toLocaleString()}
                  </td>
                  <td className="border border-erp-gray text-right">
                    {result.buyersupplyprice.toLocaleString()}
                  </td>
                  <td className="border border-erp-gray text-right">
                    {result.surtax.toLocaleString()}
                  </td>
                  <td className="border border-erp-gray text-right">
                    {result.salesprice.toLocaleString()}
                  </td>
                  <td className="border border-erp-gray text-center">
                    {result.unit}
                  </td>
                </tr>
              ))}
            </tbody>
          ) : null}
        </table>
      </div>
      {(!searchResult || searchResult.length === 0) && (
        <p className="mx-auto py-5 text-center">검색결과가 없습니다.</p>
      )}
    </div>
  );
}

export default OrderEdit;
