/* eslint-disable react/prop-types */
// noinspection SpellCheckingInspection,JSUnresolvedReference

import Buttons from "../items/Buttons.jsx";
import {useState} from "react";
import useAxios from "../../hook/useAxios.js";

const buyerSbj = {
    buyercd: '바이어코드',
    buyernm: '바이어명',
    tel: '전화번호',
    email: '이메일',
    zipcode: '우편번호',
    address: '주소',
    addressdetail: '상세주소'
};

const initFormData = {
    buyercd: '',
    buyernm: '',
    tel: '',
    email: '',
    zipcode: '',
    address: '',
    addressdetail: ''
};

const BuyerInsert = ({insertModalOpen, setInsertModalOpen, fetchBuyerList}) => {
    const {error, fetchData} = useAxios();
    const [formData, setFormData] = useState(initFormData);
    const [duplicateCheck, setDuplicateCheck] = useState(true);

    if (!insertModalOpen) return false;

    //바이어 등록
    const saveBuyer = async () => {
        try {
            const result = await fetchData({
                config: {method: "POST", url: "/api/buyer"},
                body: formData
            });
            if (result) {
                alert('등록되었습니다.');
                setFormData(initFormData);
                setInsertModalOpen(false);
                fetchBuyerList(true);
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
        const dupBuyercd = formData.buyercd;
        if(dupBuyercd.trim() === ""){
            alert("바이트 코드를 입력해주세요");
            return;
        }

        try {
            const result = await fetchData({
                config: {method: "GET", url: "/api/buyer/check"},
                params: {
                    buyercd: formData.buyercd
                }
            });
            if (result) {
                const resultData = result.data;
                const isDuplication = resultData.isDuplication;
                if (isDuplication) {
                    alert("바이어코드가 중복입니다. 다시 입력하세요.");
                } else {
                    alert("사용 가능한 바이어코드입니다.");
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
                <h1 className={`flex items-center justify-center font-bold text-2xl my-10`}>바이어 등록</h1>
                <table className={`w-full border-erp-gray border-x border-t`}>
                    <tbody>
                    {Object.entries(buyerSbj).map(([sbj, data]) => (
                        <tr key={sbj} className={`flex border-erp-gray border-b`}>
                            <td className={`border-erp-gray border-r bg-erp-mint p-2 flex w-32 justify-center items-center`}> {data} </td>
                            <td className={`bg-white flex-grow flex items h-12`}>
                                {sbj === 'buyercd' ?
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
                    <Buttons style={'green-sm'} word={'save'} onClick={saveBuyer} disabled={duplicateCheck}/>
                </div>
            </div>
        </div>
    )
}
export default BuyerInsert;
