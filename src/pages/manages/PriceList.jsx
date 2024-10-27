import Input from "../../components/items/Input.jsx";
import Buttons from "../../components/items/Buttons.jsx";
import PriceTables from "../../components/tables/PriceTables.jsx";

function PriceList() {


    return (
        <>
            <div className={`flex justify-between mb-2`}>
                <div className={`flex`}>
                    <Input search={'buyer'}/>
                    <Buttons style={`green-sm`} word={`search`}/>
                </div>
                <Buttons style={`green-sm`} word={`add`} className={`flex`}/>
            </div>
            <PriceTables/>
        </>
    )
}

export default PriceList;