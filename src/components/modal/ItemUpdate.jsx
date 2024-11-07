/* eslint-disable react/prop-types */
// noinspection SpellCheckingInspection
import {unit} from "../../data/unit.js";
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
        if(updateData.originprice >= updateData.supplyprice){
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
                fetchItemList();
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
        const { name, value } = e.target;
        let numericValue = 0;
        const regex = /\D/;

        // if (name === 'originprice' || name === 'supplyprice' || name === 'stock') {
        //     if(regex.test(value)){
        //         console.log("qpffb",value);
        //         numericValue = value.replace(/[^0-9]/g, '');
        //     }else {
        //         console.log("dkr",value);
        //         numericValue = value;
        //     }
        //
        //     if (numericValue) {
        //         const formattedValue = new Intl.NumberFormat().format(numericValue);
        //
        //         setUpdateData(prevData => ({ ...prevData, [name]: formattedValue }));
        //     }
        //     else {
        //         setUpdateData(prevData => ({ ...prevData, [name]: '' }));
        //     }
        // }
        // 단위 선택 처리
        if (e.target.tagName === 'SELECT') {
            setUpdateData(prevData => ({ ...prevData, ['unit']: value }));
        }
        else {
            setUpdateData(prevData => ({ ...prevData, [name]: value }));
        }
    };

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
                                    <input disabled={true} name={sbj} value={updateData[sbj]} className={`flex-grow px-2 outline-none`}/>}

                                {sbj === 'itemnm' &&
                                    <input name={sbj} value={updateData[sbj]} onChange={onChangeForm} className={`flex w-full h-full px-2 outline-none`}/>}

                                {sbj === 'originprice' &&
                                    <input name={sbj} value={updateData[sbj].toLocaleString()} onChange={onChangeForm} className={`flex w-full h-full px-2 outline-none`}/>}

                                {sbj === 'supplyprice' &&
                                    <input name={sbj} value={updateData[sbj].toLocaleString()} onChange={onChangeForm} className={`flex w-full h-full px-2 outline-none`}/>}
                                {sbj === 'unit'
                                    &&
                                    // <select name={sbj} value={updateData[sbj]} onChange={onChangeForm} className={`flex w-full h-full px-2 outline-none`}/>
                                    <select
                                        className="px-10 border border-erp-gray"
                                        onChange={onChangeForm}
                                        defaultValue={updateData[sbj]}
                                    >
                                        {unit.map((unit) => (
                                            <option
                                                key={unit.id}
                                                name={unit.id}
                                                value={unit.id}
                                            >
                                                {unit.name}
                                            </option>
                                        ))}
                                    </select>

                                }
                                {sbj === 'stock'
                                    &&
                                    <input name={sbj} value={updateData[sbj].toLocaleString()} onChange={onChangeForm}
                                           className={`flex w-full h-full px-2 outline-none`}/>}
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
                    <Buttons style={'white-sm'} word={'cancel'} onClick={() => setUpdateModalOpen(false)}/>
                    <Buttons style={'green-sm'} word={'save'} onClick={updateFunction}/>
                </div>
            </div>
        </div>
    )
}
export default ItemUpdate;
