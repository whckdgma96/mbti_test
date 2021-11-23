import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styled from "styled-components";
import ProgressBar from 'react-bootstrap/ProgressBar';


const ServiceStart = ({history}) =>{
    const [exData, setExData] = useState([]);
    const [progressbar, setProgressbar] = useState(0);

    useEffect(() =>{
        async function Question() {//비동기
            try {
                const response = await axios.get(`https://www.career.go.kr/inspct/openapi/test/questions?apikey=b898f00caa8bcc71c4fc19598b84e9e1&q=6`);
                setExData(response.data.RESULT);
                
            } catch (e) {
                console.log('Error');
            }
        } Question();

    },[]);
    // console.log(exData);


    return (
        <div>
            <BackButton onClick={ () => {history.goBack()} }> 👈 </BackButton><br />
            <h1>검사 진행</h1>
            <div>
                <p>{progressbar}%</p>
                <ProgressBar now={progressbar} label={`${progressbar}%`} />
                
            </div>
            <br/>
            <button onClick={ (event) => {
                alert('검사가 완료되었습니다. 결과를 기다려 주십시오.🧐');
                history.push("/ResultPage")}}> 결과보기 </button>
        </div>
        
    );
};
const BackButton = styled.button`
    float:left;
    border: 0;
    background: white;
`;
export default ServiceStart;