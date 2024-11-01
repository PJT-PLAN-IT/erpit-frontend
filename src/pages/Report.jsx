import { useAuth } from "../context/AuthContext.jsx";
import {Link} from "react-router-dom";
const Report = () => {
  const { user } = useAuth();

  return (
      <>
          <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
              <h1 className="text-6xl font-bold mb-4">404</h1>
              <h2 className="text-2xl font-semibold mb-2">공사중입니다</h2>
              <p className="text-lg mb-6">좌측 메뉴를 선택해주세요</p>
          </div>
      </>
  );
};

export default Report;
