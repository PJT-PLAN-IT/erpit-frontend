/* eslint-disable react/prop-types */
// noinspection SpellCheckingInspection,JSUnresolvedReference

import Buttons from "../items/Buttons.jsx";
import {useRef, useState} from "react";
import useAxios from "../../hook/useAxios.js";
import {unit} from "../../data/unit.js";

const itemSbj = {
    itemcd: '판매부번코드',
    itemnm: '품명',
    originprice: '원가',
    supplyprice: '공급가',
    stock: '재고',
    unit: '단위',
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
    const [copyFormData, setCopyFormData] = useState(initFormData);
    const [duplicateCheck, setDuplicateCheck] = useState(true);
    const isItemcd = useRef(false);
    const isItennm = useRef(false);
    const isOriginprice = useRef(false);
    const isSupplyprice = useRef(false);
    const isStock = useRef(false);
    const isUnit = useRef(false);
    const isSave = useRef(true);


    if (!insertModalOpen) return false;

    //판매부번 등록
    const saveItem = async () => {
        if(copyFormData.supplyprice < copyFormData.originprice){
            alert("공급가가 원가보다 적습니다!");
            return;
        }

        try {
            const result = await fetchData({
                config: {method: "POST", url: "/api/item"},
                body: copyFormData
            });
            if (result) {
                alert('등록되었습니다.');
                fetchItemList(true);
                setFormData(initFormData);
                setInsertModalOpen(false);
                setDuplicateCheck(true);
                isItemcd.current = false;
                isItennm.current = false;
                isOriginprice.current = false;
                isSupplyprice.current = false;
                isStock.current = false;
                isUnit.current = false;
                isSave.current = true;
            }
            if (error) {
                console.error("Error: ", error);
            }
        } catch (err) {
            console.error("Error: ", err);
        }
    }

    const cancleClick = () => {
        setInsertModalOpen(false);
        setFormData(initFormData);
        setDuplicateCheck(true);
        isItemcd.current = false;
        isItennm.current = false;
        isOriginprice.current = false;
        isSupplyprice.current = false;
        isStock.current = false;
        isUnit.current = false;
        isSave.current = true;
    }

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
                    isItemcd.current = true;
                    checkSave();
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

    const onChangeForm = (e) => {
        let {name, value} = e.target;
        if(value === ''){
            if(name === 'itemnm'){
                isItennm.current = false;
            }
            if(name === 'originprice'){
                isOriginprice.current = false;
            }
            if(name === 'supplyprice'){
                isSupplyprice.current = false;
            }
            if(name === 'stock'){
                isStock.current = false;
            }
            if(name === 'unit') {
                isUnit.current = false;
            }
        }else {
            if(name === 'itemnm'){
                isItennm.current = true;
            }
            if(name === 'originprice'){
                isOriginprice.current = true;
                value = checkNumber(value);
            }
            if(name === 'supplyprice'){
                isSupplyprice.current = true;
                value = checkNumber(value);
            }
            if(name === 'stock'){
                isStock.current = true;
                value = checkNumber(value);
            }
            if(name === 'unit') {
                if(value === 'none'){
                    isUnit.current = false;
                }else{
                    isUnit.current = true;
                }
            }
        }

        checkSave();

        setFormData({...formData, [name]: value});
        if(name === 'originprice' || name === 'supplyprice' || name === 'stock'){
            value = deleteComma(value);
            setCopyFormData({...copyFormData, [name]:value});
        }else if(e.target.tagName ==='SELECT'){
            setCopyFormData({...copyFormData, ['unit']:value});
            setFormData({...formData, ['unit']: value});
        }else{
            setCopyFormData({...copyFormData, [name]:value});
        }


    };

    const deleteComma = (value) => {
        const formValue = value.replace(/,/g, "");
        return formValue;
    }

    const checkSave = () => {
        const saveCheck = (isItemcd.current && isItennm.current &&  isOriginprice.current && isSupplyprice.current && isStock.current && isUnit.current );

        if(saveCheck){
            isSave.current = false;
        }else {
            isSave.current = true;
        }
    }

    const checkNumber = (value) => {
        let inputValue = value;

        // 숫자만 허용하고, 소수점은 제거
        inputValue = inputValue.replace(/[^0-9]/g, "");

        // 맨 앞자리 0 제거 (단, '0'만 있는 경우는 허용)
        if (inputValue.length > 1 && inputValue.startsWith("0")) {
            inputValue = inputValue.replace(/^0+/, "");
        }else if (inputValue === "0") {
            // "0"인 경우 빈 문자열로 변경
            inputValue = "";
        }

        // 정수 부분에 천 단위 콤마 추가
        let integer = inputValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return integer;
    }



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
                                {sbj === 'itemcd' &&
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
                                                style={ !duplicateCheck ? 'disable-sm' : 'white-sm-mg-none'}
                                                onClick={onDuplicateCheck}
                                                disabled={!duplicateCheck}
                                            />
                                        </div>
                                    </>
                                }
                                { sbj === 'itemnm' &&
                                    <input
                                        name={sbj}
                                        value={formData[sbj]}
                                        onChange={onChangeForm}
                                        className={`flex w-full h-full px-2 outline-none`}/>
                                }
                                { sbj === 'originprice' &&
                                    <input
                                        name={sbj}
                                        value={formData[sbj]}
                                        onChange={onChangeForm}
                                        maxLength={9}
                                        className={`flex w-full h-full px-2 outline-none`}/>
                                }
                                { sbj === 'supplyprice' &&
                                    <input
                                        name={sbj}
                                        value={formData[sbj]}
                                        onChange={onChangeForm}
                                        maxLength={9}
                                        className={`flex w-full h-full px-2 outline-none`}/>
                                }
                                { sbj === 'stock' &&
                                    <input
                                        name={sbj}
                                        value={formData[sbj]}
                                        onChange={onChangeForm}
                                        maxLength={9}
                                        className={`flex w-full h-full px-2 outline-none`}/>
                                }
                                {sbj === 'unit' &&
                                    <select
                                        className="px-10 border border-erp-gray"
                                        onChange={onChangeForm}
                                        name = "unit"
                                        defaultValue={formData.unit ? formData.unit.id : 'none'}
                                    >
                                        {unit.map((unit) => (
                                            <option
                                                key={unit.id}
                                                value={unit.id}
                                            >
                                                {unit.name}
                                            </option>
                                        ))}
                                    </select>
                                }

                            </td>
                        </tr>
                    ))}
                    <tr></tr>
                    </tbody>
                </table>
               <div className={`flex justify-center my-5`}>
                   <Buttons style={'white-sm'} word={'cancel'} onClick={cancleClick}/>
                   <Buttons style={isSave.current ? 'disable-sm' : 'green-sm'} word={'save'} onClick={saveItem}
                            disabled={isSave.current}/>
               </div>
           </div>
        </div>
    )
}
export default ItemInsert;
