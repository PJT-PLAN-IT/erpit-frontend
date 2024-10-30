const BuyerTables = ({ data }) => {
    const headStyle = 'border border-erp-gray text-center py-2 font-semibold';
    const tdStyle = 'border border-erp-gray text-center text-sm py-3';
    const trStyle = 'bg-white cursor-pointer hover:bg-gray-200';
    const buyer = ['순번', '바이어코드', '바이어명', '전화번호', '이메일', '주소', '등록일'];
    return (
        <div className={`h-[1014px] overflow-y-auto mt-20`}>
            <table className={`w-full`}>
                <thead className={`sticky top-0`}>
                <tr className={`items-center bg-erp-mint`}>
                    {buyer.map((sbj, index) => (
                        <td key={index} className={`${headStyle}`}>{sbj}</td>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data.map((buyer, index) => (
                    <tr key={index} className={`${trStyle}`}>
                        <td className={`${tdStyle}`}>{index + 1}</td>
                        <td className={`${tdStyle}`}>{buyer.buyerCd}</td>
                        <td className={`${tdStyle}`}>{buyer.buyerNm}</td>
                        <td className={`${tdStyle}`}>{buyer.tel}</td>
                        <td className={`${tdStyle}`}>{buyer.email}</td>
                        <td className={`${tdStyle}`}>({buyer.zipCode}) {buyer.address}</td>
                        <td className={`${tdStyle}`}>{buyer.addDate}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>

    )

};
export default BuyerTables;
