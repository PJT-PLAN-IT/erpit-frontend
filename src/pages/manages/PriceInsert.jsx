import Buttons from "../../components/items/Buttons.jsx";
import BuyerSearch from "../../components/modal/BuyerSearch.jsx";
import {useEffect, useRef, useState} from "react";
import ItemSearch from "../../components/modal/ItemSearch.jsx";
import useAxios from "../../hook/useAxios.js";
import {useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

const price = ['NO', '바이어코드', '바이어명', '판매부번코드', '품명', '공급가', '부가세', '판매가격', '단위'];
const headStyle = 'border border-erp-gray text-center py-2 font-semibold';
const tdStyle = 'border border-erp-gray text-center h-10 ';
const trStyle = 'bg-white';
const inputStyle = 'text-center border border-erp-gray h-full w-full';
const noinputStyle = 'text-center h-full w-full';
const initUpdateData = {
    itemcd: '',
    itemnm: '',
    buyercd: '',
    buyernm: '',
    buyersupplyprice: 0,
    surtax: 0,
    salesprice: 0,
    unit: '',
};

function PriceInsert() {
    const {error, fetchData} = useAxios();
    const circlePlus = <FontAwesomeIcon className={`size-6`} icon={faCirclePlus}/>
    const [searchBuyerModalOpen, setSearchBuyerModalOpen] = useState(false);
    const [searchItemModalOpen, setSearchItemModalOpen] = useState(false);
    const [updateData, setUpdateData] = useState(initUpdateData);
    const [insertData, setInsertData] = useState(initUpdateData);
    const [confirmData, setConfirmData] = useState([]);
    const isBuyer = useRef(true);
    const isItem = useRef(true);
    const isSave = useRef(true);
    const [isHover,setIsHover] = useState(false);

    useEffect(() => {
        setInsertData((prevData) => ({
            itemcd: updateData.itemcd || prevData.itemcd,
            itemnm: updateData.itemnm || prevData.itemnm,
            buyercd: updateData.buyercd || prevData.buyercd,
            buyernm: updateData.buyernm || prevData.buyernm,
            buyersupplyprice: updateData.supplyprice || prevData.buyersupplyprice,
            surtax: (updateData.supplyprice) * 0.1 || prevData.surtax,
            salesprice: ((updateData.supplyprice) + (updateData.supplyprice) * 0.1) || prevData.salesprice,
            unit: updateData.unit || prevData.unit,
        }));
    }, [updateData]);

    useEffect(() => {
        if(insertData.buyercd !== ''){
            isBuyer.current = false;
        }
        if(insertData.itemcd !== ''){
            isItem.current = false;
        }
    }, [insertData]);


    const handleSupplyPriceChange = (e) => {
        const value = parseFloat(e.target.value) || 0; // Convert to number
        const buyersupplyprice = Math.trunc(value); // 소수점 이하 제거
        const surtax = Math.trunc(value * 0.1);     // 소수점 이하 제거
        const salesprice = Math.trunc(value + (value * 0.1)); // 소수점 이하 제거
        setInsertData((prevData) => ({
            ...prevData,
            buyersupplyprice: buyersupplyprice,
            surtax: surtax,
            salesprice: salesprice,
        }));
    };

    const onPlusData = () => {
        // 중복 체크
        const isDuplicate = confirmData.some((data) => {
            return insertData.itemcd === data.itemcd && insertData.buyercd === data.buyercd;
        });

        if (isDuplicate) {
            alert("중복되었습니다. 사용 불가능합니다.");
            setInsertData(initUpdateData); // 입력 필드 초기화
            isBuyer.current = true;
            isItem.current = true;
            return; // 중복이 있을 경우 함수 종료
        }

        // 중복이 없을 경우 계속 진행
        const newData = {
            id: Date.now(),
            ...insertData
        };
        isSave.current = false;
        setConfirmData((prevData) => [...prevData, newData]);
        setInsertData(initUpdateData); // 입력 필드 초기화
        isBuyer.current = true;
        isItem.current = true;
    };

    const navigator = useNavigate();
    const onClickSave = async () => {

        if(isSave.current === true){
            alert("바이어별 가격을 추가해주셔야 등록이 가능합니다! \n추가 버튼을 눌려주세요");
            return;
        }

        try {
            const resultData = await fetchData({
                config: { method: "POST", url: "/api/item/price" },
                body: confirmData
            });
            if (resultData) {
                alert("등록완료");
                isBuyer.current = true;
                isItem.current = true;
                navigator('/price');
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    }


    return (
        <div className={`flex flex-col px-10`}>
            <div className={`flex justify-between items-center mt-10 bg-white rounded border border-erp-soft-gray shadow-lg pt-2`}>
                <div className={`flex justify-start`}>
                    <h1 className={`ml-5 text-2xl`}> 바이어별 아이템 등록 </h1>
                </div>
                <div className={`flex justify-end items-center`}>
                {/*</!*Buttons word={'buyer'} style={'white-lg-mg-none'} onClick={() => setSearchBuyerModalOpen(true)}/>*/}
                {/*<Buttons word={'item'} style={'white-lg-mg-none'} onClick={() => setSearchItemModalOpen(true)}/>*!/*/}
                <Buttons style={isSave.current ? `disable-sm` : `green-sm`} word={`save`}
                         onClick={onClickSave}/>
                </div>
            </div>
            <div className={`h-[730px] overflow-y-auto bg-white border border-erp-soft-gray`}>
                <table className={`w-full`}>
                    <thead className={`sticky top-0`}>
                    <tr className={`items-center bg-erp-mint`}>
                        {price.map((sbj, index) => (
                            <td key={index} className={`${headStyle} item`}>{sbj}</td>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    <tr className={`${trStyle}`}>
                        <td className={`border border-erp-gray text-center`}>
                        </td>
                        <td className={`${tdStyle}`}>
                            <input
                                value={insertData.buyercd}
                                placeholder={'정보를 검색해서 입력해주세요'}
                                disabled={false}
                                onClick={() => setSearchBuyerModalOpen(true)}
                                className={`${noinputStyle}`}></input>
                        </td>
                        <td className={`${tdStyle}`}>
                            <input
                                value={insertData.buyernm}
                                placeholder={'정보를 검색해서 입력해주세요'}
                                disabled={false}
                                onClick={() => setSearchBuyerModalOpen(true)}
                                className={`${noinputStyle}`}></input>
                        </td>
                        <td className={`${tdStyle}`}>
                            <input
                                value={insertData.itemcd}
                                disabled={false}
                                onClick={() => setSearchItemModalOpen(true)}
                                placeholder={'정보를 검색해서 입력해주세요'}
                                className={`${noinputStyle}`}></input>
                        </td>
                        <td className={`${tdStyle}`}>
                            <input
                                value={insertData.itemnm}
                                disabled={false}
                                onClick={() => setSearchItemModalOpen(true)}
                                placeholder={'정보를 검색해서 입력해주세요'}
                                className={`${noinputStyle}`}></input>
                        </td>
                        <td className={`${tdStyle}`}>
                            <input
                                value={insertData.buyersupplyprice.toLocaleString()}
                                maxLength={10}
                                onChange={handleSupplyPriceChange}
                                className={`${inputStyle}`}></input>
                        </td>
                        <td className={`${tdStyle}`}>
                            <input
                                value={insertData.surtax.toLocaleString()}
                                disabled={true}
                                className={`${noinputStyle}`}></input>
                        </td>
                        <td className={`${tdStyle}`}>
                            <input
                                value={insertData.salesprice.toLocaleString()}
                                disabled={true}
                                className={`${noinputStyle}`}></input>
                        </td>
                        <td className={`${tdStyle}`}>
                            <input
                                value={insertData.unit}
                                disabled={true}
                                className={`${noinputStyle}`}></input>
                        </td>
                    </tr>
                    <tr>
                        <th colSpan={9} className={`bg-erp-soft-gray border border-erp-gray h-12`}>
                            <button className={`h-full w-full`} onClick={onPlusData}
                                    disabled={isBuyer.current && isItem.current}>
                                {circlePlus}
                            </button>
                        </th>
                    </tr>
                    {confirmData.map((data, index) => (
                        <tr className={`${trStyle}`} key={index}>
                            <td className={`${tdStyle}`}>{index + 1}</td>
                            <td className={`${tdStyle}`}>{data.buyercd}</td>
                            <td className={`${tdStyle}`}>{data.buyernm}</td>
                            <td className={`${tdStyle}`}>{data.itemcd}</td>
                            <td className={`${tdStyle}`}>{data.itemnm}</td>
                            <td className={`${tdStyle}`}>{data.buyersupplyprice.toLocaleString()}</td>
                            <td className={`${tdStyle}`}>{data.surtax.toLocaleString()}</td>
                            <td className={`${tdStyle}`}>{data.salesprice.toLocaleString()}</td>
                            <td className={`${tdStyle}`}>{data.unit.toLocaleString()}</td>
                        </tr>
                    ))}


                    </tbody>
                </table>
            </div>

            {/*    바이어모달    */}
            <BuyerSearch searchBuyerModalOpen={searchBuyerModalOpen} setSearchBuyerModalOpen={setSearchBuyerModalOpen}
                         setUpdateData={setUpdateData}/>
            {/*    판매부번모달    */}
            <ItemSearch searchItemModalOpen={searchItemModalOpen} setSearchItemModalOpen={setSearchItemModalOpen}
                        setUpdateData={setUpdateData}/>
        </div>
    )
}

export default PriceInsert;