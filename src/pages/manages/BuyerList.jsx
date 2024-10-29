import BuyerTables from "../../components/tables/BuyerTables.jsx";
import Input from "../../components/items/Input.jsx";
import Buttons from "../../components/items/Buttons.jsx";
import {useState} from "react";
import BuyerInsert from "../../components/modal/BuyerInsert.jsx";

function BuyerList() {

    const [insertModalOpen, setInsertModalOpen] = useState(false);
    const openInsertModal= () => {
        setInsertModalOpen(prev => !prev);
    };

    const saveFunction = () => {
        openInsertModal();
        console.log("--------저장코드-------");
    }


    return (
        <>
            <div className={`flex justify-between mb-2`}>
                <div className={`flex`}>
                    <Input search={'buyer'}/>
                    <Buttons style={`green-sm`} word={`search`}/>
                </div>
                <Buttons style={`green-sm`} word={`add`} onClick={openInsertModal}/>
            </div>
            <BuyerTables/>
            <BuyerInsert isOpen={insertModalOpen} onClose={openInsertModal} onSave={saveFunction}/>

        </>
    )
}

export default BuyerList;