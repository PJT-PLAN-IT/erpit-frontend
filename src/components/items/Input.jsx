const Input = ({search , searchData, onKeyDown, data}) => {

    const sbj = {
        buyer: '바이어',
        user: '직원',
        item: '판매부번'
    }

    return (
        <>
            <div className={`flex flex-row items-center`}>
                <p className={`mx-2`}>{sbj[search]}</p>
                <input className={`text-erp-gray mx-3 w-52 h-10 border border-erp-gray pl-2 text-sm`}
                       placeholder={'검색어를 입력해주세요'}
                       value={data}
                       onKeyDown={onKeyDown}
                       onChange={(e) => searchData(e.target.value)}>
                </input>
            </div>
        </>
    )
}
export default Input;