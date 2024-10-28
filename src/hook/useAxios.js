// noinspection SpellCheckingInspection,JSIgnoredPromiseFromCall

import axios from "axios";
import {useState} from "react";
import {useAuth} from "../context/AuthContext.jsx";

// 기본 axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080', // API의 기본 URL로 설정
    timeout: 60 * 1000, // 60초
    headers: {'Content-Type': 'application/json'},
    withCredentials: true // 쿠키를 포함하여 요청하기 위해 설정
});

// Axios Hook
const useAxios = () => {
    const {setUser} = useAuth();
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Access-Token을 로컬 스토리지에서 불러오기
    const getAccessToken = () => localStorage.getItem('Access-Token');

    // Access-Token 갱신 함수
    const refreshToken = async () => {
        try {
            const response = await axios.post('/api/auth/refresh');
            const newAccessToken = response.headers['Access-Token']; // 헤더에서 Access-Token 가져오기

            if (newAccessToken) {
                localStorage.setItem('Access-Token', newAccessToken);
                setUser({
                    usercd: response.data.usercd,
                    usernm: response.data.usernm,
                    role: response.data.role,
                    accessToken: newAccessToken
                });
            }

            return newAccessToken;
        } catch (err) {
            // Refresh-Token이 만료되었거나 삭제되었을 경우
            console.error('refreshToken Error: ', err);
            document.cookie = 'Refresh-Token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; // Refresh-Token 삭제
            localStorage.removeItem('Access-Token'); // Access-Token 삭제
            throw new Error('Refresh token expired or unauthorized. Please log in again.');
        }
    };

    // 요청 인터셉터 설정
    axiosInstance.interceptors.request.use(
        async (config) => {
            const token = getAccessToken();
            if (token) {
                config.headers['Access-Token'] = token;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    // 응답 인터셉터 설정
    axiosInstance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            // 401 오류 발생 시 Access-Token 갱신
            if (error.response && error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    axiosInstance.defaults.headers.common['Access-Token'] = await refreshToken();
                    return axiosInstance(originalRequest);
                } catch (err) {
                    setError(err);
                    localStorage.removeItem('Access-Token');
                }
            }

            return Promise.reject(error);
        }
    );

    const fetchData = async ({config, body = null, params = null}) => {
        setLoading(true);
        try {
            const result = await axiosInstance({
                ...config,
                data: body,
                params: params,
            });
            const resultData = result.data;
            setResponse(resultData);
            return resultData;
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return {response, error, loading, fetchData};
};

export default useAxios;