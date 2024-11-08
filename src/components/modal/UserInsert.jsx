/* eslint-disable react/prop-types */
// noinspection SpellCheckingInspection,JSUnresolvedReference

import Buttons from "../items/Buttons.jsx";
import {useRef, useState} from "react";
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
    const isUsernm = useRef(false);
    const isBirth = useRef(false);
    const isJoin = useRef(false);
    const [isSave, setIsSave] = useState(true);

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
                isUsernm.current = false;
                isBirth.current = false;
                isJoin.current = false;
                setIsSave(true);
            }
            if (error) {
                console.error("Error: ", error);
            }
        } catch (err) {
            console.error("Error: ", err);
        }
    }

    const clickCancel = () => {
        setInsertModalOpen(false);
        setFormData(initFormData);
        isUsernm.current = false;
        isBirth.current = false;
        isJoin.current = false;
        setIsSave(true);
    }

    const onChangeForm = (e) => {
        let {name, value} = e.target;
        if (value === '') {
            if (name === 'usernm') {
                isUsernm.current = false;
            }
            if (name === 'birthdate') {
                isBirth.current = false;
            }
            if (name === 'joindate') {
                isJoin.current = false;
            }
        } else {
            if (name === 'usernm') {
                isUsernm.current = true;
            }
            if (name === 'birthdate') {
                let formvalue = value.replace(/[^0-9]/g, "");
                if (formvalue.length === 8) {
                    formvalue = value.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
                    isBirth.current = true;
                } else {
                    isBirth.current = false;
                }
                value = formvalue;
            }
            if (name === 'joindate') {
                let formvalue = value.replace(/[^0-9]/g, "");
                if (formvalue.length === 8) {
                    formvalue = value.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
                    isJoin.current = true;
                } else {
                    isJoin.current = false;
                }
                value = formvalue;
            }
        }

        setFormData({...formData, [name]: value});

        if (isUsernm.current && isBirth.current && isJoin.current) {
            setIsSave(false);
        } else {
            setIsSave(true);
        }
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
                                {sbj === 'usernm' &&
                                    <input name={sbj}
                                           value={formData[sbj]}
                                           onChange={onChangeForm}
                                           maxLength={5}
                                           placeholder={'직원명을 입력해주세요'}
                                           className={`flex w-full h-full px-2 outline-none`}/>
                                }
                                {sbj === 'birthdate' &&
                                    <input name={sbj}
                                           value={formData[sbj]}
                                           onChange={onChangeForm}
                                           maxLength={10}
                                           placeholder={'YYYYMMDD 형식으로 입력해주세요'}
                                           className={`flex w-full h-full px-2 outline-none`}/>
                                }
                                {sbj === 'joindate' &&
                                    <input name={sbj}
                                           value={formData[sbj]}
                                           onChange={onChangeForm}
                                           maxLength={10}
                                           placeholder={'YYYYMMDD 형식으로 입력해주세요'}
                                           className={`flex w-full h-full px-2 outline-none`}/>
                                }
                            </td>
                        </tr>
                    ))}
                    <tr></tr>
                    </tbody>
                </table>
                <div className={`flex justify-center my-5`}>
                    <Buttons style={'white-sm'} word={'cancel'} onClick={clickCancel}/>
                    <Buttons style={!isSave ? 'green-sm' : 'disable-sm'} word={'save'} onClick={saveUser}
                             disabled={isSave}/>
                </div>
            </div>
        </div>
    )
}
export default UserInsert;
