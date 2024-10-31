const PraiceTables = ({result}) => {
    const headStyle = 'border border-erp-gray text-center py-2 font-semibold';
    const tdStyle = 'border border-erp-gray text-center text-sm py-3';
    const trStyle = 'bg-white cursor-pointer hover:bg-gray-200';
    const price = ['순번', '판매부번코드', '품명', '바이어코드', '바이어명', '공급가', '부가세', '판매가격', '단위', '등록일'];
    return (
        <div className={`h-[1014px] overflow-y-auto mt-20`}>
            <table className={`w-full`}>
                <thead className={`sticky top-0`}>
                <tr className={`items-center bg-erp-mint`}>
                    {price.map((sbj, index) => (
                        <td key={index} className={`${headStyle}`}>{sbj}</td>
                    ))}
                </tr>
                </thead>
                <tbody>
                {result.map((price, index) => (
                    <tr key={index} className={`${trStyle}`}>
                        <td className={`${tdStyle}`}>{index + 1}</td>
                        <td className={`${tdStyle}`}>{price.itemCd}</td>
                        <td className={`${tdStyle}`}>{price.itemNm}</td>
                        <td className={`${tdStyle}`}>{price.buyerCd}</td>
                        <td className={`${tdStyle}`}>{price.buyerNm}</td>
                        <td className={`${tdStyle}`}>{(price.buyerSupplyPrice).toLocaleString()}</td>
                        <td className={`${tdStyle}`}>{(price.surtax).toLocaleString()}</td>
                        <td className={`${tdStyle}`}>{(price.salesPrice).toLocaleString()}</td>
                        <td className={`${tdStyle}`}>{price.unit}</td>
                        <td className={`${tdStyle}`}>{price.addDate}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
};
export default PraiceTables;