import {Navigate, useNavigate} from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import useAxios from "../hook/useAxios.js";
const Header = () => {
  const { user } = useAuth();
  const {error, fetchData} = useAxios();

  const userIcon = (
    <FontAwesomeIcon icon={faCircleUser} className="text-gray-400 text-5xl" />
  );

  const navigator = useNavigate();
  const logout = async () => {
    if(localStorage.getItem('Access-Token')){
      try {
          const resultData = await fetchData({
            config: { method: "POST", url: "/api/auth/logout" },
          });
        if (resultData) {
          alert("로그아웃되었습니다.");
          document.cookie = 'Refresh-Token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; // Refresh-Token 삭제
          localStorage.removeItem('Access-Token'); // Access-Token 삭제
          navigator('/login');
        }
      } catch (error) {
        console.error("Error: ", error);
      }
    }
  };

  return (
    <>
      <div className={`h-16 bg-white flex justify-end items-center`}>
        <div className="flex items-center gap-4 mr-8 ">
          <p className="text-xl">{user.usernm}님</p>
          <p className="border-r-2 pr-4">{userIcon}</p>
          <button
            className="text-center px-4 py-1 bg-erp-green text-white"
            onClick={logout}
          >
            로그아웃
          </button>
        </div>
      </div>
    </>
  );
};
export default Header;
