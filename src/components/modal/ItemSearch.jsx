/* eslint-disable react/prop-types */
import Buttons from "../items/Buttons.jsx";
import Input from "../items/Input.jsx";
import { useEffect, useState } from "react";
import useAxios from "../../hook/useAxios.js";
import itemTables from "../tables/itemTables.jsx";
import ItemTables from "../tables/ItemTables.jsx";
const ItemSearch = ({ searchItemModalOpen, setSearchItemModalOpen, setUpdateData}) => {
    const { error, fetchData } = useAxios();
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
                config: { method: "GET", url: "/api/item/list" },
                params: { item }
            });
            if (resultData) {
                setResult(resultData.data);
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

    const searchItem = () => {
        fetchitemList();
    };

    if (!searchItemModalOpen) return null;

    return (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center`}>
            <div className={`bg-white rounded-lg p-6 py-3 w-[900px]`}>
                <h1>판매부번 검색</h1>
                <div className={`flex`}>
                    <Input search={'item'} searchData={onSearchParam} data={item} />
                    <Buttons style={`green-sm`} word={`search`} onClick={searchItem} />
                    <Buttons style={`white-sm`} word={`reset`} onClick={reset} />
                </div>
                <ItemTables data={result} setUpdateData={setUpdateData} setSearchItemModalOpen={setSearchItemModalOpen} />
                <Buttons style={`white-sm`} word={`cancel`} onClick={() => setSearchItemModalOpen(false)} />
            </div>
        </div>
    );
};

export default ItemSearch;
