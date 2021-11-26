import axios from 'axios';
import React, { useEffect, useState, useMemo } from 'react';
import styled from "styled-components";

const EndPage = ({history,location}) =>{
    const inputs = location.state.inputs;
    const answers = location.state.answers;
    const {name, gender} = inputs;
    //기본 유저 데이터 form
    const userForm = {
        "apikey" : "b898f00caa8bcc71c4fc19598b84e9e1",
        "qestrnSeq" : "6",
        "trgetSe" : "100209",
        "name" : "",
        "gender" : "",
        "startDtm" : new Date().getTime(),
        "answers" : ""
    }
    userForm.name = name;
    userForm.gender = gender === "남" ? "100323" : "100324";
    userForm.answers = answers;

    const [userData,setUserData] = useState({});
    console.log(userForm)

    //유저 api 값 추출
    useEffect(() => {
        async function load(){
            let seq = "";
            async function loadData(){
                try{
                    const response = await axios.post(
                        `http://www.career.go.kr/inspct/openapi/test/report?apikey=b898f00caa8bcc71c4fc19598b84e9e1&qestrnSeq=6`, userForm
                    );
                    seq = response.data.RESULT['url'].split("seq=")[1];
                    //console.log(response.data.RESULT['url'])
                    console.log('POST');
                    //console.log(seq)
                } catch(e){
                    console.log('POST Error');
                }
            }
            async function getLoadedData(){
                try{
                    const response2 = await axios.get(`https://www.career.go.kr/inspct/api/psycho/report?seq=${seq}`);
                    setUserData(response2['data'])
                    console.log('GET')
                }catch(e){
                    console.log('GET Error');
                }

            }
            await loadData();
            await getLoadedData();
            console.log(userData);

        }
        load();
    },[ ])
    
    return(
        <div>
            <div>
                <h1>직업가치관검사 결과표</h1>
                
            </div>

            <FinishButton
                onClick={(event) => {
                    alert('검사가 종료되었습니다. 이용해 주셔서 감사합니다.');
                    history.push("/")
                }}
            >처음으로</FinishButton>
        </div>
    )
}
const FinishButton = styled.button`
text-align: center;
border: 0;
border-radius: 10px;
width: 20vw;
background: #96A5FF;
color: #fff;
font-size: 30px;
`;
export default EndPage;



