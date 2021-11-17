import React from 'react';
const ResultPage = ({history}) =>{
    return(
        
        <div>
            끝났습니다.
            <button onClick={ () => {history.goBack()} }> 뒤로가기 </button>
            <button onClick={ (event) => {
                alert('직업가치관검사를 종료합니다. 감사합니다.');
                history.push("/")}}> 처음으로 </button>
        </div>
    )
};

export default ResultPage;