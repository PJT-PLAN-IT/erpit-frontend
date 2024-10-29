const Buttons = ({style, word, onClick}) => {

    const buttonStyle = {
         'green-sm' : 'm-2 w-16 h-8 bg-erp-green text-white text-xs' ,
         'green-lg' : 'm-2 w-24 h-8 bg-erp-green text-white text-xs' ,
         'white-sm' : 'm-2 w-16 h-8 bg-white text-black border border-erp-gray text-xs bold' ,
        'white-sm-mg-none' : 'w-16 mx-2 h-8 bg-white text-black border border-erp-gray text-xs bold' ,
    };

    const buttonWord = {
        'search' : '조회',
        'add' : '등록',
        'save' : '저장',
        'cancel' : '취소',
        'delete' : '삭제',
        'disabled' : '비활성화 처리',
        'approval' : '결재처리',
        'pass' : '비밀번호 초기화',
        'dup' : '중복확인'
    };


    return (
        <div>
            <button className={`${buttonStyle[style]}`} onClick={onClick}>
                {buttonWord[word]}
            </button>
        </div>
    )

};

export default Buttons;