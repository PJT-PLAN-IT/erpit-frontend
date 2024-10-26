import {useState} from "react";

const PassChange = () => {

    const [pass, setPass] = useState("")
    const [passSec, setPassSec] = useState("");
    const [check, setCheck] = useState('');

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
        }
        else if(pass === passSec){
            setCheck("비밀번호가 일치합니다.");
        }
        else{
            setCheck("비밀번호를 다시 확인해주세요");
        }
        setPassSec(passSec);
    };

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
                className={`flex w-96 h-12 my-10 rounded-lg bg-erp-green font-medium items-center justify-center text-white`}>저장
            </button>
        </div>
    )

}
export default PassChange;