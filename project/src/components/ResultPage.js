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
            <BackButton onClick={ () => {history.goBack()} }> π </BackButton><br /><br /><br /><br /><br /><br />

            <h1>{inputs.name}({inputs.gender})λ κ²μ¬κ° μλ£λμμ΅λλ€.</h1><br/><br /><br />

            <h4>
                κ²μ¬κ²°κ³Όλ μ¬λ¬λΆμ΄ μ§μμ μ νν  λ μλμ μΌλ‘ μ΄λ ν κ°μΉλ₯Ό μ€μνκ² μκ°νλμ§λ₯Ό μλ €μ£Όκ³ ,
                <br/>
                μ€μ κ°μΉλ₯Ό μΆ©μ‘±μμΌμ€ μ μλ μ§μμ λν΄ μκ°ν΄ λ³Ό κΈ°νλ₯Ό μ κ³΅ν©λλ€.
            </h4><br /><br /><br /><br /><br />
            
            <NextButton onClick={ (event) => {
                alert('κ²μ¬κ° μλ£λμμ΅λλ€.');
                history.push({pathname:`/EndPage/${name}`,state:{inputs:inputs,answers:answers}})}}> κ²°κ³Όλ³΄κΈ° </NextButton>
                
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