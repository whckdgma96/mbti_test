import React from 'react';
import styled from "styled-components";

const ResultPage = ({history,location}) =>{
    const inputs = location.state.inputs;
    const answers = location.state.answers;
    const {name, gender} = inputs;
    console.log(inputs);
    console.log(answers);
    return(
        
        <div>
            <BackButton onClick={ () => {history.goBack()} }> 👈 </BackButton><br /><br /><br /><br /><br /><br />

            <h1>{inputs.name}({inputs.gender})님 검사가 완료되었습니다.</h1><br/><br /><br />

            <h4>
                검사결과는 여러분이 직업을 선택할 때 상대적으로 어떠한 가치를 중요하게 생각하는지를 알려주고,
                <br/>
                중요 가치를 충족시켜줄 수 있는 직업에 대해 생각해 볼 기회를 제공합니다.
            </h4><br /><br /><br /><br /><br />
            
            <NextButton onClick={ (event) => {
                alert('검사가 완료되었습니다.');
                history.push({pathname:`/EndPage/${name}`,state:{inputs:inputs,answers:answers}})}}> 결과보기 </NextButton>
                
        </div>
    )
};
const BackButton = styled.button`
    float:left;
    border: 0;
    background: white;
`;
const NextButton = styled.button`
text-align: center;
border: 0;
border-radius: 10px;
width: 20vw;
background: #96A5FF;
color: #fff;
font-size: 30px;
`;
export default ResultPage;