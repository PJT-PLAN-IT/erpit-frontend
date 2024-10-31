/* eslint-disable react/prop-types */
const UserTables = ({ data, setUpdateModalOpen, setUpdateData }) => {
    const headStyle = 'border border-erp-gray text-center py-2 font-semibold';
    const tdStyle = 'border border-erp-gray text-center text-sm py-3';
    const trStyle = 'bg-white cursor-pointer hover:bg-gray-200';
    const user = ['순번', '직원코드', '이름', '생년월일', '권한', '입사일', '등록일'];

    const onClickTable = (userData) => {
        setUpdateData(userData);
        setUpdateModalOpen(true);
    };
    return (
        <div className={`h-[1014px] overflow-y-auto mt-20`}>
            <table className={`w-full`}>
                <thead className={`sticky top-0`}>
                <tr className={`items-center bg-erp-mint`}>
                    {user.map((sbj, index) => (
                        <td key={index} className={`${headStyle}`}>{sbj}</td>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data.map((user, index) => (
                    <tr key={index}
                        className={`${trStyle}`}
                        onClick={() => onClickTable(user)}
                    >
                        <td className={`${tdStyle}`}>{index + 1}</td>
                        <td className={`${tdStyle}`}>{user.usercd}</td>
                        <td className={`${tdStyle}`}>{user.usernm}</td>
                        <td className={`${tdStyle}`}>{user.birthdate}</td>
                        <td className={`${tdStyle}`}>{user.auth}</td>
                        <td className={`${tdStyle}`}>{user.joindate}</td>
                        <td className={`${tdStyle}`}>{user.adddate}</td>
                    </tr>
                ))}
                </tbody>

            </table>
        </div>
    )

};
export default UserTables;