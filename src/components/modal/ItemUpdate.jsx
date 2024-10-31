/* eslint-disable react/prop-types */
// noinspection SpellCheckingInspection

import Buttons from "../items/Buttons.jsx";
import useAxios from "../../hook/useAxios.js";

const itemSbj = {
    itemcd: '판매부번코드',
    itemnm: '품명',
    originprice: '원가',
    supplyprice: '공급가',
    unit: '단위',
    stock: '재고',
    useyn: '비활성화'
};

const ItemUpdate = ({updateModalOpen, setUpdateModalOpen, fetchItemList, updateData, setUpdateData}) => {
    const {error, fetchData} = useAxios();

    if (!updateModalOpen) return false;

    //아이템 수정
    const updateFunction = async () => {
        try {
            const result = await fetchData({
                config: {method: "PUT", url: "/api/item"},
                body: updateData
            });
            if (result) {
                alert('등록되었습니다.');
                setUpdateModalOpen(false);
                fetchItemList(true);
            }
            if (error) {
                console.error("Error: ", error);
            }
        } catch (err) {
            console.error("Error: ", err);
        }
    }

    const onChangeForm = (e) => {
        const {name, value} = e.target;
        setUpdateData({...updateData, [name]: value});
    };

    return (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center`}>
            <div className={`bg-white rounded-lg p-6 py-3 w-[450px]`}>
                <h1 className={`flex items-center justify-center font-bold text-2xl my-10`}>판매부번 수정</h1>
                <table className={`w-full border-erp-gray border-x border-t`}>
                    <tbody>
                    {Object.entries(itemSbj).map(([sbj, data]) => (
                        <tr key={sbj} className={`flex border-erp-gray border-b`}>
                            <td className={`border-erp-gray border-r bg-erp-mint p-2 flex w-32 justify-center items-center`}> {data} </td>
                            <td className={`bg-white flex-grow flex items h-12`}>
                                {sbj === 'itemcd' ?
                                    <>
                                        <input
                                            disabled={true}
                                            name={sbj}
                                            value={updateData[sbj]}
                                            onChange={onChangeForm}
                                            className={`flex-grow px-2 outline-none`}/>
                                    </>
                                    :
                                    <input
                                        name={sbj}
                                        value={updateData[sbj]}
                                        onChange={onChangeForm}
                                        className={`flex w-full h-full px-2 outline-none`}/>
                                }
                            </td>
                        </tr>
                    ))}
                    <tr></tr>
                    </tbody>
                </table>
                <div className={`flex justify-center my-5`}>
                    <Buttons style={'white-sm'} word={'cancel'} onClick={() => setUpdateModalOpen(false)}/>
                    <Buttons style={'green-sm'} word={'save'} onClick={updateFunction}/>
                </div>
            </div>
        </div>
    )
}
export default ItemUpdate;
