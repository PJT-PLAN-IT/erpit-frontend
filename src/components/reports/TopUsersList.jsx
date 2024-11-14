const TopUsersList = ({topUsersList, month}) => {
    // const day = new Date();
    // const month = day.getMonth()+1;
    return (
        // <div className={`flex flex-col`}>
        <div className="h-full w-[33%] bg-white mr-10 rounded-lg shadow-lg flex flex-col">
            <h1 className="text-center p-3 bg-gray-200 rounded-t-lg font-semibold">{month}월 전체 영업사원 매출 Top7</h1>
            <div>
                <table className="flex-1 w-full text-center">
                    <thead>
                    <tr className="h-3"> {/* 각 tr의 높이를 고정 */}
                        <th className="border p-2">NO</th>
                        <th className="border p-2">직원코드</th>
                        <th className="border p-2">직원이름</th>
                        <th className="border p-2">매출액</th>
                    </tr>
                    </thead>
                    <tbody>
                    {topUsersList.map((data, index) => (
                        <tr key={index}
                            className="h-3">
                            <td className="border p-2"> {index + 1} </td>
                            <td className="border p-2"> {data.userCd} </td>
                            <td className="border p-2"> {data.userNm} </td>
                            <td className="border p-2"> {data.userSales.toLocaleString()} 원</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default TopUsersList;