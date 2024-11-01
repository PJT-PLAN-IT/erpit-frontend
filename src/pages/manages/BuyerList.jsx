// noinspection SpellCheckingInspection

import BuyerTables from "../../components/tables/BuyerTables.jsx";
import Input from "../../components/items/Input.jsx";
import Buttons from "../../components/items/Buttons.jsx";
import {useEffect, useState} from "react";
import BuyerInsert from "../../components/modal/BuyerInsert.jsx";
import useAxios from "../../hook/useAxios.js";
import BuyerUpdate from "../../components/modal/BuyerUpdate.jsx";
import {useAuth} from "../../context/AuthContext.jsx";

const initUpdateData = {
    buyerid: '',
    buyercd: '',
    buyernm: '',
    tel: '',
    email: '',
    zipcode: '',
    address: '',
    addressdetail: ''
};

function BuyerList() {
    const {error, fetchData} = useAxios();
    const [result, setResult] = useState([]);
    const [insertModalOpen, setInsertModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [updateData, setUpdateData] = useState(initUpdateData);
    const [buyer, setBuyer] = useState("");
    const { user } = useAuth();

    const onSearchParam = (e) => {
        setBuyer(e);
    }

    const reset = () => {
        setBuyer("");
        fetchBuyerList(true);
    }

    const searchBuyer = () => {
        fetchBuyerList();
    }

    useEffect(() => {
        fetchBuyerList();
    }, []);

    const fetchBuyerList = async (isReset) => {
        try {
            const resultData = await fetchData({
                config: {method: "GET", url: "/api/buyer/list"},
                params: {buyer: isReset ? "" : buyer}
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
                    <Input search={'buyer'} searchData={onSearchParam} data={buyer}/>
                    <Buttons style={`green-sm`} word={`search`} onClick={searchBuyer}/>
                    <Buttons style={`white-sm`} word={`reset`} onClick={reset}/>
                </div>
                {user.role ==='ROLE_ADMIN'&& (
                    <Buttons style={`green-sm`} word={`add`} onClick={() => setInsertModalOpen(true)}/>
                )}
            </div>
            <BuyerTables data={result} setUpdateModalOpen={setUpdateModalOpen} setUpdateData={setUpdateData}/>
            <BuyerInsert insertModalOpen={insertModalOpen} setInsertModalOpen={setInsertModalOpen} fetchBuyerList={fetchBuyerList}/>
            <BuyerUpdate updateModalOpen={updateModalOpen} setUpdateModalOpen={setUpdateModalOpen} fetchBuyerList={fetchBuyerList} updateData={updateData} setUpdateData={setUpdateData}/>
        </div>
    )
}

export default BuyerList;