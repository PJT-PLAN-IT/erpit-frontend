/* eslint-disable react/prop-types */
// noinspection SpellCheckingInspection
import {unit} from "../../data/unit.js";
import Buttons from "../items/Buttons.jsx";
import useAxios from "../../hook/useAxios.js";
import {useRef, useState} from "react";

const itemSbj = {
    itemcd: '판매부번코드',
    itemnm: '품명',
    originprice: '원가',
    supplyprice: '공급가',
    unit: '단위',
    stock: '재고',
    useyn: '비활성화'
};
const numberData = {
    originprice: '',
    supplyprice: '',
    stock: '',
};

const ItemUpdate = ({updateModalOpen, setUpdateModalOpen, fetchItemList, updateData, setUpdateData}) => {
    const {error, fetchData} = useAxios();
    const isItennm = useRef(true);
    const isOriginprice = useRef(true);
    const isSupplyprice = useRef(true);
    const isStock = useRef(true);
    const isUnit = useRef(true);
    const isSave = useRef(true);

    if (!updateModalOpen) return false;

    //아이템 수정
    const updateFunction = async () => {
        if (updateData.originprice >= updateData.supplyprice) {
            alert("공급가가 원가보다 적습니다. 다시 설정해주세요");
            return;
        }

        try {
            const result = await fetchData({
                config: {method: "PUT", url: "/api/item"},
                body: updateData
            });
            if (result) {
                alert('등록되었습니다.');
                setUpdateModalOpen(false);
                fetchItemList(true);
                isItennm.current = true;
                isOriginprice.current = true;
                isSupplyprice.current = true;
                isStock.current = true;
                isUnit.current = true;
                isSave.current = true;
                numberData['originprice'] = '';
                numberData['supplyprice'] = '';
                numberData['stock'] = '';
            }
            if (error) {
                console.error("Error: ", error);
            }
        } catch (err) {
            console.error("Error: ", err);
        }
    }

    const onCheckDisabled = () => {
        if (confirm("비활성화처리 하시겠습니까? ")) {
            onDeactivateCheck();
        }
    }

    //비활성화체크
    const onDeactivateCheck = async () => {
        try {
            const result = await fetchData({
                config: {method: "PUT", url: "/api/item/deactivate"},
                body: {
                    itemid: updateData.itemid,
                    useyn: 'N'
                }
            });
            if (result) {
                fetchItemList(true);
                isItennm.current = true;
                isOriginprice.current = true;
                isSupplyprice.current = true;
                isStock.current = true;
                isUnit.current = true;
                isSave.current = true;
                setUpdateModalOpen(false);
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
        console.log('name', name);
        console.log('value', value);
        if (value === '') {
            if (name === 'itemnm') {
                isItennm.current = false;
            }
            if (name === 'originprice') {
                isOriginprice.current = false;
            }
            if (name === 'supplyprice') {
                isSupplyprice.current = false;
            }
            if (name === 'stock') {
                isStock.current = false;
            }
            if (name === 'unit') {
                isUnit.current = false;
            }
        } else {
            if (name === 'itemnm') {
                isItennm.current = true;
            }
            if (name === 'originprice') {
                isOriginprice.current = true;
                value = checkNumber(value);
            }
            if (name === 'supplyprice') {
                isSupplyprice.current = true;
                value = checkNumber(value);
            }
            if (name === 'stock') {
                isStock.current = true;
                value = checkNumber(value);
            }
            if (name === 'unit') {
                if (value === 'none') {
                    isUnit.current = false;
                } else {
                    isUnit.current = true;
                }
            }
        }
        checkSave();
        // 단위 선택 처리
        if (name==='unit') {
            setUpdateData(prevData => ({...prevData, ['unit']: value}));
        } else if(name === 'originprice' || name === 'supplyprice' || name === 'stock'){
            numberData[name] = value;
            value = deleteComma(value);
            setUpdateData({...updateData, [name]:value})
        }else {
            setUpdateData(prevData => ({...prevData, [name]: value}));
        }
        console.log("updateData",updateData);
    };

    const checkSave = () => {
        const saveCheck = (isItennm.current && isOriginprice.current && isSupplyprice.current && isStock.current && isUnit.current);
        console.log("saveCheck",saveCheck);
        if (!saveCheck) {
            console.log('여기');
            isSave.current = true;
        } else {
            console.log('저기');
            isSave.current = false
        }
    }


    const deleteComma = (value) => {
        const formValue = value.replace(/,/g, "");
        return formValue;
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


    const cancelClick = () => {
        setUpdateModalOpen(false);
        isItennm.current = true;
        isOriginprice.current = true;
        isSupplyprice.current = true;
        isStock.current = true;
        isUnit.current = true;
        isSave.current = true;
        numberData['originprice'] = '';
        numberData['supplyprice'] = '';
        numberData['stock'] = '';
    }

    return (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center`}>
            <div className={`bg-white rounded-lg p-6 py-3 w-[450px]`}>
                <h1 className={`flex items-center justify-center font-bold text-2xl my-10`}>판매부번 수정</h1>
                <table className={`w-full border-erp-gray border-x border-t`}>
                    <tbody>
                    {Object.entries(itemSbj).map(([sbj, data]) => (
                        <tr key={sbj} className={`flex border-erp-gray border-b`}>
                            <td className={`border-erp-gray border-r bg-erp-mint p-2 flex w-40 justify-center items-center`}> {data} </td>

                            <td className={`bg-white flex-grow flex items h-12`}>
                                {sbj === 'itemcd' &&
                                    <input disabled={true} name={sbj} value={updateData[sbj]}
                                           className={`flex-grow px-2 outline-none disabled:bg-white`}/>}

                                {sbj === 'itemnm' &&
                                    <input name={sbj} value={updateData[sbj]} onChange={onChangeForm}
                                           className={`flex w-full h-full px-2 outline-none bg-erp-soft-gray`}/>}

                                {sbj === 'originprice' &&
                                    <input name={sbj} value={numberData[sbj] === '' ? updateData[sbj].toLocaleString() : numberData[sbj]} onChange={onChangeForm}
                                           maxLength={9}
                                           className={`flex w-full h-full px-2 outline-none bg-erp-soft-gray`}/>}

                                {sbj === 'supplyprice' &&
                                    <input name={sbj} value={numberData[sbj] === '' ? updateData[sbj].toLocaleString() : numberData[sbj]} onChange={onChangeForm}
                                           maxLength={9}
                                           className={`flex w-full h-full px-2 outline-none bg-erp-soft-gray`}/>}

                                {sbj === 'unit'
                                    &&
                                    <select
                                        className="px-10 border border-erp-gray"
                                        onChange={onChangeForm}
                                        name="unit"
                                        defaultValue={updateData[sbj]}
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
                                {sbj === 'stock'
                                    &&
                                    <input name={sbj} value={numberData[sbj] === '' ? updateData[sbj].toLocaleString() : numberData[sbj]} onChange={onChangeForm}
                                           maxLength={9}
                                           className={`flex w-full h-full px-2 outline-none bg-erp-soft-gray`}/>}
                                {
                                    sbj === 'useyn' &&
                                    <div className={`flex items-center`}>
                                        <Buttons
                                            word={'disabled'}
                                            style={'green-lg'}
                                            onClick={onCheckDisabled}
                                        />
                                    </div>
                                }
                            </td>
                        </tr>
                    ))}
                    <tr></tr>
                    </tbody>
                </table>
                <div className={`flex justify-center my-5`}>
                    <Buttons style={'white-sm'} word={'cancel'} onClick={cancelClick}/>
                    <Buttons style={isSave.current ? 'disable-sm' : 'green-sm'} word={'save'} onClick={updateFunction}
                             disabled={isSave.current}/>
                </div>
            </div>
        </div>
    )
}
export default ItemUpdate;
