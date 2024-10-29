import {useAuth} from "../context/AuthContext.jsx";

const Report = () => {
    const {user} = useAuth();

    return (
        <>
            Report Page
            <br/>
            {user.usercd}
        </>
    );
};

export default Report;