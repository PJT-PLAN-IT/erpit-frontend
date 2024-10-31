import Input from "../../components/items/Input.jsx";
import Buttons from "../../components/items/Buttons.jsx";
import UserTables from "../../components/tables/UserTables.jsx";
import useAxios from "../../hook/useAxios.js";
import {useEffect, useState} from "react";
import UserInsert from "../../components/modal/UserInsert.jsx";
import UserUpdate from "../../components/modal/UserUpdate.jsx";

const initUpdateData = {
    userid: '',
    usercd: '',
    usernm: '',
    birthdate: '',
    auth: '',
    joindate: '',
    adddate: ''
};
function UserList() {
    const { error, fetchData } = useAxios();
    const [user, setUser] = useState("");
    const [result, setResult] = useState([]);
    const [insertModalOpen, setInsertModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [updateData, setUpdateData] = useState(initUpdateData);

    useEffect(() => {
        fetchUserList();
    }, []);

    const onSearchParam = (e) => {
        setUser(e);
    }

    const reset = () => {
        setUser("");
        fetchUserList(true);
    }

    const searchUser = () => {
        fetchUserList();
    }


    const fetchUserList = async (isReset) => {
        try {
            const resultData = await fetchData({
                config: { method: "GET", url: "/api/user/list" },
                params: {user: isReset ? "" : user}
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
                    <Input search={'user'} searchData={onSearchParam} data={user}/>
                    <Buttons style={`green-sm`} word={`search`} onClick={searchUser}/>
                    <Buttons style={`green-sm`} word={`reset`} onClick={reset}/>
                </div>
                <Buttons style={`green-sm`} word={`add`} onClick={() => setInsertModalOpen(true)}/>
            </div>
            <UserTables  data={result} setUpdateModalOpen={setUpdateModalOpen} setUpdateData={setUpdateData}/>
            <UserInsert insertModalOpen={insertModalOpen} setInsertModalOpen={setInsertModalOpen} fetchUserList={fetchUserList}/>
            <UserUpdate updateModalOpen={updateModalOpen} setUpdateModalOpen={setUpdateModalOpen} fetchUserList={fetchUserList} updateData={updateData} setUpdateData={setUpdateData}/>
        </div>
    )
}

export default UserList;