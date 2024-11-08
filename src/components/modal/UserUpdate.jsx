/* eslint-disable react/prop-types */
// noinspection SpellCheckingInspection

import Buttons from "../items/Buttons.jsx";
import useAxios from "../../hook/useAxios.js";
import {useRef} from "react";

const userSbj = {
    usercd: '직원코드',
    usernm: '이름',
    birthdate: '생년월일',
    password: '비밀번호',
    auth: '권한',
    joindate: '입사일',
    adddate: '등록일'
};

const UserUpdate = ({updateModalOpen, setUpdateModalOpen, fetchUserList, updateData, setUpdateData}) => {
    const {error, fetchData} = useAxios();
    const isUsernm = useRef(false);
    const isAuth = useRef(false);
    const isSave = useRef(true);

    if (!updateModalOpen) return false;

    //직원 수정
    const updateFunction = async () => {
        try {
            const result = await fetchData({
                config: {method: "PUT", url: "/api/user"},
                body: updateData
            });
            if (result) {
                alert('등록되었습니다.');
                setUpdateModalOpen(false);
                fetchUserList(true);
                isUsernm.current = false;
                isAuth.current = false;
                isSave.current = true;
            }
            if (error) {
                console.error("Error: ", error);
            }
        } catch (err) {
            console.error("Error: ", err);
        }
    }
    const onPasswordReset = async () => {
        try {
            const result = await fetchData({
                config: {method: "POST", url: "/api/admin/reset-password"},
                body: {
                    usercd: updateData.usercd
                }
            });
            if (result) {
                const message = result.message;
                if (message === 'success') {
                    alert("비밀번호가 초기화되었습니다");
                    isUsernm.current = false;
                    isAuth.current = false;
                    isSave.current = true;
                }
            }
            if (error) {
                console.error("Error: ", error);
            }
        } catch (err) {
            console.error("Error: ", err);
        }
    };

    const clickCancel = () => {
        setUpdateModalOpen(false);
        isUsernm.current = false;
        isAuth.current = false;
        isSave.current = true;
    }

    const onChangeForm = (e) => {
        const {name, value} = e.target;
        if(value === '' && name === 'usernm'){
            isUsernm.current = false;
        }else if(value !=='' && name === 'usernm'){
            isUsernm.current = true;
        }
        if(name==='auth'){
            isAuth.current = true;
        }

        if(isUsernm.current || isAuth.current){
            isSave.current = false;
        }else{
            isSave.current = true;
        }


        setUpdateData({...updateData, [name]: value});
    };

    return (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center`}>
            <div className={`bg-white rounded-lg p-6 py-3 w-[450px]`}>
                <h1 className={`flex items-center justify-center font-bold text-2xl my-10`}>직원 수정</h1>
                <table className={`w-full border-erp-gray border-x border-t`}>
                    <tbody>
                    {Object.entries(userSbj).map(([sbj, data]) => (
                        <tr key={sbj} className={`flex border-erp-gray border-b`}>
                            <td className={`border-erp-gray border-r bg-erp-mint p-2 flex w-32 justify-center items-center`}> {data} </td>
                            <td className={`bg-white flex-grow flex items h-12`}>
                                {sbj === 'usercd' &&
                                    <input
                                        name={sbj}
                                        value={updateData[sbj]}
                                        onChange={onChangeForm}
                                        disabled={true}
                                        className={`flex-grow px-2 outline-none`}/>
                                }
                                {sbj === 'usernm' &&
                                    <input
                                        name={sbj}
                                        value={updateData[sbj]}
                                        onChange={onChangeForm}
                                        maxLength={5}
                                        className={`flex-grow px-2 outline-none`}/>
                                }
                                {sbj === 'birthdate' &&
                                    <input
                                        name={sbj}
                                        value={updateData[sbj]}
                                        onChange={onChangeForm}
                                        disabled={true}
                                        className={`flex-grow px-2 outline-none`}/>
                                }
                                {sbj === 'password' &&
                                    <>
                                        <div className={`flex items-center`}>
                                            <Buttons
                                                word={'pass'}
                                                style={'green-lg'}
                                                onClick={onPasswordReset}
                                            />
                                        </div>
                                    </>
                                }

                                {sbj === 'auth' &&
                                    <>
                                        <label className={`justify-center flex items-center pr-5`}>
                                            <input
                                                type={'radio'}
                                                name={sbj}
                                                value={'ROLE_ADMIN'}
                                                onChange={onChangeForm}
                                                checked={updateData[sbj] === 'ROLE_ADMIN'}
                                                className={`mx-2`}/>
                                            관리자
                                        </label>
                                        <label className={`justify-center flex items-center`}>
                                            <input
                                                type={'radio'}
                                                name={sbj}
                                                value={'ROLE_USER'}
                                                onChange={onChangeForm}
                                                checked={updateData[sbj] === 'ROLE_USER'}
                                                className={`mx-2`}/>
                                            일반
                                        </label>
                                    </>
                                }
                                {sbj === 'joindate' &&
                                    <input
                                        name={sbj}
                                        value={updateData[sbj]}
                                        onChange={onChangeForm}
                                        disabled={true}
                                        className={`flex-grow px-2 outline-none`}/>
                                }
                                {sbj === 'adddate' &&
                                    <input
                                        name={sbj}
                                        value={updateData[sbj]}
                                        onChange={onChangeForm}
                                        disabled={true}
                                        className={`flex-grow px-2 outline-none`}/>
                                }
                            </td>
                        </tr>
                    ))}
                    <tr></tr>
                    </tbody>
                </table>
                <div className={`flex justify-center my-5`}>
                    <Buttons style={'white-sm'} word={'cancel'}  onClick={clickCancel}/>
                    <Buttons style={isSave.current ?'disable-sm' :'green-sm'} word={'save'} disabled={isSave.current} onClick={updateFunction}/>
                </div>
            </div>
        </div>
    )
}
export default UserUpdate;
