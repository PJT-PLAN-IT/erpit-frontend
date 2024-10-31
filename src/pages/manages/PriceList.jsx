import Input from "../../components/items/Input.jsx";
import Buttons from "../../components/items/Buttons.jsx";
import PriceTables from "../../components/tables/PriceTables.jsx";
import useAxios from "../../hook/useAxios.js";
import {useEffect, useState} from "react";
import PriceUpdate from "../../components/modal/PriceUpdate.jsx";
import {useNavigate} from "react-router-dom";

const initUpdateData = {
    itempriceid: '',
    itemcd: '',
    itemnm: '',
    buyercd: '',
    buyernm: '',
    buyersupplyprice: '',
    surtax: '',
    salesprice: '',
    unit: '',
    useyn: '',
    adddate: ''
};

function PriceList() {
    const {error, fetchData} = useAxios();
    const [result, setResult] = useState([]);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [updateData, setUpdateData] = useState(initUpdateData);
    const [buyer, setBuyer] = useState("");
    const [item, setItem] = useState("");

    const onSearchBuyer = (e) => {
        setBuyer(e);
    }
    const onSearchItem = (e) => {
        setItem(e);
    }


    const reset = () => {
        setBuyer("");
        setItem("");
        fetchPriceList(true);
    }

    const searchPrice = () => {
        fetchPriceList();
    }


    useEffect(() => {
        fetchPriceList();
    }, []);


    const fetchPriceList = async (isReset) => {
        try {
            const resultData = await fetchData({
                config: {method: "GET", url: "/api/item/price/list"},
                params: {buyer: isReset ? "" : buyer, item: isReset ? "" : item}
            });
            if (resultData) {
                console.log(resultData)
                setResult(resultData.data);
            } else if (error) {
                console.error("Error: ", error);
            }
        } catch (err) {
            console.error("Error: ", err);
        }
    };

    const navigator = useNavigate();
    const goInsert = () => {
        navigator('/price/add');
    }

    return (
        <div className={`flex flex-col p-10`}>
            <div className={`flex justify-between mb-2 mt-10`}>
                <div className={`flex`}>
                    <Input search={'item'} searchData={onSearchItem} data={item}/>
                    <Input search={'buyer'} searchData={onSearchBuyer} data={buyer}/>
                    <Buttons style={`green-sm`} word={`search`} onClick={searchPrice}/>
                    <Buttons style={`white-sm`} word={`reset`} onClick={reset}/>
                </div>
                <Buttons style={`green-sm`} word={`add`} onClick={goInsert}/>
            </div>
            <PriceTables data={result} setUpdateModalOpen={setUpdateModalOpen} setUpdateData={setUpdateData}/>
            <PriceUpdate updateModalOpen={updateModalOpen} setUpdateModalOpen={setUpdateModalOpen}
                         fetchPriceList={fetchPriceList} updateData={updateData} setUpdateData={setUpdateData}/>
        </div>
    )
}

export default PriceList;