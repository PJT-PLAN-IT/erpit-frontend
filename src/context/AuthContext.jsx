// noinspection SpellCheckingInspection,JSIgnoredPromiseFromCall

import {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";

const AuthContext = createContext(undefined);

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({children}) => {
    // 로그인 상태 관리
    const [user, setUser] = useState({
        usercd: '',
        usernm: '',
        role: '',
        accessToken: '',
    });

    // 기본 axios 인스턴스 생성
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:8080', // API의 기본 URL로 설정
        timeout: 60 * 1000, // 60초
        headers: {'Content-Type': 'application/json'},
        withCredentials: true // 쿠키를 포함하여 요청하기 위해 설정
    });

    const refreshPage = async () => {
        if (localStorage.getItem('Access-Token') && !user.accessToken) {
            try {
                const resultData = await fetchData({method: "POST", url: "api/auth/refresh"});
                if (resultData) {
                    setUser({
                        usercd: resultData.data.usercd,
                        usernm: resultData.data.usernm,
                        role: resultData.data.role,
                        accessToken: resultData.data.accessToken,
                    });
                    saveAccessToken(resultData.data.accessToken);
                }
            } catch (err) {
                console.error('Login Error: ', err);
            }
        }
    };

    const fetchData = async (config, body = null) => {
        try {
            const result = await axiosInstance({
                ...config,
                data: body,
            });
            return result.data;
        } catch (err) {
            // Refresh-Token이 만료되었거나 삭제되었을 경우
            console.error('refreshToken Error: ', err);
            document.cookie = 'Refresh-Token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; // Refresh-Token 삭제
            localStorage.removeItem('Access-Token'); // Access-Token 삭제
            throw new Error('Refresh token expired or unauthorized. Please log in again.');
        }
    };

    // Access Token을 Local Storage에 저장
    const saveAccessToken = (accessToken) => {
        if (accessToken) {
            localStorage.setItem('Access-Token', accessToken);
        }
    };

    useEffect(() => {
        refreshPage();
    });

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                saveAccessToken
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    return useContext(AuthContext);
};