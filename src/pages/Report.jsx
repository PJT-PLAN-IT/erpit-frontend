import { useAuth } from "../context/AuthContext.jsx";
const Report = () => {
  const { user } = useAuth();

  return (
    <>
      <div className={`flex-col justify-center align-middle items-center`}>
          <h1 className={`text-6xl`}>
          공사중
          </h1>
          <p>
              좌측에서 메뉴를 선택해주세요
          </p>
      </div>
    </>
  );
};

export default Report;
