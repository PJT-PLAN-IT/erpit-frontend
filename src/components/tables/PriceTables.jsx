// eslint-disable-next-line react/prop-types
const PriceTables = ({ data, setUpdateModalOpen, setUpdateData }) => {
    const headStyle = 'border border-erp-gray text-center py-2 font-semibold';
    const tdStyle = 'border border-erp-gray text-center text-sm py-3';
    const trStyle = 'bg-white cursor-pointer hover:bg-gray-200';
    const price = ['순번', '판매부번코드', '품명', '바이어코드', '바이어명', '공급가', '부가세', '판매가격', '단위', '등록일'];

    const onClickTable = (priceData) => {
        setUpdateData(priceData);
        setUpdateModalOpen(true);
    };

    return (
        <div className={`h-[620px] overflow-y-auto mt-20`}>
            <table className={`w-full`}>
                <thead className={`sticky top-0`}>
                <tr className={`items-center bg-erp-mint`}>
                    {price.map((sbj, index) => (
                        <td key={index} className={`${headStyle}`}>{sbj}</td>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data.map((price, index) => (
                    <tr key={index}
                        className={`${trStyle}`}
                        onClick={() => onClickTable(price)}
                    >
                        <td className={`${tdStyle}`}>{index + 1}</td>
                        <td className={`${tdStyle}`}>{price.itemcd}</td>
                        <td className={`${tdStyle}`}>{price.itemnm}</td>
                        <td className={`${tdStyle}`}>{price.buyercd}</td>
                        <td className={`${tdStyle}`}>{price.buyernm}</td>
                        <td className={`${tdStyle}`}>{(price.buyersupplyprice).toLocaleString()}</td>
                        <td className={`${tdStyle}`}>{(price.surtax).toLocaleString()}</td>
                        <td className={`${tdStyle}`}>{(price.salesprice).toLocaleString()}</td>
                        <td className={`${tdStyle}`}>{price.unit}</td>
                        <td className={`${tdStyle}`}>{price.adddate}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
};
export default PriceTables;