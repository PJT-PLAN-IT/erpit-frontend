// eslint-disable-next-line react/prop-types
import {useAuth} from "../../context/AuthContext.jsx";

const PriceTables = ({ data, setUpdateModalOpen, setUpdateData }) => {
    const headStyle = 'border border-erp-gray text-center py-2 font-semibold';
    const tdStyle = 'border border-erp-gray text-center py-3';
    const trStyle = 'bg-white cursor-pointer hover:bg-gray-200';
    const price = ['순번', '판매부번코드', '품명', '바이어코드', '바이어명', '공급가', '부가세', '판매가격', '단위', '등록일'];
    const { user } = useAuth();
    const onClickTable = (priceData) => {
        if(user.role === 'ROLE_ADMIN'){
            setUpdateData(priceData);
            setUpdateModalOpen(true);
        }
    };

    return (
        <div className={`h-[700px] overflow-y-auto mt-5`}>
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
                        <td className={`${tdStyle} text-right pr-3`}>{(price.buyersupplyprice).toLocaleString()}</td>
                        <td className={`${tdStyle} text-right pr-3`}>{(price.surtax).toLocaleString()}</td>
                        <td className={`${tdStyle} text-right pr-3`}>{(price.salesprice).toLocaleString()}</td>
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