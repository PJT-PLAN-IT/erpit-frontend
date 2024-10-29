import { useAuth } from "../context/AuthContext.jsx";
const Report = () => {
  const { user } = useAuth();

  return (
    <>
      <div>
        Report Page
        <br />
        {user.usercd}
      </div>
    </>
  );
};

export default Report;
