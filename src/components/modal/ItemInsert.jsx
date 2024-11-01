/* eslint-disable react/prop-types */
// noinspection SpellCheckingInspection,JSUnresolvedReference

import Buttons from "../items/Buttons.jsx";
import {useState} from "react";
import useAxios from "../../hook/useAxios.js";

const itemSbj = {
    itemcd: '판매부번코드',
    itemnm: '품명',
    originprice: '원가',
    supplyprice: '공급가',
    unit: '단위',
    stock: '재고',
};

const initFormData = {
    itemcd: '',
    itemnm: '',
    originprice: '',
    supplyprice: '',
    stock: '',
    unit: '',
};

const ItemInsert = ({insertModalOpen, setInsertModalOpen, fetchItemList}) => {
    const {error, fetchData} = useAxios();
    const [formData, setFormData] = useState(initFormData);
    const [duplicateCheck, setDuplicateCheck] = useState(true);

    if (!insertModalOpen) return false;

    //판매부번 등록
    const saveItem = async () => {
        try {
            const result = await fetchData({
                config: {method: "POST", url: "/api/item"},
                body: formData
            });
            if (result) {
                alert('등록되었습니다.');
                setFormData(initFormData);
                setInsertModalOpen(false);
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
        setFormData({...formData, [name]: value});
    };

    const onDuplicateCheck = async () => {
        const dupItemcd = formData.itemcd;
        if(dupItemcd.trim() === ""){
            alert("판매부번코드를 입력해주세요");
            return;
        }

        try {
            const result = await fetchData({
                config: {method: "GET", url: "/api/item/check"},
                params: {
                    itemcd: formData.itemcd
                }
            });
            if (result) {
                const resultData = result.data;
                const isDuplication = resultData.isDuplication;
                if (isDuplication) {
                    alert("판매부번코드가 중복입니다. 다시 입력하세요.");
                } else {
                    alert("사용 가능한 판매부번코드 입니다.");
                }
                setDuplicateCheck(isDuplication);
            }
            if (error) {
                console.error("Error: ", error);
            }
        } catch (err) {
            console.error("Error: ", err);
        }
    };

    return (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center`}>
           <div className={`bg-white rounded-lg p-6 py-3 w-[450px]`}>
                <h1 className={`flex items-center justify-center font-bold text-2xl my-10`}>판매부번 등록</h1>
                <table className={`w-full border-erp-gray border-x border-t`}>
                    <tbody>
                    {Object.entries(itemSbj).map(([sbj, data]) => (
                        <tr key={sbj} className={`flex border-erp-gray border-b`}>
                            <td className={`border-erp-gray border-r bg-erp-mint p-2 flex w-32 justify-center items-center`}> {data} </td>
                            <td className={`bg-white flex-grow flex items h-12`}>
                                {sbj === 'itemcd' ?
                                    <>
                                        <input
                                            name={sbj}
                                            value={formData[sbj]}
                                            onChange={onChangeForm}
                                            className={`flex-grow px-2 outline-none`}
                                            disabled={!duplicateCheck}
                                        />
                                        <div className={`flex items-center`}>
                                            <Buttons
                                                word={'dup'}
                                                style={'white-sm-mg-none'}
                                                onClick={onDuplicateCheck}
                                                disabled={!duplicateCheck}
                                            />
                                        </div>
                                    </>
                                    :
                                    <input
                                        name={sbj}
                                        value={formData[sbj]}
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
                    <Buttons style={'white-sm'} word={'cancel'} onClick={() => setInsertModalOpen(false)}/>
                    <Buttons style={'green-sm'} word={'save'} onClick={saveItem} disabled={duplicateCheck}/>
                </div>
            </div>
        </div>
    )
}
export default ItemInsert;
