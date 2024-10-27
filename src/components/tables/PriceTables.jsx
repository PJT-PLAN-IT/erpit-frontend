const PraiceTables = ( ) => {

    const headStyle = 'border border-erp-gray text-center text-xs py-2 font-semibold';
    const tdStyle = 'border border-erp-gray text-center text-xs py-2 bg-white';
    const price= ['순번', '판매부번코드', '품명', '바이어코드', '바이어명', '공급가', '부가세', '판매가격', '단위', '등록일'];
    const data = [
        {
            "itempriceid" : 1,
            "itemcd" : "ECP0001",
            "itemnm" : "이클립스",
            "buyercd" : "CIP0001",
            "buyernm" : "바이어",
            "originprice" : 522000,
            "buyersupplyprice" : 14444,
            "surtax" : 55555,
            "salesprice" : 500000,
            "unit" : "1BOX",
            "adddate" : "2024-10-17",
        },
        {
            "itempriceid" : 2,
            "itemcd" : "ECP0002",
            "itemnm" : "이클립스(레몬향)",
            "buyercd" : "CIP0002",
            "buyernm" : "바이어",
            "originprice" : 1000000000,
            "buyersupplyprice" : 11000000000,
            "surtax" : 55555,
            "salesprice" : 500000,
            "unit" : "1BOX",
            "adddate" : "2024-10-17",
        },
    ];

    return (

        <table className={`w-full border border-erp-gray`}>
            <thead>
                <tr className={`items-center bg-erp-mint`}>
                    {price.map((sbj, index) => (
                        <td key={index} className={`${headStyle}`}>{sbj}</td>
                    ))}
                </tr>
            </thead>
            <tbody>
            {data.map((price, index) => (
                <tr key={index} className={``}>
                    <td className={`${tdStyle}`}>{index + 1}</td>
                    <td className={`${tdStyle}`}>{price.itemcd}</td>
                    <td className={`${tdStyle}`}>{price.itemnm}</td>
                    <td className={`${tdStyle}`}>{price.buyercd}</td>
                    <td className={`${tdStyle}`}>{price.buyernm}</td>
                    <td className={`${tdStyle}`}>{price.buyersupplyprice.toLocaleString()}</td>
                    <td className={`${tdStyle}`}>{price.surtax.toLocaleString()}</td>
                    <td className={`${tdStyle}`}>{price.salesprice.toLocaleString()}</td>
                    <td className={`${tdStyle}`}>{price.unit}</td>
                    <td className={`${tdStyle}`}>{price.adddate}</td>
                </tr>
            ))}
            </tbody>
        </table>
    )
};
export default PraiceTables;