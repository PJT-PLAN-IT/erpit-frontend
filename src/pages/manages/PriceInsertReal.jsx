import Buttons from "../../components/items/Buttons.jsx";
import BuyerSearch from "../../components/modal/BuyerSearch.jsx";
import {useEffect, useState} from "react";
import ItemSearch from "../../components/modal/ItemSearch.jsx";

const price = ['순번', '판매부번코드', '품명', '바이어코드', '바이어명', '공급가', '부가세', '판매가격', '단위'];
const headStyle = 'border border-erp-gray text-center py-2 font-semibold';
const tdStyle = 'border border-erp-gray text-center text-sm py-3';
const trStyle = 'bg-white';
const inputStyle = 'text-erp-gray mx-3 w-32 h-8 border border-erp-gray pl-2';
const initUpdateData = {
    itemcd: '',
    itemnm: '',
    buyercd: '',
    buyernm: '',
    supplyprice: 0,
    surtax: 0,
    salesprice: 0,
    unit: '',
};
function PriceInsert() {
    // const {error, fetchData} = useAxios();
    const [searchBuyerModalOpen, setSearchBuyerModalOpen] = useState(false);
    const [searchItemModalOpen, setSearchItemModalOpen] = useState(false);
    const [updateData , setUpdateData] = useState(initUpdateData);
    const [insertData, setInsertData] = useState({});

    useEffect(() => {

        setInsertData((prevData) =>({
            itemcd: updateData.itemcd || prevData.itemcd,
            itemnm: updateData.itemnm || prevData.itemnm,
            buyercd: updateData.buyercd || prevData.buyercd,
            buyernm: updateData.buyernm || prevData.buyernm,
            supplyprice: updateData.supplyprice || prevData.supplyprice,
            surtax: (updateData.supplyprice)*0.1 || prevData.surtax,
            salesprice: ((updateData.supplyprice) + (updateData.supplyprice)*0.1) || prevData.salesprice,
            unit: updateData.unit || prevData.unit,
        }));
    }, [updateData]);

    const handleSupplyPriceChange = (e) => {
        const value = parseFloat(e.target.value) || 0; // Convert to number
        setInsertData((prevData) => ({
            ...prevData,
            supplyprice: value,
            surtax: value * 0.1,
            salesprice: value + (value * 0.1),
        }));
    };

    const onPlusData = () => {

    };


    return (
        <div className={`flex flex-col p-10`}>
            <div className={`flex justify-between mb-2 mt-10`}>
                <Buttons style={`green-sm`} word={`add`}/>
            </div>
            <div className={`h-[620px] overflow-y-auto mt-20`}>
                <table className={`w-full`}>
                    <thead className={`sticky top-0`}>
                    <tr className={`items-center bg-erp-mint`}>
                        {price.map((sbj, index) => (
                            <td key={index} className={`${headStyle}`}>{sbj}</td>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    <tr className={`${trStyle}`}>
                        <td className={`border border-erp-gray text-center text-sm`}>
                            <button onClick={onPlusData}>+</button>
                        </td>
                        <td className={`${tdStyle}`} onClick={() => setSearchItemModalOpen(true)}>
                            <input
                                value={insertData.itemcd || ''}
                                readOnly={true}
                                className={`${inputStyle}`}></input>
                        </td>
                        <td className={`${tdStyle}`} onClick={() => setSearchItemModalOpen(true)}>
                            <input
                                value={insertData.itemnm || ''}
                                readOnly={true}
                                className={`${inputStyle}`}></input>
                        </td>
                        <td className={`${tdStyle}`} onClick={() => setSearchBuyerModalOpen(true)}>
                            <input
                                value={insertData.buyercd || ''}
                                readOnly={true}
                                className={`${inputStyle}`}></input>
                        </td>
                        <td className={`${tdStyle}`} onClick={() => setSearchBuyerModalOpen(true)}>
                            <input
                                value={insertData.buyernm || ''}
                                readOnly={true}
                                className={`${inputStyle}`}></input>
                        </td>
                        <td className={`${tdStyle}`}>
                            <input
                                value={insertData.supplyprice || ''}
                                onChange={handleSupplyPriceChange}
                                className={`${inputStyle}`}></input>
                        </td>
                        <td className={`${tdStyle}`}>
                            <input
                                value={insertData.surtax || ''}
                                readOnly={true}
                                className={`${inputStyle}`}></input>
                        </td>
                        <td className={`${tdStyle}`}>
                            <input
                                value={insertData.salesprice || ''}
                                readOnly={true}
                                className={`${inputStyle}`}></input>
                        </td>
                        <td className={`${tdStyle}`}>
                            <input
                                value={insertData.unit || ''}
                                readOnly={true}
                                className={`${inputStyle}`}></input>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

            {/*    바이어모달    */}
            <BuyerSearch searchBuyerModalOpen={searchBuyerModalOpen} setSearchBuyerModalOpen={setSearchBuyerModalOpen} setUpdateData={setUpdateData}/>
            {/*    판매부번모달    */}
            <ItemSearch searchItemModalOpen={searchItemModalOpen} setSearchItemModalOpen={setSearchItemModalOpen} setUpdateData={setUpdateData}/>


        </div>
    )
}

export default PriceInsert;