import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
      <h1 className="text-6xl font-bold mb-4">403</h1>
      <h2 className="text-2xl font-semibold mb-2">죄송합니다</h2>
      <p className="text-lg mb-6">페이지를 접근하실 권한이 없습니다.</p>
      <Link
        to="/"
        className="px-6 py-3 text-white rounded-lg transition duration-200 bg-erp-green"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
};

export default NotFound;
