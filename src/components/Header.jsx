import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
const Header = () => {
  const { user } = useAuth();
  const userIcon = (
    <FontAwesomeIcon icon={faCircleUser} className="text-gray-400 text-5xl" />
  );

  const logout = () => {
    <Navigate to="/login" replace />;
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
