import './App.css'
import AppRoutes from "./routes/Routes.jsx";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import MainBasic from "./components/MainBasic.jsx";

function App() {

    // const fetchData = async () => {
    //     try {
    //         const response = await axios.get('/test/hi');
    //         console.log('응답 데이터:', response.data);
    //     } catch (error) {
    //         console.error('데이터 가져오기 오류:', error);
    //     }
    // };
    //
    // fetchData();

    return (
        <>
            <MainBasic />
        </>
    )
}

export default App
