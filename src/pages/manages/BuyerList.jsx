import BuyerTables from "../../components/tables/BuyerTables.jsx";
import Input from "../../components/items/Input.jsx";
import Buttons from "../../components/items/Buttons.jsx";
import {useEffect, useState} from "react";
import BuyerInsert from "../../components/modal/BuyerInsert.jsx";
import useAxios from "../../hook/useAxios.js";

function BuyerList() {
    const { error, fetchData } = useAxios();
    const [basicParam, setBasicParam] = useState();
    // {buyer : "1"}
    const onSearchParam = (e) => {

    }

    const [result, setResult] = useState([]);
    const [insertModalOpen, setInsertModalOpen] = useState(false);
    const openInsertModal= () => {
        setInsertModalOpen(prev => !prev);
    };

    const saveFunction = () => {
        openInsertModal();
        console.log("--------저장코드-------");
    }

    useEffect(() => {
        getData();
    }, []);



    const getData = async () => {
        try {
            const resultData = await fetchData({
                config: { method: "GET", url: "/api/buyer/list" },
                params: basicParam === null ? null : basicParam
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
        <div className={`flex flex-col p-10`}>
            <div className={`flex justify-between mb-2 mt-10`}>
                <div className={`flex`}>
                    <Input search={'buyer'} searchData={onSearchParam}/>
                    <Buttons style={`green-sm`} word={`search`}/>
                </div>
                <Buttons style={`green-sm`} word={`add`} onClick={openInsertModal}/>
            </div>
            <BuyerTables data={result}/>
            <BuyerInsert isOpen={insertModalOpen} onClose={openInsertModal} onSave={saveFunction}/>
        </div>
    )
}

export default BuyerList;