/* eslint-disable react/prop-types */
import {useAuth} from "../../context/AuthContext.jsx";

const UserTables = ({ data, setUpdateModalOpen, setUpdateData }) => {
    const headStyle = 'border border-erp-gray text-center py-2 font-semibold';
    const tdStyle = 'border border-erp-gray text-center py-3';
    const trStyle = 'bg-white cursor-pointer hover:bg-gray-200';
    const userSbj = ['순번', '직원코드', '이름', '생년월일', '권한', '입사일', '등록일'];
    const { user } = useAuth();

    const onClickTable = (userData) => {
        if(user.role === 'ROLE_ADMIN'){
            setUpdateData(userData);
            setUpdateModalOpen(true);
        }
    };
    return (
        <div className={`h-[700px] overflow-y-auto mt-5`}>
            <table className={`w-full`}>
                <thead className={`sticky top-0`}>
                <tr className={`items-center bg-erp-mint`}>
                    {userSbj.map((sbj, index) => (
                        <td key={index} className={`${headStyle}`}>{sbj}</td>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data.map((emp, index) => (

                    <tr key={index}
                        className={`${trStyle}`}
                        onClick={() => onClickTable(emp)}
                    >
                        <td className={`${tdStyle}`}>{index + 1}</td>
                        <td className={`${tdStyle}`}>{emp.usercd}</td>
                        <td className={`${tdStyle}`}>{emp.usernm}</td>
                        <td className={`${tdStyle}`}>{emp.birthdate}</td>
                        <td className={`${tdStyle}`}>{emp.auth === 'ROLE_ADMIN' ? '관리자' : '일반'}</td>
                        <td className={`${tdStyle}`}>{emp.joindate}</td>
                        <td className={`${tdStyle}`}>{emp.adddate}</td>
                    </tr>
                ))}
                </tbody>

            </table>
        </div>
    )

};
export default UserTables;