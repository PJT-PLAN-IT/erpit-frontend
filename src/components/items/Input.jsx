const Input = ({search}) => {

    const sbj = {
        buyer: '바이어',
        user: '직원',
        item: '판매부번'
    }

    return (
        <>
            <div className={`flex flex-row items-center`}>
                <p className={`mx-2 text-sm`}>{sbj[search]}</p>
                <input className={`text-erp-gray mx-3 w-44 h-8 border border-erp-gray pl-2 text-sm`}
                       placeholder={'검색어를 입력해주세요'}>
                </input>
            </div>
        </>
    )
}
export default Input;