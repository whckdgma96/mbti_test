import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styled from "styled-components";
import ProgressBar from 'react-bootstrap/ProgressBar';


const ServiceEx = ( { history,location} ) => {//https://gongbu-ing.tistory.com/45

    const inputs = location.state.inputs;
    const {name, gender} = inputs;
    const [exData, setExData] = useState([]);
    const [progressbar, setProgressbar] = useState(0);
    useEffect(() =>{
        async function Question() {//λΉλκΈ°
            try {
                const response = await axios.get(`https://www.career.go.kr/inspct/openapi/test/questions?apikey=b898f00caa8bcc71c4fc19598b84e9e1&q=6`);
                setExData(response.data.RESULT[0]);
                
            } catch (e) {
                console.log('Error');
            }
        } Question();

    },[]);
    console.log(inputs);
    console.log(exData);

    return (
        <div>
            <BackButton onClick={ () => {history.goBack()} }> π </BackButton><br />
            <h1>κ²μ¬ μμ</h1>
            <div>
                <p>{progressbar}%</p>
                <ProgressBar now={progressbar} label={`${progressbar}%`} />
                
            </div>
            <br/>
            <p> μ§μκ³Ό κ΄λ ¨λ λκ°μ κ°μΉ μ€μμ μκΈ°μκ² λ μ€μν κ°μΉμ νμνμΈμ.<br/>
                κ°μΉμ λ»μ μ λͺ¨λ₯΄κ² λ€λ©΄ λ¬Έν­ μλμ μλ κ°μΉμ μ€λͺμ νμΈν΄λ³΄μΈμ.
            </p><br />
            <TestSheet className='testSheet'>
            <h7> No.{exData.qitemNo} {exData.question}</h7><br />
                <input type="radio" name="answer" value="answer"></input>
                <label for="answer">{exData.answer01}</label> 
                ({exData.answer03})<br/>
 
                <input type="radio" name="answer" value="answer"></input>
                <label for="answer">{exData.answer02}</label>
                ({exData.answer04})

            </TestSheet>
            <br/><br/>
            <StartButton 
            onClick={ (event) => {
                alert('κ²μ¬λ₯Ό μμνκ² μ΅λλ€!!π');
                history.push({pathname:`/ServiceStart/${name}`, state:{inputs:inputs}})
                }}
                disabled={!exData}
                
                > κ²μ¬μμ </StartButton>
        </div>
        
    );
}
const BackButton = styled.button`
    float:left;
    border: 0;
    background: white;
`;

const TestSheet = styled.div`
    background-color: #E1F6FA;
    width: 70%;
    height:50%
    border-radius: 3px;
    border : 100px;
    display: block;
    margin : auto;
    border-radius: 10px;
`;
const StartButton = styled.button`
    text-align: center;
    border: 0;
    border-radius: 10px;
    width: 20vw;
    background: #96A5FF;
    color: #fff;
    font-size: 30px;
`;




export default ServiceEx;