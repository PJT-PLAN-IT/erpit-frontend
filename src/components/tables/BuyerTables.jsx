/* eslint-disable react/prop-types */
import {useAuth} from "../../context/AuthContext.jsx";

const BuyerTables = ({ data, setUpdateModalOpen, setUpdateData , setSearchBuyerModalOpen}) => {
    const headStyle = 'border border-erp-gray text-center py-2 font-semibold';
    const tdStyle = 'border border-erp-gray text-center py-3';
    const trStyle = 'bg-white cursor-pointer hover:bg-gray-200';
    const buyer = ['순번', '바이어코드', '바이어명', '전화번호', '이메일', '주소', '등록일'];
    const { user } = useAuth();

    const onClickTable = (buyerData) => {
        if(user.role ==='ROLE_ADMIN'){
            if(setUpdateData){
                setUpdateData(buyerData);
            }
            if(setUpdateModalOpen){
                setUpdateModalOpen(true);
            }
            if(setSearchBuyerModalOpen){
                setSearchBuyerModalOpen(false);
            }
        }
    };

    return (
        <div className={`h-[700px] overflow-y-auto mt-5`}>
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
                    <tr key={index}
                        className={`${trStyle}`}
                        onClick={() => onClickTable(buyer)}
                    >
                        <td className={`${tdStyle}`}>{index + 1}</td>
                        <td className={`${tdStyle}`}>{buyer.buyercd}</td>
                        <td className={`${tdStyle}`}>{buyer.buyernm}</td>
                        <td className={`${tdStyle}`}>{buyer.tel}</td>
                        <td className={`${tdStyle}`}>{buyer.email}</td>
                        {buyer.zipcode === '' ?
                            <td className={`${tdStyle}`}>{buyer.address}, {buyer.addressdetail}</td>
                            :
                            <td className={`${tdStyle}`}>({buyer.zipcode}) {buyer.address}, {buyer.addressdetail}</td>
                        }
                        <td className={`${tdStyle}`}>{buyer.adddate}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )

};
export default BuyerTables;
