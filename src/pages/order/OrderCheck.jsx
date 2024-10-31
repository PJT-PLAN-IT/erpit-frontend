import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import useAxios from "../../hook/useAxios";
import { useLocation } from "react-router-dom";
import { rejects } from "../../data/rejects";
function OrderCheck() {
  const location = useLocation();
  const { detailNo } = location.state || {};
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const [leavePage, setleavepage] = useState(false);
  const [reject, setReject] = useState("");
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
        } finally {
          setLoading(false);
        }
      };

      getDetail();
    }
  }, [detailNo]);
  console.log(detail);
  const calculateTotalQuantity = () =>
    detail.itemList?.reduce((sum, item) => sum + item.orderqty, 0) || 0;

  const calculateTotalOriginPrice = () =>
    detail.itemList?.reduce((sum, item) => sum + item.originprice, 0) || 0;

  const calculateTotalSetPrice = () =>
    detail.itemList?.reduce((sum, item) => sum + item.ordersupplyprice, 0) || 0;

  const calculateTotalTax = () =>
    detail.itemList?.reduce((sum, item) => sum + item.ordersurtax, 0) || 0;

  const calculateTotalsupplyPrice = () =>
    detail.itemList?.reduce(
      (sum, item) => sum + item.ordersalesprice * item.orderqty,
      0
    ) || 0;

  const calculateTotalPrice = () =>
    detail.itemList?.reduce((sum, item) => sum + item.ordersalesprice, 0) || 0;

  const calculateTotalSum = () =>
    detail.itemList?.reduce(
      (sum, item) => sum + item.ordersalesprice * item.orderqty,
      0
    ) || 0;

  if (loading) {
    return <div>Loading...</div>;
  }

  /*요청상태 검색 변화 저장 */
  const handleStatusChange = (e) => {
    console.log(e.target.value);
    setDetail((prev) => ({
      ...prev,
      status: e.target.value,
    }));
  };

  /*반려 변화 저장 */
  const handleRejectChange = (e) => {
    setReject(e.target.value);
    setDetail((prev) => ({
      ...prev,
      rejectcode: e.target.value,
    }));
  };

  /*반려 사유 저장 */
  const handleRejectInfoChange = (e) => {
    setDetail((prev) => ({
      ...prev,
      rejectreason: e.target.value,
    }));
  };

  /*결제 확인 */
  const setFinishStatus = async () => {
    const setFinish = window.confirm("결제하시겠습니까?");

    if (setFinish) {
      const finishStatus = {
        orderno: detail.orderno,
        status: detail.status,
        rejectcode: detail.rejectcode,
        rejectreason: detail.rejectreason || "",
      };
      console.log(finishStatus);
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
  if (leavePage) {
    return <Navigate to="/order/statlist" replace />;
  }

  return detail.itemList.length > 0 ? (
    <div className="flex">
      <div className="flex-col bg-erp-soft-gray p-7 w-[100%]">
        <div className="flex justify-self-end">
          <button
            className="border border-erp-gray px-4 bg-erp-green text-white"
            onClick={setFinishStatus}
          >
            결제하기
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
                <td className="border border-erp-gray">{detail.adddate}</td>
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
                <td className="border border-erp-gray ">
                  <select onChange={handleStatusChange}>
                    <option value={detail.status} defaultChecked={true}>
                      승인요청
                    </option>
                    <option value={"REJECT"}>반려</option>
                    <option value={"APRV_CMPT"}>승인완료</option>
                  </select>
                </td>
                {detail.status === "REJECT" ? (
                  <>
                    <td className="border border-erp-gray bg-erp-mint text-center">
                      반려사유
                    </td>
                    <td className="flex gap-5 text-center">
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
                      {detail.reject === "ETC" ? (
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
                      {item.orderqty}
                    </td>
                    <td className="text-center border border-erp-gray">
                      {item.originprice}
                    </td>
                    <td className="text-center border border-erp-gray">
                      {item.ordersupplyprice}
                    </td>
                    <td className="text-center border border-erp-gray">
                      {item.ordersurtax}
                    </td>
                    <td className="text-center border border-erp-gray">
                      {item.ordersalesprice}
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
                      {item.deliverydate}
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
                    {calculateTotalPrice().toLocaleString()}
                  </td>
                  <td className="text-center border border-erp-gray">
                    {calculateTotalsupplyPrice().toLocaleString()}
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
      </div>
    </div>
  ) : (
    "loading"
  );
}

export default OrderCheck;
