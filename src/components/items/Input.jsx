// eslint-disable-next-line react/prop-types
import {useState} from "react";

const Input = ({search , searchData}) => {

    const sbj = {
        buyer: '바이어',
        user: '직원',
        item: '판매부번'
    }

    const [data, setData] = useState();
    searchData(data);

    return (
        <>
            <div className={`flex flex-row items-center`}>
                <p className={`mx-2`}>{sbj[search]}</p>
                <input className={`text-erp-gray mx-3 w-52 h-10 border border-erp-gray pl-2 text-sm`}
                       placeholder={'검색어를 입력해주세요'} onChange={(e) => setData(e.target.value)}>
                </input>
            </div>
        </>
    )
}
export default Input;