/* eslint-disable react/prop-types */
import Buttons from "../items/Buttons.jsx";
import Input from "../items/Input.jsx";
import {useEffect, useState} from "react";
import useAxios from "../../hook/useAxios.js";
import UserTables from "../tables/UserTables.jsx";

const UserSearch = ({searchUserModalOpen, setSearchUserModalOpen, setUpdateData}) => {
    const {error, fetchData} = useAxios();
    const [result, setResult] = useState([]);
    const [user, setUser] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            if (searchUserModalOpen) {
                await fetchUserList();
            }
        };
        fetchData();
    }, [searchUserModalOpen]);

    const fetchUserList = async () => {
        try {
            const resultData = await fetchData({
                config: {method: "GET", url: "/api/user/list"},
                params: {user}
            });
            if (resultData) {
                setResult(resultData.data);
                setUser("");
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    const reset = () => {
        setUser("");
        fetchUserList();
    };
    const onSearchParam = (e) => {
        setUser(e);
    };

    const searchUser = () => {
        fetchUserList();
    };

    const onHandleKeyDown = (e) => {
        if(e.key === 'Enter'){
            fetchUserList();
        }
    }

    if (!searchUserModalOpen) return null;

    return (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center`}>
            <div className={`bg-white rounded-lg p-6 py-3 w-[1250px]`}>
                <h1 className={`font-semibold flex justify-center text-3xl py-8`}>직원 검색</h1>
                <div className={`flex`}>
                    <Input search={'user'} searchData={onSearchParam} onKeyDown={onHandleKeyDown} data={user}/>
                    <Buttons style={`green-sm`} word={`search`} onClick={searchUser}/>
                    <Buttons style={`white-sm`} word={`reset`} onClick={reset}/>
                </div>
                <UserTables data={result} setUpdateData={setUpdateData}
                             setSearchUserModalOpen={setSearchUserModalOpen}/>
                <div className={`flex justify-center`}>
                    <Buttons style={`white-sm`} word={`cancel`} onClick={() => setSearchUserModalOpen(false)}/>
                </div>
            </div>
        </div>
    );
};

export default UserSearch;
