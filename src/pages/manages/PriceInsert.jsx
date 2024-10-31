import Buttons from "../../components/items/Buttons.jsx";
import BuyerSearch from "../../components/modal/BuyerSearch.jsx";
import {useState} from "react";
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
    supplyprice: '',
    surtax: '',
    salesprice: '',
    unit: '',
    useyn: '',
};
function PriceInsert() {
    // const {error, fetchData} = useAxios();
    const [searchBuyerModalOpen, setSearchBuyerModalOpen] = useState(false);
    const [searchItemModalOpen, setSearchItemModalOpen] = useState(false);
    const [updateData , setUpdateData] = useState(initUpdateData);
    console.log("updateDatagggggg",updateData);

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
                            <div className={`w-16`}>추가</div>
                        </td>
                        <td className={`${tdStyle}`} onClick={() => setSearchItemModalOpen(true)}>
                            <input
                                value={updateData.itemcd || ''}
                                readOnly={true}
                                className={`${inputStyle}`}></input>
                        </td>
                        <td className={`${tdStyle}`} onClick={() => setSearchItemModalOpen(true)}>
                            <input
                                value={updateData.itemnm || ''}
                                readOnly={true}
                                className={`${inputStyle}`}></input>
                        </td>
                        <td className={`${tdStyle}`} onClick={() => setSearchBuyerModalOpen(true)}>
                            <input
                                value={updateData.buyercd || ''}
                                readOnly={true}
                                className={`${inputStyle}`}></input>
                        </td>
                        <td className={`${tdStyle}`} onClick={() => setSearchBuyerModalOpen(true)}>
                            <input
                                value={updateData.buyernm || ''}
                                readOnly={true}
                                className={`${inputStyle}`}></input>
                        </td>
                        <td className={`${tdStyle}`}>
                            <input
                                value={updateData.buyersupplyprice || ''}
                                readOnly={true}
                                className={`${inputStyle}`}></input>
                        </td>
                        <td className={`${tdStyle}`}>
                            <input
                                value={updateData.surtax || ''}
                                readOnly={true}
                                className={`${inputStyle}`}></input>
                        </td>
                        <td className={`${tdStyle}`}>
                            <input
                                value={updateData.salesprice || ''}
                                readOnly={true}
                                className={`${inputStyle}`}></input>
                        </td>
                        <td className={`${tdStyle}`}>
                            <input
                                value={updateData.unit || ''}
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