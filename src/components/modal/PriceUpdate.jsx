/* eslint-disable react/prop-types */
// noinspection SpellCheckingInspection

import Buttons from "../items/Buttons.jsx";
import useAxios from "../../hook/useAxios.js";
import {useState} from "react";

const priceSbj = {
    itemcd: '판매부번코드',
    itemnm: '품명',
    buyercd:'바이어코드',
    buyernm:'바이어명',
    buyersupplyprice: '공급가',
    surtax: '부가세',
    salesprice: '판매가격',
    unit: '단위',
    useyn: '비활성화'
};

const PriceUpdate = ({updateModalOpen, setUpdateModalOpen, fetchPriceList, updateData}) => {
    const {error, fetchData} = useAxios();
    const [deactivateCheck, setDeactivateCheck] = useState(true);

    if (!updateModalOpen) return false;

    const onCheckDisabled = () =>{
        if(confirm("비활성화처리 하시겠습니까? ")) {
            onDeactivateCheck();
        }
    }

    //비활성화체크
    const onDeactivateCheck = async () => {
        try {
            const result = await fetchData({
                config: {method: "PUT", url: "/api/item/price/deactivate"},
                body: {
                    itempriceid: updateData.itempriceid,
                    useyn: 'N'
                }
            });
            if (result) {
                fetchPriceList();
                setUpdateModalOpen(false);
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
                <h1 className={`flex items-center justify-center font-bold text-2xl my-10`}>바이어별 판매가격</h1>
                <table className={`w-full border-erp-gray border-x border-t`}>
                    <tbody>
                    {Object.entries(priceSbj).map(([sbj, data]) => (
                        <tr key={sbj} className={`flex border-erp-gray border-b`}>
                            <td className={`border-erp-gray border-r bg-erp-mint p-2 flex w-32 justify-center items-center`}> {data} </td>
                            <td className={`bg-white flex-grow flex items h-12`}>
                                {sbj === 'useyn' ?
                                    <>
                                        <input
                                            disabled={true}
                                            name={sbj}
                                            value={updateData[sbj]}
                                            className={`flex-grow px-2 outline-none`}/>
                                        <div className={`flex items-center`}>
                                            <Buttons
                                                word={'disabled'}
                                                style={'green-lg'}
                                                onClick={onCheckDisabled}
                                                disabled={!deactivateCheck}
                                            />
                                        </div>
                                    </>
                                    :
                                    <input
                                        name={sbj}
                                        value={updateData[sbj]}
                                        disabled={true}
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
                </div>
            </div>
        </div>
    )
}
export default PriceUpdate;
