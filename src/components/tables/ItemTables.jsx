const ItemTables = ({result}) => {
    const headStyle = 'border border-erp-gray text-center py-2 font-semibold';
    const tdStyle = 'border border-erp-gray text-center text-sm py-3';
    const trStyle = 'bg-white cursor-pointer hover:bg-gray-200';
    const item = ['순번', '판매부번코드', '품명', '원가', '공급가', '단위', '재고', '등록일'];

    return (
        <div className={`h-[1014px] overflow-y-auto mt-20`}>
            <table className={`w-full`}>
                <thead className={`sticky top-0`}>
                <tr className={`items-center bg-erp-mint`}>
                    {item.map((sbj, index) => (
                        <td key={index} className={`${headStyle}`}>{sbj}</td>
                    ))}
                </tr>
                </thead>
                <tbody>
                {result.map((item, index) => (
                    <tr key={index} className={`${trStyle}`}>
                        <td className={`${tdStyle}`}>{index + 1}</td>
                        <td className={`${tdStyle}`}>{item.itemCd}</td>
                        <td className={`${tdStyle}`}>{item.itemNm}</td>
                        <td className={`${tdStyle}`}>{(item.originPrice).toLocaleString()}</td>
                        <td className={`${tdStyle}`}>{(item.supplyPrice).toLocaleString()}</td>
                        <td className={`${tdStyle}`}>{item.unit}</td>
                        <td className={`${tdStyle}`}>{item.stock}</td>
                        <td className={`${tdStyle}`}>{item.addDate}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>

    )

};
export default ItemTables;