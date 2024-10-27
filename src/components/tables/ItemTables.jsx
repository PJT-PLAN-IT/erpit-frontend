const ItemTables = () => {

    const headStyle = 'border border-erp-gray text-center text-xs py-2 font-semibold';
    const tdStyle = 'border border-erp-gray text-center text-xs py-2 bg-white';
    const item = ['순번', '판매부번코드',  '품명','원가', '공급가', '단위', '재고', '등록일'];
    const data = [
        {
            "itemid" : 1,
            "itemcd" : "ECP0001",
            "itemnm" : "이클립스",
            "originprice" : 500,
            "supplyprice" : 300,
            "unit" : "EA",
            "stock" : 100,
            "adddate" : "2024-10-17",
        },
        {
            "itemid" : 2,
            "itemcd" : "ECP0002",
            "itemnm" : "이클립스",
            "originprice" : 50000,
            "supplyprice" : 60000,
            "unit" : "BOX",
            "stock" : 12,
            "adddate" : "2024-10-17",
        }
    ];

    return (

        <table className={`w-full border border-erp-gray`}>
            <thead>
                <tr className={`items-center bg-erp-mint`}>
                    {item.map((sbj, index) => (
                        <td key={index} className={`${headStyle}`}>{sbj}</td>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index} className={``}>
                        <td className={`${tdStyle}`}>{index + 1}</td>
                        <td className={`${tdStyle}`}>{item.itemcd}</td>
                        <td className={`${tdStyle}`}>{item.itemnm}</td>
                        <td className={`${tdStyle}`}>{item.originprice.toLocaleString()}</td>
                        <td className={`${tdStyle}`}>{item.supplyprice.toLocaleString()}</td>
                        <td className={`${tdStyle}`}>{item.unit}</td>
                        <td className={`${tdStyle}`}>{item.stock}</td>
                        <td className={`${tdStyle}`}>{item.adddate}</td>
                    </tr>
                ))}
            </tbody>
        </table>

    )

};
export default ItemTables;