const BuyerTables = () => {

    const headStyle = 'border border-erp-gray text-center text-xs py-2 font-semibold';
    const tdStyle = 'border border-erp-gray text-center text-xs py-2 bg-white';
    const buyer = ['순번', '바이어코드', '바이어명', '전화번호', '이메일', '주소', '등록일'];
    const data = [
        {
            "buyerId": 1,
            "buyerCd": "CIP0001",
            "buyerNm": "중앙정보처리학원",
            "tel": "02-561-1911",
            "email": "infoprotect@choongang.co.kr",
            "zipCode": "06134",
            "address": "서울 강남구 테헤란로7길 7에스코빌딩 5~7층",
            "addDate": "2024.10.27"
        },
        {
            "buyerId": 1,
            "buyerCd": "CIP0002",
            "buyerNm": "테스트중",
            "tel": "02-561-1911",
            "email": "infoprotect@choongang.co.kr",
            "zipCode": "06134",
            "address": "서울 강남구 테스트의 테스트",
            "addDate": "2024.10.30"
        }
    ];


    return (

        <table className={`w-full border border-erp-gray`}>
            <thead>
            <tr className={`items-center bg-erp-mint`}>
                {buyer.map((sbj, index) => (
                    <td key={index} className={`${headStyle}`}>{sbj}</td>
                ))}
            </tr>
            </thead>
            <tbody>
            {data.map((buyer, index) => (
                <tr key={index}>
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

    )

};
export default BuyerTables;