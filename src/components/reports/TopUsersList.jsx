const TopUsersList = ({topUsersList}) => {
    const day = new Date();
    const month = day.getMonth()+1;
    return (
        // <div className={`flex flex-col`}>
        <div className="w-1/3 mr-10 p-5 bg-white shadow-lg rounded flex flex-col h-[335px]">
            <h1 className={`font-semibold text-2xl text-erp-green pb-5`}>{month}월 영업사원 매출 Top7</h1>
            <div className={`h-full`}>
            <table className={`mx-5 table-fixed`}>
                <tbody>
                {topUsersList.map((data, index) => (
                    <tr key={index}
                        className={`border-b border-erp-soft-gray text-center`}>
                        <td className={`py-3`}> {index + 1} </td>
                        <td className={`py-3`}> {data.userCd} </td>
                        <td className={`py-3`}> {data.userNm} </td>
                        <td className={`py-3 text-end`}> {data.userSales.toLocaleString()} 원</td>
                    </tr>
                ))}
                <tr
                    className={`border-b border-erp-soft-gray text-center`}>
                    <td className={`py-3`}> index</td>
                    <td className={`py-3`}> data.userCd</td>
                    <td className={`py-3`}> data.userNm</td>
                    <td className={`py-3 text-end`}> data.userSales.toLocaleString() 원</td>
                </tr>
                <tr
                    className={`border-b border-erp-soft-gray text-center`}>
                    <td className={`py-3`}> index</td>
                    <td className={`py-3`}> data.userCd</td>
                    <td className={`py-3`}> data.userNm</td>
                    <td className={`py-3 text-end`}> data.userSales.toLocaleString() 원</td>
                </tr>
                <tr
                    className={`border-b border-erp-soft-gray text-center`}>
                    <td className={`py-3`}> index</td>
                    <td className={`py-3`}> data.userCd</td>
                    <td className={`py-3`}> data.userNm</td>
                    <td className={`py-3 text-end`}> data.userSales.toLocaleString() 원</td>
                </tr>
                <tr
                    className={`border-b border-erp-soft-gray text-center`}>
                    <td className={`py-3`}> index</td>
                    <td className={`py-3`}> data.userCd</td>
                    <td className={`py-3`}> data.userNm</td>
                    <td className={`py-3 text-end`}> data.userSales.toLocaleString() 원</td>
                </tr>
                <tr
                    className={`border-b border-erp-soft-gray text-center`}>
                    <td className={`py-3`}> index</td>
                    <td className={`py-3`}> data.userCd</td>
                    <td className={`py-3`}> data.userNm</td>
                    <td className={`py-3 text-end`}> data.userSales.toLocaleString() 원</td>
                </tr>

                </tbody>
            </table>
            </div>
        </div>
    )
}
export default TopUsersList;