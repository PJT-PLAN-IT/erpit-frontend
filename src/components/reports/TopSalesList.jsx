/* eslint-disable react/prop-types */
const TopSalesList = ({topSalesList}) => {
    const day = new Date();
    const month = day.getMonth()+1;
    return(
        <div className="w-1/3 p-5 bg-white shadow-lg rounded flex flex-col h-[335px]">
            <h1 className={`font-semibold text-2xl text-erp-green pb-5`}>{month}월 아이템 매출 Top7</h1>
            <div className={`h-full`}>
                <table className={`mx-5 table-fixed`}>
                    <tbody>
                    {topSalesList.map((data, index) => (
                        <>
                            <tr key={index}
                                className={`border-b border-erp-soft-gray text-center`}>
                                <td className={`py-3`}> {index + 1} </td>
                                <td className={`py-3`}> {data.itemCd}</td>
                                <td className={`py-3`}> {data.itemNm} </td>
                                <td className={`py-3 text-end`}> {data.itemSales.toLocaleString()} 원</td>
                            </tr>
                        </>
                    ))}
                    <tr
                        className={`border-b border-erp-soft-gray text-center`}>
                        <td className={`py-3`}> index + 1</td>
                        <td className={`py-3`}> data.itemCd</td>
                        <td className={`py-3`}> data.itemNm</td>
                        <td className={`py-3 text-end`}> da) 원</td>
                    </tr>
                    <tr
                        className={`border-b border-erp-soft-gray text-center`}>
                        <td className={`py-3`}> index + 1</td>
                        <td className={`py-3`}> data.itemCd</td>
                        <td className={`py-3`}> data.itemNm</td>
                        <td className={`py-3 text-end`}> da) 원</td>
                    </tr>
                    <tr
                        className={`border-b border-erp-soft-gray text-center`}>
                        <td className={`py-3`}> index + 1</td>
                        <td className={`py-3`}> data.itemCd</td>
                        <td className={`py-3`}> data.itemNm</td>
                        <td className={`py-3 text-end`}> da) 원</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default TopSalesList;