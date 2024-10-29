import Buttons from "../items/Buttons.jsx";

const BuyerInsert = ({isOpen, onClose, onSave}) => {
    const buyerSbj = ['바이어코드', '바이어명', '전화번호', '이메일', '주소', '상세주소'];
    if (!isOpen) return null;

    return (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center`}>
            <div className={`bg-white rounded-lg p-6 py-3 w-1/3`}>
                <h1 className={`flex items-center justify-center font-bold text-2xl my-10`}>바이어 등록</h1>
                <table className={`w-full border-erp-gray border-x border-t`}>
                    <tbody>
                    {buyerSbj.map((sbj, index) => (
                        <tr key={index} className={`flex border-erp-gray border-b`}>
                            <td className={`border-erp-gray border-r bg-erp-mint p-2 flex w-32 justify-center items-center`}> {sbj}</td>
                            <td className={`bg-white flex-grow flex items`}>
                                {sbj === '바이어코드' ?
                                    <>
                                        <input className={`flex-grow px-2 outline-none`}/>
                                        <div className={`flex items-center`}>
                                            <Buttons style={'white-sm-mg-none'} word={'dup'}/>
                                        </div>
                                    </>
                                    :
                                    <input className={`flex w-full h-full px-2 outline-none`}/>
                                }
                            </td>
                        </tr>
                    ))}
                    <tr></tr>
                    </tbody>
                </table>
                <div className={`flex justify-center my-5`}>
                    <Buttons style={'white-sm'} word={'cancel'} onClick={onClose}/>
                    <Buttons style={'green-sm'} word={'save'} onClick={onSave}/>
                </div>
            </div>
        </div>
    )
}
export default BuyerInsert;
