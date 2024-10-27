const UserTables = () => {

    const headStyle = 'border border-erp-gray text-center text-xs py-2 font-semibold';
    const tdStyle = 'border border-erp-gray text-center text-xs py-2 bg-white';
    const user = ['순번', '직원코드', '이름', '생년월일', '권한', '입사일', '등록일'];
    const data = [
        {
            "userid" : 1,
            "usercd" : "ER20240001",
            "usernm" : "김호영",
            "birthdate" : "1995-12-13",
            "joindate" : "2024-10-17",
            "auth" : "ROLE_ADMIN",
            "adddate" : "2024-10-17"
        },
        {
            "userid" : 2,
            "usercd" : "ER20240002",
            "usernm" : "김혜진",
            "birthdate" : "1995-12-13",
            "joindate" : "2024-10-17",
            "auth" : "ROLE_ADMIN",
            "adddate" : "2024-10-17"
        },
    ];
    return (

        <table className={`w-full border border-erp-gray`}>
            <thead>
            <tr className={`items-center bg-erp-mint`}>
                {user.map((sbj, index) => (
                    <td key={index} className={`${headStyle}`}>{sbj}</td>
                ))}
            </tr>
            </thead>
            <tbody>
                {data.map((user, index) => (
                    <tr key={index} className={``}>
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

    )

};
export default UserTables;