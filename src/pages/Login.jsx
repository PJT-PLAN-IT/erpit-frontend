// noinspection SpellCheckingInspection,JSIgnoredPromiseFromCall,JSCheckFunctionSignatures

import { useAuth } from "../context/AuthContext.jsx";
import {Navigate, useNavigate} from "react-router-dom";
import {useRef, useState} from "react";
import useAxios from "../hook/useAxios.js";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

const Login = () => {
  const { error, loading, fetchData } = useAxios();
  const { setUser, saveAccessToken } = useAuth();
  const [input, setInput] = useState({
    usercd: "",
    password: "",
  });
  const isLogin = useRef(true);
  const isUsercd = useRef(false);
  const isPass = useRef(false);

  const onChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    console.log(name);
    console.log(value);

    if(name==='usercd' && value === ''){
      isLogin.current = true;
      isUsercd.current = false;
    }else{
      isUsercd.current = true;
    }
    if(name==='password' && value ===''){
      isLogin.current = true;
      isPass.current = false;
    }else{
      isPass.current = true;
    }

    if(isUsercd.current && isPass.current){
      isLogin.current = false;
    }

    setInput({
      ...input,
      [name]: value,
    });
  };
  const navigator = useNavigate();
  const onClickLogin = async () => {
    try {
      const resultData = await fetchData({
        config: { method: "POST", url: "/api/auth/login" },
        body: input,
      });
      if (resultData) {
        if(resultData.message === "password does not match"){
          alert("로그인 실패!");
          return;
        }
        if(resultData.message ==="user does not exist"){
          alert("존재하지 않는 아이디입니다.");
          return;
        }
          setUser({
            usercd: resultData.data.usercd,
            usernm: resultData.data.usernm,
            role: resultData.data.role,
            accessToken: resultData.data.accessToken,
          });
          saveAccessToken(resultData.data.accessToken);
          isLogin.current = true;
          isPass.current = false;
          isUsercd.current = false;
        if (resultData.data.isInitPw === 'Y') {
          navigator('/passchange');
        }
      } else if (error) {
        console.error("Error: ", error);
      }
    } catch (err) {
      console.error("Error: ", err);
    }
  };
  const onHandleKeyDown = (e) => {
    if(e.key === 'Enter'){
      onClickLogin();
    }
  }

  // 이미 로그인한 경우라면 메인 페이지로 이동
  if (localStorage.getItem("Access-Token")) {
    return <Navigate to={"/"} replace={true} />;
  }

  return (
    <div
      className={`flex flex-col justify-center items-center h-screen w-screen`}
    >
      <h1
        className={`font-bold text-6xl align-middle items-center mb-20 text-erp-green`}
      >
        ERP-IT
      </h1>
      <h1
        className={`font-bold text-4xl align-middle items-center mb-10 text-erp-green`}
      >
        LOGIN
      </h1>
      <input
        name={"usercd"}
        className={`flex w-96 h-12 my-1 rounded-lg border border-gray-200 font-bold px-2`}
        placeholder={`직원코드를 입력해주세요`}
        onChange={onChangeInput}
      />
      <input
        name={"password"}
        type={`password`}
        className={`flex w-96 h-12 my-1 rounded-lg border border-gray-200 font-medium px-2`}
        placeholder={`비밀번호를 입력해주세요`}
        onKeyDown={onHandleKeyDown}
        onChange={onChangeInput}
      />
      {isLogin.current ?
          <button
              className={`flex w-96 h-12 my-10 rounded-lg bg-erp-gray font-medium items-center justify-center text-white`}
              disabled={isLogin.current}
              onClick={onClickLogin}
          >
            로그인
          </button>
          :
          <button
              className={`flex w-96 h-12 my-10 rounded-lg bg-erp-green font-medium items-center justify-center text-white`}
              disabled={isLogin.current}
              onClick={onClickLogin}
          >
            로그인
          </button>
      }

      {loading && <LoadingSpinner/>}
    </div>
  );
};

export default Login;
