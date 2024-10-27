import BuyerTables from "../../components/tables/BuyerTables.jsx";
import Input from "../../components/items/Input.jsx";
import Buttons from "../../components/items/Buttons.jsx";

function BuyerList() {


    return (
        <>
            <div className={`flex justify-between mb-2`}>
                <div className={`flex`}>
                    <Input search={'buyer'}/>
                    <Buttons style={`green-sm`} word={`search`}/>
                </div>
                <Buttons style={`green-sm`} word={`add`} className={`flex`}/>
            </div>
            <div>
                <BuyerTables/>
            </div>
        </>
    )
}

export default BuyerList;