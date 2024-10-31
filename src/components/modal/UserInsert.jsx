/* eslint-disable react/prop-types */
// noinspection SpellCheckingInspection,JSUnresolvedReference

import Buttons from "../items/Buttons.jsx";
import {useState} from "react";
import useAxios from "../../hook/useAxios.js";

const userSbj = {
    usernm: '직원명',
    birthdate: '생년월일',
    joindate: '입사일',
};

const initFormData = {
    usernm: '',
    birthdate: '',
    joindate: ''
};

const UserInsert = ({insertModalOpen, setInsertModalOpen, fetchUserList}) => {
    const {error, fetchData} = useAxios();
    const [formData, setFormData] = useState(initFormData);

    if (!insertModalOpen) return false;

    //유저 등록
    const saveUser = async () => {
        try {
            const result = await fetchData({
                config: {method: "POST", url: "/api/admin/signup"},
                body: formData
            });
            if (result) {
                alert('등록되었습니다.');
                setFormData(initFormData);
                setInsertModalOpen(false);
                fetchUserList(true);
            }
            if (error) {
                console.error("Error: ", error);
            }
        } catch (err) {
            console.error("Error: ", err);
        }
    }

    const onChangeForm = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    return (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center`}>
            <div className={`bg-white rounded-lg p-6 py-3 w-[450px]`}>
                <h1 className={`flex items-center justify-center font-bold text-2xl my-10`}>직원 등록</h1>
                <table className={`w-full border-erp-gray border-x border-t`}>
                    <tbody>
                    {Object.entries(userSbj).map(([sbj, data]) => (
                        <tr key={sbj} className={`flex border-erp-gray border-b`}>
                            <td className={`border-erp-gray border-r bg-erp-mint p-2 flex w-32 justify-center items-center`}> {data} </td>
                            <td className={`bg-white flex-grow flex items h-12`}>
                                <input name={sbj}
                                        value={formData[sbj]}
                                        onChange={onChangeForm}
                                        className={`flex w-full h-full px-2 outline-none`}/>
                            </td>
                        </tr>
                    ))}
                    <tr></tr>
                    </tbody>
                </table>
                <div className={`flex justify-center my-5`}>
                    <Buttons style={'white-sm'} word={'cancel'} onClick={() => setInsertModalOpen(false)}/>
                    <Buttons style={'green-sm'} word={'save'} onClick={saveUser}/>
                </div>
            </div>
        </div>
    )
}
export default UserInsert;
