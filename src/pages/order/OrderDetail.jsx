/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import useAxios from "../../hook/useAxios";
import { useLocation, Navigate } from "react-router-dom";
import { Status } from "../../data/status";
function OrderDetail() {
  const location = useLocation();
  const { detailNo } = location.state || {};
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const [leavePage, setleavepage] = useState(false);
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

  /*오더폼 승인취소 */
  const cancelOrderForm = async () => {
    const confirmCancel = window.confirm("승인요청을 취소하시겠습니까?");
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

    if (confirmCancel) {
      orderFormInfo.status = "APRV_CNCL";
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
      setleavepage(true);
    }
  };
  if (leavePage) {
    return <Navigate to="/order/list" replace />;
  }

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
    return <div>페이지를 불러오는 중...</div>;
  }

  return detail.itemList.length > 0 ? (
    <div className="flex">
      <div className="flex-col bg-erp-soft-gray p-7 w-[100%] ">
        {detail.status == "APRV_REQ" ? (
          <div className="flex justify-end ">
            <button
              onClick={cancelOrderForm}
              className="border border-erp-gray px-4 m-4 h-10 bg-erp-green text-white"
            >
              승인취소
            </button>
          </div>
        ) : (
          ""
        )}
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
                <td className="border border-erp-gray">{detail.adddate}</td>
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
                {Status.map((stat) =>
                  stat.id == detail.status ? (
                    <td className="border border-erp-gray" key={detail.status}>
                      {stat.name}
                    </td>
                  ) : (
                    ""
                  )
                )}
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
              </tr>
            </tbody>
          </table>
        </div>

        <div className="orderListTable mt-16  shadow-md p-5 rounded-lg bg-white">
          <h1 className="text-left font-medium text-xl font-semibold">
            오더 품목 리스트
          </h1>
          <div className="max-h-[600px]  overflow-y-auto">
            <table className="border border-erp-gray border-collapse w-[100%] mt-5 bg-white">
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
                    판매가
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
                      {item.orderqty.toLocaleString()}
                    </td>
                    <td className="text-center border border-erp-gray">
                      {item.originprice.toLocaleString()}
                    </td>
                    <td className="text-center border border-erp-gray">
                      {item.ordersupplyprice.toLocaleString()}
                    </td>
                    <td className="text-center border border-erp-gray">
                      {item.ordersurtax.toLocaleString()}
                    </td>
                    <td className="text-center border border-erp-gray">
                      {item.ordersalesprice.toLocaleString()}
                    </td>
                    <td className="text-center border border-erp-gray">
                      {(item.ordersalesprice * item.orderqty).toLocaleString()}
                    </td>
                    <td className="text-center border border-erp-gray">
                      {item.stock.toLocaleString()}
                    </td>
                    <td className="text-center border border-erp-gray">
                      {item.unit}
                    </td>
                    <td className="text-center border border-erp-gray">
                      {item.deliverydate}
                    </td>
                  </tr>
                ))}

                <tr className="border border-erp-gray-t-2 bg-slate-300 ">
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

                  <td
                    colSpan={3}
                    className="text-center border border-erp-gray bg-erp-mint font-semibold"
                  >
                    합계
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

export default OrderDetail;
