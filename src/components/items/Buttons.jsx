const Buttons = ({style, word, onClick, disabled}) => {

    const buttonStyle = {
         'green-sm' : 'm-2 w-20 h-10 bg-erp-green text-white cursor-pointer',
         'disable-sm' : 'm-2 w-20 h-10 bg-erp-gray text-white',
         'green-lg' : 'm-2 w-36 h-10 bg-erp-green text-white cursor-pointer',
         'green-3lg' : 'm-2 w-48 h-10 bg-erp-green text-white cursor-pointer',
         'white-sm' : 'm-2 w-20 h-10 bg-white text-black border border-erp-gray bold cursor-pointer',
          'white-sm-mg-none' : 'w-20 mx-2 h-10 bg-white text-black border border-erp-gray bold cursor-pointer',
        'white-lg-mg-none' : 'w-40 mx-2 h-10 bg-white text-black border border-erp-gray bold cursor-pointer'
    };

    const buttonWord = {
        'buyer' : '바이어검색',
        'item' : '판매부번검색',
        'search' : '조회',
        'add' : '등록',
        'save' : '저장',
        'cancel' : '취소',
        'delete' : '삭제',
        'disabled' : '비활성화 처리',
        'approval' : '결재처리',
        'pass' : '비밀번호 초기화',
        'dup' : '중복확인',
        'reset' : '초기화',
        'admin' : '관리자 권한으로 변경',
        'user' : '일반 권한으로 변경'
    };


    return (
        <div>
            <button className={`${buttonStyle[style]}`} onClick={onClick} disabled={disabled}>
                {buttonWord[word]}
            </button>
        </div>
    )

};

export default Buttons;