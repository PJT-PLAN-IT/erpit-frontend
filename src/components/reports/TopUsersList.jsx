const TopUsersList = ({topUsersList}) => {
    const day = new Date();
    const month = day.getMonth()+1;
    return(
        <>
            <div className={`h-full w-full`}>
                <div className={`bg-white w-full h-full shadow-lg rounded p-5 flex flex-col min-h-[310px]`}>
                    <h1 className={`font-semibold text-2xl text-erp-green pb-7`}>{month}월 영업사원 매출 Top10</h1>
                    <div className={`flex-1 flex flex-col space-y-4`}>
                        {topUsersList.map((data, index) => (
                                <div key={index}
                                     className={`border-b border-erp-gray flex flex-row justify-between items-center p-3`}>
                                    <p className={`text-lg`}> {index + 1} </p>
                                    <p className={`text-lg`}> {data.userCd} </p>
                                    <p className={`text-lg`}> {data.userNm} </p>
                                    <p className={`text-lg`}> {data.userSales} </p>
                                </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
export default TopUsersList;