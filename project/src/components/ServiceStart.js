import React from 'react';
const ServiceStart = ({history}) =>{
    return (
        <div>
            검사 문제(API받아오기)
            <button onClick={ () => {history.goBack()} }> 뒤로가기 </button>
            <button onClick={ (event) => {
                alert('검사가 완료되었습니다. 결과를 기다려 주십시오.');
                history.push("/ResultPage")}}> 결과보기 </button>
        </div>
        
    );
};

export default ServiceStart;