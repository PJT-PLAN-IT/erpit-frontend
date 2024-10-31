import Input from "../../components/items/Input.jsx";
import Buttons from "../../components/items/Buttons.jsx";
import PriceTables from "../../components/tables/PriceTables.jsx";
import useAxios from "../../hook/useAxios.js";
import {useEffect, useState} from "react";

function PriceList() {
    const { error, fetchData } = useAxios();
    const [basicParam, setbasicParam] = useState({
        'item' : null,
        'buyer' : null
    });
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
                config: { method: "GET", url: "/api/item/price/list" },
                params: basicParam === null ? null : basicParam
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

    return (
        <div className={`flex flex-col p-10`}>
            <div className={`flex justify-between mb-2 mt-10`}>
                <div className={`flex`}>
                    <Input search={'buyer'}/>
                    <Buttons style={`green-sm`} word={`search`}/>
                </div>
                <Buttons style={`green-sm`} word={`add`}/>
            </div>
            <PriceTables result={result}/>
        </div>
    )
}

export default PriceList;