import React from 'react';
import styled from "styled-components";

const ResultPage = ({history}) =>{
    return(
        
        <div>
            끝났습니다.
            <BackButton onClick={ () => {history.goBack()} }> 👈 </BackButton><br />
            <button onClick={ (event) => {
                alert('직업가치관검사를 종료합니다. 감사합니다.');
                history.push("/")}}> 처음으로 </button>
        </div>
    )
};
const BackButton = styled.button`
    float:left;
    border: 0;
    background: white;
`;
export default ResultPage;