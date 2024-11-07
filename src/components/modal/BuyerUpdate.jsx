/* eslint-disable react/prop-types */
// noinspection SpellCheckingInspection

import Buttons from "../items/Buttons.jsx";
import useAxios from "../../hook/useAxios.js";
import {useEffect, useRef, useState} from "react";

const buyerSbj = {
    buyercd: '바이어코드',
    buyernm: '바이어명',
    tel: '전화번호',
    email: '이메일',
    zipcode: '우편번호',
    address: '주소',
    addressdetail: '상세주소'
};

const BuyerUpdate = ({updateModalOpen, setUpdateModalOpen, fetchBuyerList, updateData, setUpdateData}) => {
    const {error, fetchData} = useAxios();
    const [isSave, setIsSave] = useState(true);
    const [beforeUpdate, setBeforeUpdate] = useState(updateData);

    const isAddress = useRef(true);
    const isAddressdetail = useRef(true);
    const isBuyernm = useRef(true);
    const isEmail = useRef(true);
    const isTel = useRef(true);
    const isZipcode = useRef(true);

    useEffect(() => {
        setBeforeUpdate(updateData);
    }, [updateModalOpen]);


    if (!updateModalOpen) return false;

    const emailcheck = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const email = updateData.email;
        if(!emailRegex.test(email)){
            alert("이메일 도메인을 작성해주세요");
            return false;
        }
        return true;
    }
    //바이어 수정
    const updateFunction = async () => {
        if(!emailcheck()){
            return;
        }
        try {
            const result = await fetchData({
                config: {method: "PUT", url: "/api/buyer"},
                body: updateData
            });
            if (result) {
                alert('수정되었습니다.');
                setUpdateModalOpen(false);
                fetchBuyerList(true);
                setIsSave(true);
                isAddress.current = true;
                isAddressdetail.current = true;
                isBuyernm.current = true;
                isEmail.current = true;
                isTel.current = true;
                isZipcode.current = true;
            }
            if (error) {
                console.error("Error: ", error);
            }
        } catch (err) {
            console.error("Error: ", err);
        }
    }

    const cancelBuyer =()=> {
        setUpdateModalOpen(false);
        setIsSave(true);
        isAddress.current = true;
        isAddressdetail.current = true;
        isBuyernm.current = true;
        isEmail.current = true;
        isTel.current = true;
        isZipcode.current = true;
    }



    const onChangeForm = (e) => {
        let {name, value} = e.target;

        if(value === ''){
            if(name === 'buyernm'){
                isBuyernm.current = false;
            }
            if(name === 'tel'){
                isTel.current = false;
            }
            if(name === 'email'){
                isEmail.current = false;
            }
            if(name === 'address'){
                isAddress.current = false;
            }
            if(name === 'addressdetail'){
                isAddressdetail.current = false;
            }
            if(name === 'zipcode'){
                isZipcode.current = false;
            }
        }else {
            if(name === 'buyernm'){
                isBuyernm.current = beforeUpdate.buyernm !== value;
            }
            if(name === 'tel'){
                if(value.length < 11){
                    console.log(value.length);
                    isTel.current = false;
                }else {
                    console.log(value.length);
                    isTel.current = true;
                }
                value = value.replace(/[^0-9]/g, "")
                    .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
            }
            if(name === 'email'){
                isEmail.current = beforeUpdate.email !== value;
            }
            if(name === 'address'){
                isAddress.current = beforeUpdate.address !== value;
            }
            if(name === 'addressdetail'){
                isAddressdetail.current = beforeUpdate.addressdetail !== value;
            }
            if(name === 'zipcode'){
                isZipcode.current = beforeUpdate.zipcode !== value;
            }
        }
        setUpdateData({...updateData, [name]: value});
        checkData();
    };

    const checkData = () => {
        const bol = (isBuyernm.current && isTel.current && isEmail.current && isZipcode.current && isAddress.current && isAddressdetail.current);
        if(!bol){
            setIsSave(true);
        }else {
                setIsSave(false);
        }
    }



    return (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center`}>
            <div className={`bg-white rounded-lg p-6 py-3 w-[450px]`}>
                <h1 className={`flex items-center justify-center font-bold text-2xl my-10`}>바이어 수정</h1>
                <table className={`w-full border-erp-gray border-x border-t`}>
                    <tbody>
                    {Object.entries(buyerSbj).map(([sbj, data]) => (
                        <tr key={sbj} className={`flex border-erp-gray border-b`}>
                            <td className={`border-erp-gray border-r bg-erp-mint p-2 flex w-32 justify-center items-center`}> {data} </td>
                            <td className={`bg-white flex-grow flex items h-12`}>
                                {sbj === 'buyercd' &&
                                    <>
                                        <input
                                            disabled={true}
                                            name={sbj}
                                            value={updateData[sbj]}
                                            onChange={onChangeForm}
                                            className={`flex-grow px-2 outline-none`}/>
                                    </>
                                }
                                {sbj === 'buyernm' &&
                                    <input
                                        name={sbj}
                                        value={updateData[sbj]}
                                        onChange={onChangeForm}
                                        className={`flex w-full h-full px-2 outline-none`}/>
                                }
                                {sbj === 'tel' &&
                                    <input
                                        name={sbj}
                                        value={updateData[sbj]}
                                        maxLength={13}
                                        minLength={12}
                                        onChange={onChangeForm}
                                        className={`flex w-full h-full px-2 outline-none`}/>
                                }
                                {sbj === 'email' &&
                                    <input
                                        name={sbj}
                                        value={updateData[sbj]}
                                        onChange={onChangeForm}
                                        className={`flex w-full h-full px-2 outline-none`}/>
                                }
                                {sbj === 'zipcode' &&
                                    <input
                                        name={sbj}
                                        value={updateData[sbj]}
                                        onChange={onChangeForm}
                                        className={`flex w-full h-full px-2 outline-none`}/>
                                }
                                {sbj === 'address' &&
                                    <input
                                        name={sbj}
                                        value={updateData[sbj]}
                                        onChange={onChangeForm}
                                        className={`flex w-full h-full px-2 outline-none`}/>
                                }
                                {sbj === 'addressdetail' &&
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
                    <Buttons style={'white-sm'} word={'cancel'} onClick={cancelBuyer}/>
                    <Buttons style={!isSave ? 'green-sm' : 'disable-sm'} word={'save'} onClick={updateFunction} disabled={isSave}/>
                </div>
            </div>
        </div>
    )
}
export default BuyerUpdate;
