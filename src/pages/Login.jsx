
function Login(){



    return (
        <div className={`flex flex-col justify-center items-center h-screen w-screen`}>
            <h1 className={`font-bold text-6xl align-middle items-center mb-20 text-erp-green`}>ERP-IT</h1>
            <h1 className={`font-bold text-4xl align-middle items-center mb-10 text-erp-green`}>LOGIN</h1>
            <input className={`flex w-96 h-12 my-1 rounded-lg border border-gray-200 font-bold px-2`} placeholder={`직원코드를 입력해주세요`}/>
            <input type={`password`} className={`flex w-96 h-12 my-1 rounded-lg border border-gray-200 font-medium px-2`} placeholder={`비밀번호를 입력해주세요`}/>
            <button className={`flex w-96 h-12 my-10 rounded-lg bg-erp-green font-medium items-center justify-center text-white`}>로그인</button>
        </div>
    )
}

export default Login;