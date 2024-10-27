const Buttons = ({style, word}) => {
    /**
     * 사용법
     * Buttons components를 호출하여 buttonStyle buttonWord 각 아래에 맞추어서 보내면 됨.
     * @type {{"white-sm": string, "green-sm": string, "green-lg": string}}
     */
    const buttonStyle = {
         'green-sm' : 'm-2 w-16 h-8 bg-erp-green text-white text-xs' ,
         'green-lg' : 'm-2 w-24 h-8 bg-erp-green text-white text-xs' ,
         'white-sm' : 'm-2 w-16 h-8 bg-white text-black border-2 border-erp-gray text-xs bold' ,
    };

    const buttonWord = {
        'search' : '조회',
        'add' : '등록',
        'save' : '저장',
        'cancel' : '취소',
        'delete' : '삭제',
        'disabled' : '비활성화 처리',
        'approval' : '결재처리',
        'pass' : '비밀번호 초기화'
    };

    return (
        <div>
            <button className={`${buttonStyle[style]}`}>
                {buttonWord[word]}
            </button>
        </div>
    )

};

export default Buttons;