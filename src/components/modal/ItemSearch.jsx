/* eslint-disable react/prop-types */
import Buttons from "../items/Buttons.jsx";
import Input from "../items/Input.jsx";
import {useEffect, useState} from "react";
import useAxios from "../../hook/useAxios.js";
import ItemTables from "../tables/ItemTables.jsx";

const ItemSearch = ({searchItemModalOpen, setSearchItemModalOpen, setUpdateData}) => {
    const {error, fetchData} = useAxios();
    const [result, setResult] = useState([]);
    const [item, setItem] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            if (searchItemModalOpen) {
                await fetchitemList();
            }
        };
        fetchData();
    }, [searchItemModalOpen]);

    const fetchitemList = async () => {
        try {
            const resultData = await fetchData({
                config: {method: "GET", url: "/api/item/list"},
                params: {item}
            });
            if (resultData) {
                setResult(resultData.data);
                setItem("");
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    const reset = () => {
        setItem("");
        fetchitemList();
    };

    const onSearchParam = (e) => {
        setItem(e);
    };

    const onHandleKeyDown = (e) => {
        if(e.key === 'Enter'){
            fetchitemList();
        }
    }
    const searchItem = () => {
        fetchitemList();
    };

    if (!searchItemModalOpen) return null;

    return (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center`}>
            <div className={`bg-white rounded-lg p-6 py-3 w-[1250px]`}>
                <h1 className={`font-semibold flex justify-center text-3xl py-8`}>판매부번 검색</h1>
                <div className={`flex`}>
                    <Input search={'item'} searchData={onSearchParam} onKeyDown={onHandleKeyDown} data={item}/>
                    <Buttons style={`green-sm`} word={`search`} onClick={searchItem}/>
                    <Buttons style={`white-sm`} word={`reset`} onClick={reset}/>
                </div>
                <ItemTables data={result} setUpdateData={setUpdateData}
                            setSearchItemModalOpen={setSearchItemModalOpen}/>
                <div className={`flex justify-center`}>
                    <Buttons style={`white-sm`} word={`cancel`} onClick={() => setSearchItemModalOpen(false)}/>
                </div>
            </div>
        </div>
    );
};

export default ItemSearch;
