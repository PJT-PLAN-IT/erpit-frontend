import Header from "./Header.jsx";
import AppRoutes from "../routes/Routes.jsx";
import Sidebar from "./Sidebar.jsx";

const MainBasic = () => {

    return (
        <>
            <div className={`flex h-screen bg-erp-soft-gray`}>
                <Sidebar/>
                <div className={`flex flex-col w-full`}>
                    <Header/>
                    <div className={`m-10`}>
                        <AppRoutes/>
                    </div>
                </div>
            </div>
        </>
    )
}
export default MainBasic;
