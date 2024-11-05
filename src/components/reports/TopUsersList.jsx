const TopUsersList = ({topUsersList}) => {
    const day = new Date();
    const month = day.getMonth()+1;
    return(
        <>
            <div className={`h-full w-full`}>
                <div className={`bg-white w-full h-full shadow-lg rounded p-5 flex flex-col min-h-[448px]`}>
                    <h1 className={`font-semibold text-2xl text-erp-green pb-10`}>{month}월 영업사원 매출 Top10</h1>
                    <table className={`mx-10`}>
                        <tbody>
                        {topUsersList.map((data, index) => (
                            <tr key={index}
                                className={`border-b border-erp-soft-gray text-center`}>
                                <td className={`text-lg py-3`}> {index + 1} </td>
                                <td className={`text-lg py-3`}> {data.userCd} </td>
                                <td className={`text-lg py-3`}> {data.userNm} </td>
                                <td className={`text-lg py-3 text-end`}> {data.userSales.toLocaleString()} 원</td>
                            </tr>
                    ))}
                    </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
export default TopUsersList;