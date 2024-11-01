import {useState} from "react";
import useAxios from "../../hook/useAxios.js";
import {useNavigate} from "react-router-dom";

const PassChange = () => {

    const [pass, setPass] = useState("");
    const [passSec, setPassSec] = useState("");
    const [check, setCheck] = useState('');
    const [disabled, setDisabled] = useState(true);
    const onChangePass = (e) => {
        // setPass(e.target.value);
        const pass = e.target.value;
        setPass(pass);
        passCheck(pass, passSec);
    };

    const onChangePassSec = (e) => {
        const passSec = e.target.value;
        setPassSec(e.target.value);
        passCheck(pass, passSec);
    };


    const passCheck = (pass, passSec) => {
        if(pass === '' || passSec === ''){
            setCheck("");
            setDisabled(true);
        }
        else if(pass === passSec){
            setCheck("비밀번호가 일치합니다.");
            setDisabled(false);
        }
        else{
            setCheck("비밀번호를 다시 확인해주세요");
            setDisabled(true);
        }
        setPassSec(passSec);
    };
    const { error, fetchData } = useAxios();
    const navigator = useNavigate();
    const onClickPass = async () => {
        try {
            const resultData = await fetchData({
                config: { method: "POST", url: "/api/user/change-password" },
                body: {password : pass}
            });
            if (resultData) {
                alert("비밀번호가 재설정 되었습니다. 다시 로그인해주세요");
                document.cookie = 'Refresh-Token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; // Refresh-Token 삭제
                localStorage.removeItem('Access-Token'); // Access-Token 삭제
                navigator('/login');
            } else if (error) {
                console.error("Error: ", error);
            }
        } catch (err) {
            console.error("Error: ", err);
        }
    }

    return (
        <div className={`flex flex-col justify-center items-center h-screen w-screen`}>
            <h1 className={`font-bold text-3xl align-middle items-center mb-10 text-erp-green`}>비밀번호를 설정해주세요</h1>
            <input type={`password`}
                   className={`flex w-96 h-12 my-1 rounded-lg border border-gray-200 font-medium px-2`}
                   placeholder={`비밀번호 입력`}
                   onChange={onChangePass}
            />
            <input type={`password`}
                   className={`flex w-96 h-12 my-1 rounded-lg border border-gray-200 font-medium px-2`}
                   placeholder={`비밀번호 확인`}
                   onChange={onChangePassSec}
            />
            <div className={`flex text-xs text-erp-green`}>
                {check}
            </div>
            <button
                onClick={onClickPass}
                disabled={disabled}
                className={`flex w-96 h-12 my-10 rounded-lg bg-erp-green font-medium items-center justify-center text-white`}>저장
            </button>
        </div>
    )

}
export default PassChange;