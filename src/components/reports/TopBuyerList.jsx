const TopBuyerList = ({topBuyerList, month}) => {
    const day = new Date();
    // const month = day.getMonth() + 1;
    return (
    <div className="h-full w-[33%] bg-white mr-10 rounded-lg shadow-lg flex flex-col">
        <h1 className="text-center p-3 bg-gray-200 rounded-t-lg font-semibold" >{month}월 바이어별 매출 Top7</h1>
        <div>
            <table className="flex-1 w-full text-center">
                <thead>
                <tr className="h-3"> {/* 각 tr의 높이를 고정 */}
                    <th className="border p-2">NO</th>
                    <th className="border p-2">바이어코드</th>
                    <th className="border p-2">바이어이름</th>
                    <th className="border p-2">매출액</th>
                </tr>
                </thead>
                <tbody>
                {topBuyerList.map((data, index) => (
                    <tr key={index}
                        className="h-3">
                        <td className="border p-2"> {index + 1} </td>
                        <td className="border p-2"> {data.buyerCd} </td>
                        <td className="border p-2"> {data.buyerNm} </td>
                        <td className="border p-2"> {data.buyerSales.toLocaleString()} 원</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    </div>
)
}
export default TopBuyerList;