const TopBuyerList = ({topBuyerList}) => {
    const day = new Date();
    const month = day.getMonth() + 1;
    return (
            <div className="w-1/3 mr-10 p-5 bg-white shadow-lg rounded flex flex-col h-[335px]">
                <h1 className={`font-semibold text-2xl text-erp-green pb-5`}>{month}월 바이어별 매출 Top7</h1>
                <div className={`h-full`}>
                    <table className={`mx-5 table-fixed`}>
                        <tbody>
                        {topBuyerList.map((data, index) => (
                            <tr key={index}
                                className={`border-b border-erp-soft-gray text-center`}>
                                <td className={`py-3`}> {index + 1} </td>
                                <td className={`py-3`}> {data.buyerCd} </td>
                                <td className={`py-3`}> {data.buyerNm} </td>
                                <td className={`py-3 text-end`}> {data.buyerSales.toLocaleString()} 원</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
    )
}
export default TopBuyerList;