import Input from "../../components/items/Input.jsx";
import Buttons from "../../components/items/Buttons.jsx";
import UserTables from "../../components/tables/UserTables.jsx";
import useAxios from "../../hook/useAxios.js";
import {useEffect, useState} from "react";

function UserList() {
    const { error, fetchData } = useAxios();
    const [basicparam, setbasicparam] = useState(null);
    const [result, setResult] = useState([]);
    // const [insertModalOpen, setInsertModalOpen] = useState(false);
    // const openInsertModal= () => {
    //     setInsertModalOpen(prev => !prev);
    // };
    //
    // const saveFunction = () => {
    //     openInsertModal();
    //     console.log("--------저장코드-------");
    // }

    useEffect(() => {
        getData();
    }, []);


    const getData = async () => {
        try {
            const resultData = await fetchData({
                config: { method: "GET", url: "/api/user/list" },
                params: basicparam === null ? null : basicparam
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
        <>
            <div className={`flex justify-between mb-2`}>
                <div className={`flex`}>
                    <Input search={'buyer'}/>
                    <Buttons style={`green-sm`} word={`search`}/>
                </div>
                <Buttons style={`green-sm`} word={`add`}/>
            </div>
            <UserTables result={result}/>
        </>
    )
}

export default UserList;