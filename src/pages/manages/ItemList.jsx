import Input from "../../components/items/Input.jsx";
import Buttons from "../../components/items/Buttons.jsx";
import ItemTables from "../../components/tables/ItemTables.jsx";
import useAxios from "../../hook/useAxios.js";
import {useEffect, useState} from "react";
import ItemUpdate from "../../components/modal/ItemUpdate.jsx";
import ItemInsert from "../../components/modal/ItemInsert.jsx";
import {useAuth} from "../../context/AuthContext.jsx";


const initUpdateData = {
    itemid: '',
    itemcd: '',
    itemnm: '',
    originprice: '',
    supplyprice: '',
    unit: '',
    stock: '',
    adddate: ''
};


function ItemList() {
    const {error, fetchData} = useAxios();
    const [result, setResult] = useState([]);
    const [insertModalOpen, setInsertModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [updateData, setUpdateData] = useState(initUpdateData);
    const [item, setItem] = useState("");
    const { user } = useAuth();

    useEffect(() => {
        fetchItemList();
    }, []);
    const onSearchParam = (e) => {
        setItem(e);
    }

    const reset = () => {
        setItem("");
        fetchItemList(true);
    }

    const searchItem = () => {
        fetchItemList();
    }
    const onHandleKeyDown = (e) => {
        if(e.key === 'Enter'){
            fetchItemList();
        }
    }

    const fetchItemList = async (isReset) => {
        try {
            const resultData = await fetchData({
                config: {method: "GET", url: "/api/item/list"},
                params: {item: isReset ? "" : item}
            });
            if (resultData) {
                setResult(resultData.data);
            } else if (error) {
                console.error("Error: ", error);
            }
        } catch (err) {
            console.error("Error: ", err);
        }
    };

    return (
        <div className={`flex flex-col px-10`}>
            <div className={`flex justify-between mb-2 mt-10`}>
                <div className={`flex`}>
                    <Input search={'item'} searchData={onSearchParam} onKeyDown={onHandleKeyDown} data={item}/>
                    <Buttons style={`green-sm`} word={`search`} onClick={searchItem}/>
                    <Buttons style={`white-sm`} word={`reset`} onClick={reset}/>
                </div>
                    <Buttons style={`green-sm`} word={`add`} onClick={() => setInsertModalOpen(true)}/>
            </div>
            <ItemTables data={result} setUpdateModalOpen={setUpdateModalOpen} setUpdateData={setUpdateData}/>
            <ItemInsert insertModalOpen={insertModalOpen} setInsertModalOpen={setInsertModalOpen}
                        fetchItemList={fetchItemList}/>
            <ItemUpdate updateModalOpen={updateModalOpen} setUpdateModalOpen={setUpdateModalOpen}
                        fetchItemList={fetchItemList} updateData={updateData} setUpdateData={setUpdateData}/>
        </div>
    )
}

export default ItemList;