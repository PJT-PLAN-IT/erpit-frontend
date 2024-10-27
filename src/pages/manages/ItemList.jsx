import Input from "../../components/items/Input.jsx";
import Buttons from "../../components/items/Buttons.jsx";
import ItemTables from "../../components/tables/ItemTables.jsx";

function ItemList() {


    return (
        <>
            <div className={`flex justify-between mb-2`}>
                <div className={`flex`}>
                    <Input search={'buyer'}/>
                    <Buttons style={`green-sm`} word={`search`}/>
                </div>
                <Buttons style={`green-sm`} word={`add`} className={`flex`}/>
            </div>
            <ItemTables/>
        </>
    )
}

export default ItemList;