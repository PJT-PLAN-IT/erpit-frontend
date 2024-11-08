/* eslint-disable react/prop-types */
import Buttons from "../items/Buttons.jsx";
import Input from "../items/Input.jsx";
import {useEffect, useState} from "react";
import useAxios from "../../hook/useAxios.js";
import BuyerTables from "../tables/BuyerTables.jsx";

const BuyerSearch = ({searchBuyerModalOpen, setSearchBuyerModalOpen, setUpdateData}) => {
    const {error, fetchData} = useAxios();
    const [result, setResult] = useState([]);
    const [buyer, setBuyer] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            if (searchBuyerModalOpen) {
                await fetchBuyerList();
            }
        };
        fetchData();
    }, [searchBuyerModalOpen]);

    const fetchBuyerList = async () => {
        try {
            const resultData = await fetchData({
                config: {method: "GET", url: "/api/buyer/list"},
                params: {buyer}
            });
            if (resultData) {
                setResult(resultData.data);
                setBuyer("");
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    const reset = () => {
        setBuyer("");
        fetchBuyerList();
    };
    const onSearchParam = (e) => {
        setBuyer(e);
    };

    const searchBuyer = () => {
        fetchBuyerList();
    };

    const onHandleKeyDown = (e) => {
        if(e.key === 'Enter'){
            fetchBuyerList();
        }
    }

    if (!searchBuyerModalOpen) return null;

    return (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center`}>
            <div className={`bg-white rounded-lg p-6 py-3 w-[1250px]`}>
                <h1 className={`font-semibold flex justify-center text-3xl py-8`}>바이어 검색</h1>
                <div className={`flex`}>
                    <Input search={'buyer'} searchData={onSearchParam} onKeyDown={onHandleKeyDown} data={buyer}/>
                    <Buttons style={`green-sm`} word={`search`} onClick={searchBuyer}/>
                    <Buttons style={`white-sm`} word={`reset`} onClick={reset}/>
                </div>
                <BuyerTables data={result} setUpdateData={setUpdateData}
                             setSearchBuyerModalOpen={setSearchBuyerModalOpen}/>
                <div className={`flex justify-center`}>
                    <Buttons style={`white-sm`} word={`cancel`} onClick={() => setSearchBuyerModalOpen(false)}/>
                </div>
            </div>
        </div>
    );
};

export default BuyerSearch;
