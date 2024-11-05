/* eslint-disable react/prop-types */
const TopSalesList = ({topSalesList}) => {
    const day = new Date();
    const month = day.getMonth()+1;
    return(
        <>
            <div className={`h-2/3 w-full pt-5`}>
                <div className={`bg-white w-full h-full shadow-lg rounded p-5 flex flex-col`}>
                    <h1 className={`font-semibold text-2xl text-erp-green pb-7`}>{month}월 매출 Top5</h1>
                    <div className={`flex-1 flex flex-col space-y-4`}>
                        {topSalesList.map((data, index) => (
                            <div key={index} className={`border-b border-erp-soft-gray flex flex-row justify-between items-center p-3`}>
                                <p className={`text-lg`}> {data.itemNm} </p>
                                <p className={`text-lg`}>{data.itemSales.toLocaleString()} 원</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
export default TopSalesList;