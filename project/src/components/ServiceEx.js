import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styled from "styled-components";

const ServiceEx = ( { history } ) => {
    const [exData, setExData] = useState([]);
    const [no1, setNo1] = useState(0);

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
    console.log(exData);

    return (
        <div>
            <BackButton onClick={ () => {history.goBack()} }> 👈 </BackButton><br />
            <h1>검사 예시</h1>
            <br/>
            <p> 직업과 관련된 두개의 가치 중에서 자기에게 더 중요한 가치에 표시하세요.<br/>
                가치의 뜻을 잘 모르겠다면 문항 아래에 있는 가치의 설명을 확인해보세요.
            </p><br />
            <Textbox className='testSheet'>
            <h6> Q{exData.qitemNo}. {exData.question}</h6>
                <input type="radio" name="answer" value="answer"></input>
                <label for="answer">{exData.answer01}</label> 
                <p>{exData.answer03}</p>

                <input type="radio" name="answer" value="answer"></input>
                <label for="answer">{exData.answer02}</label>
                <p>{exData.answer04}</p>

            </Textbox>
            <br/><br/>
            <StartButton 
            onClick={ (event) => {
                alert('검사를 시작하겠습니다!!😎');
                history.push("/ServiceStart")}}
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

const Textbox = styled.div`
    background-color: #E1F6FA;
    width: 70%;
    height:50%
    border-radius: 3px;
    border : 100px;
    display: block;
    margin : auto;
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