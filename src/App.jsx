import './App.css'
import AppRoutes from "./routes/Routes.jsx";

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
            <AppRoutes />
        </>
    )
}

export default App
