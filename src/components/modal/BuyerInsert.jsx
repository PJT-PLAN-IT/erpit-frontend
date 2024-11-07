/* eslint-disable react/prop-types */
// noinspection SpellCheckingInspection,JSUnresolvedReference

import Buttons from "../items/Buttons.jsx";
import {useRef, useState} from "react";
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
    const [isSave, setIsSave] = useState(true);

    const isAddress = useRef(false);
    const isAddressdetail = useRef(false);
    const isBuyercd = useRef(false);
    const isBuyernm = useRef(false);
    const isEmail = useRef(false);
    const isTel = useRef(false);
    const isZipcode = useRef(false);


    if (!insertModalOpen) return false;

    const cancelBuyer = () => {
        setInsertModalOpen(false);
        setDuplicateCheck(true);
        setFormData(initFormData);
        setIsSave(true);
        isAddress.current = false;
        isAddressdetail.current = false;
        isBuyercd.current = false;
        isBuyernm.current =false;
        isEmail.current = false;
        isTel.current = false;
        isZipcode.current = false;
    };

    const emailcheck = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const email = formData.email;
        if(!emailRegex.test(email)){
            alert("이메일 도메인을 작성해주세요");
            return false;
        }
        return true;
    }

    //바이어 등록
    const saveBuyer = async () => {
        if(!emailcheck()){
          return;
        }

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
                setDuplicateCheck(true);
                setIsSave(true);
                isAddress.current = false;
                isAddressdetail.current = false;
                isBuyercd.current = false;
                isBuyernm.current =false;
                isEmail.current = false;
                isTel.current = false;
                isZipcode.current = false;
            }
            if (error) {
                console.error("Error: ", error);
            }
        } catch (err) {
            console.error("Error: ", err);
        }
    }


    const onChangeForm = (e) => {
        let {name, value} = e.target;

        if (value === '') {
            if (name === 'address') {
                isAddress.current = false;
            }
            if (name === 'addressdetail') {
                isAddressdetail.current = false;
            }
            if (name === 'buyernm') {
                isBuyernm.current = false;
            }
            if (name === 'email') {
                isEmail.current = false;
            }
            if (name === 'tel') {
                isTel.current = false;
            }
            if (name === 'zipcode') {
                isZipcode.current = false;
            }
        } else if (value !== '') {
            if (name === 'address') {
                isAddress.current = true;
            }
            if (name === 'addressdetail') {
                isAddressdetail.current = true;
            }
            if (name === 'buyernm') {
                isBuyernm.current = true;
            }
            if (name === 'email') {
                isEmail.current = true;
            }
            if (name === 'tel') {
                //---------------------
                if(value.length < 9){
                    console.log(value.length);
                    isTel.current = true;
                }else {
                    isTel.current = false;
                }
                value = value.replace(/[^0-9]/g, "")
                            .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
            }
            if (name === 'zipcode') {
                isZipcode.current = true;
            }
        }
        onCheckSave();
        setFormData({...formData, [name]: value});
    };

    const onCheckSave = () => {
        const check = isAddress.current && isAddressdetail.current && isBuyercd.current && isBuyernm.current && isEmail.current && isTel.current && isZipcode.current;

        if (check) {
            if (isBuyercd.current) {
                setIsSave(false);
            } else {
                setIsSave(true);
            }
        } else {
            setIsSave(true);
        }
    }

    const onDuplicateCheck = async () => {
        const dupBuyercd = formData.buyercd;
        if (dupBuyercd.trim() === "") {
            alert("바이어 코드를 입력해주세요");
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
                    isBuyercd.current = true;
                    onCheckSave();
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
                                {sbj === 'buyercd' &&
                                    <>
                                        <input
                                            name={sbj}
                                            value={formData[sbj]}
                                            onChange={onChangeForm}
                                            className={`flex-grow px-2 outline-none`}
                                            placeholder={data+' 입력 후 중복체크를 해주세요'}
                                            disabled={!duplicateCheck}
                                        />
                                        <div className={`flex items-center`}>
                                            <Buttons
                                                word={'dup'}
                                                style={duplicateCheck?'white-sm-mg-none' : 'disable-sm'}
                                                onClick={onDuplicateCheck}
                                                disabled={!duplicateCheck}
                                            />
                                        </div>
                                    </>
                                }
                                {sbj === 'buyernm' &&
                                    <input
                                        name={sbj}
                                        value={formData[sbj]}
                                        onChange={onChangeForm}
                                        placeholder={data+'을 입력해주세요'}
                                        className={`flex w-full h-full px-2 outline-none`}/>
                                }
                                {sbj === 'tel' &&
                                    <input
                                        name={sbj}
                                        value={formData[sbj]}
                                        maxLength={13}
                                        onChange={onChangeForm}
                                        placeholder={data+'를 입력해주세요'}
                                        className={`flex w-full h-full px-2 outline-none`}/>
                                }
                                {sbj === 'email' &&
                                        <input
                                            type={'email'}
                                            name={sbj}
                                            value={formData[sbj]}
                                            onChange={onChangeForm}
                                            placeholder={data + '을 입력해주세요'}
                                            className={`flex w-full h-full px-2 outline-none`}/>
                                }
                                {sbj === 'zipcode' &&
                                    <input
                                        name={sbj}
                                        value={formData[sbj]}
                                        onChange={onChangeForm}
                                        placeholder={data + '를 입력해주세요'}
                                        className={`flex w-full h-full px-2 outline-none`}/>
                                }
                                {sbj === 'address' &&
                                    <input
                                        name={sbj}
                                        value={formData[sbj]}
                                        onChange={onChangeForm}
                                        placeholder={data+'를 입력해주세요'}
                                        className={`flex w-full h-full px-2 outline-none`}/>
                                }
                                {sbj === 'addressdetail' &&
                                    <input
                                        name={sbj}
                                        value={formData[sbj]}
                                        onChange={onChangeForm}
                                        placeholder={data+'를 입력해주세요'}
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
                    <Buttons style={!isSave ? 'green-sm' : 'disable-sm'} word={'save'} onClick={saveBuyer}
                             disabled={isSave}/>
                </div>
            </div>
        </div>
    )
}
export default BuyerInsert;
