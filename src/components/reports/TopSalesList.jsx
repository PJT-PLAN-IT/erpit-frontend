/* eslint-disable react/prop-types */
const TopSalesList = ({topSalesList, month}) => {
    const day = new Date();
    // const month = day.getMonth()+1;
    return (
        <div className="h-full w-[33%] bg-white rounded-lg shadow-lg flex flex-col">
            <h className="text-center p-3 bg-gray-200 rounded-t-lg font-semibold">{month}월 상품별 매출 Top7</h>
            <div>
                <table className="flex-1 w-full text-center">
                    <thead>
                    <tr className="h-3"> {/* 각 tr의 높이를 고정 */}
                        <th className="border p-2">NO</th>
                        <th className="border p-2">판매부번코드</th>
                        <th className="border p-2">품명</th>
                        <th className="border p-2">매출액</th>
                    </tr>
                    </thead>
                    <tbody>
                    {topSalesList.map((data, index) => (
                        <tr key={index}
                            className="h-3">
                            <td className="border p-2"> {index + 1} </td>
                            <td className="border p-2"> {data.itemCd} </td>
                            <td className="border p-2"> {data.itemNm} </td>
                            <td className="border p-2"> {data.itemSales.toLocaleString()} 원</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default TopSalesList;