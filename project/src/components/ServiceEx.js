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
        async function Question() {//비동기
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
            <BackButton onClick={ () => {history.goBack()} }> 👈 </BackButton><br />
            <h1>검사 예시</h1>
            <div>
                <p>{progressbar}%</p>
                <ProgressBar now={progressbar} label={`${progressbar}%`} />
                
            </div>
            <br/>
            <p> 직업과 관련된 두개의 가치 중에서 자기에게 더 중요한 가치에 표시하세요.<br/>
                가치의 뜻을 잘 모르겠다면 문항 아래에 있는 가치의 설명을 확인해보세요.
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
                alert('검사를 시작하겠습니다!!😎');
                history.push({pathname:`/ServiceStart/${name}`, state:{inputs:inputs}})
                }}
                disabled={!exData}
                
                > 검사시작 </StartButton>
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