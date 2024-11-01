/* eslint-disable react/prop-types */
import {useAuth} from "../../context/AuthContext.jsx";

const ItemTables = ({ data, setUpdateModalOpen, setUpdateData, setSearchItemModalOpen }) => {
    const headStyle = 'border border-erp-gray text-center py-2 font-semibold';
    const tdStyle = 'border border-erp-gray text-center text-sm py-3';
    const trStyle = 'bg-white cursor-pointer hover:bg-gray-200';
    const item = ['순번', '판매부번코드', '품명', '원가', '공급가', '단위', '재고', '등록일'];
    const { user } = useAuth();

    const onClickTable = (itemData) => {
        if(user.role === 'ROLE_ADMIN') {
            if (setUpdateData) {
                setUpdateData(itemData);
            }
            if (setUpdateModalOpen) {
                setUpdateModalOpen(true);
            }
            if (setSearchItemModalOpen) {
                setSearchItemModalOpen(false);
            }
        }
    };

    return (
        <div className={`h-[620px] overflow-y-auto mt-20`}>
            <table className={`w-full`}>
                <thead className={`sticky top-0`}>
                <tr className={`items-center bg-erp-mint`}>
                    {item.map((sbj, index) => (
                        <td key={index} className={`${headStyle}`}>{sbj}</td>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr key={index}
                        className={`${trStyle}`}
                        onClick={() => onClickTable(item)}
                    >
                        <td className={`${tdStyle}`}>{index + 1}</td>
                        <td className={`${tdStyle}`}>{item.itemcd}</td>
                        <td className={`${tdStyle}`}>{item.itemnm}</td>
                        <td className={`${tdStyle}`}>{(item.originprice).toLocaleString()}</td>
                        <td className={`${tdStyle}`}>{(item.supplyprice).toLocaleString()}</td>
                        <td className={`${tdStyle}`}>{item.unit}</td>
                        <td className={`${tdStyle}`}>{item.stock}</td>
                        <td className={`${tdStyle}`}>{item.adddate}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>

    )

};
export default ItemTables;