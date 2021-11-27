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
    console.log(userForm)

    const [jsonData, setJsonData] = useState({})
    const [jobInfo, setJobInfo] = useState([])
    const [majorInfo, setMajorInfo] = useState([])


    //유저 api 값 추출
    useEffect(() => {
        async function load(){
            let seq = "";
            let Num1 = "";
            let Num2 = "";
            async function loadData(){
                try{
                    const response = await axios.post(
                        `http://www.career.go.kr/inspct/openapi/test/report?apikey=b898f00caa8bcc71c4fc19598b84e9e1&qestrnSeq=6`, userForm
                    );
                    //seq값 가져오기
                    console.log(response.data.RESULT['url'])
                    seq = response.data.RESULT['url'].split("seq=")[1];
                    console.log('POST 불러오기');
                    //console.log(seq) NTU2MTg5MjA
                } catch(e){
                    console.log('POST Error');
                }
            }
            async function loadJsonData(){
                try{
                    const response2 = await axios.get(`https://www.career.go.kr/inspct/api/psycho/report?seq=${seq}`);
                    setJsonData(response2['data'])
                    const wonScore = response2['data'].result['wonScore'];
                    const getMaxNum = [];
                    for (let i of wonScore.split(" ")){
                        let wonScoreValue = i.split("=")
                        getMaxNum.push([parseInt(wonScoreValue[1]),wonScoreValue[0]])
                    }
                    let maxNums = []
                    //젤높은2개 추출
                    for (let i = 0; i < getMaxNum.length; i++){
                        if (maxNums.length < 2){
                            maxNums.push(getMaxNum[i])
                            maxNums.sort()
                        } else {
                            for (let j = 0; j < maxNums.length; j++){
                                if (maxNums[j][0] < getMaxNum[i][0]){
                                    maxNums.shift() //첫요소제거 & 반환
                                    maxNums.push(getMaxNum[i])
                                    maxNums.sort()
                                }
                            }
                        }
                    }
                    Num1 = maxNums[1][1];
                    Num2 = maxNums[0][1];
                    console.log(Num1, Num2);
                    console.log('JSON DATA GET요청')
                }catch(e){
                    console.log('GET Error');
                }

            }
            async function loadJobInfo(){
                try {
                  const response3 = await axios.get(`https://inspct.career.go.kr/inspct/api/psycho/value/jobs?no1=${Num1}&no2=${Num2}`);
                  setJobInfo(response3['data'])
                } catch (e) {
                  console.log("관련 직종 GET Error")
                }
            }
            async function loadMajorInfo(){
                try {
                  const response4 = await axios.get(`https://inspct.career.go.kr/inspct/api/psycho/value/majors?no1=${Num1}&no2=${Num2}`);
                  setMajorInfo(response4['data'])
                } catch (e) {
                  console.log("관련 학과 GET Error")
                }
            }
            await loadData();
            await loadJsonData();
            await loadJobInfo();
            await loadMajorInfo();
        }
        load();
    },[ ])
// 직업 관련 차트
    function ShowJobInfo(){
        const graduateCollege = jobInfo
        //배열의 예시 [1259,"마술사",2] 123 = 전문대, 4 = 대, 5 = 대학원
        .filter((item) => {
            return item[2] === 1 || item[2] === 2 || item[2] === 3
        })
        .map((item) => {
            return item[1]
        })
        .join(", ");
    
        const graduateUniv = jobInfo
        .filter((item) => {
            return item[2] === 4
        })
        .map((item) => {
            return item[1]
        })
        .join(", ");
    
        const graduateGrad = jobInfo
        .filter((item) => {
            return item[2] === 5
        })
        .map((item) => {
            return item[1]
        })
        .join(", ");

        return (
            <>
                <h3>종사자 평균 학력별</h3>
                <table>
                    <th className="job-col1">분야</th>
                    <th className="job-col2">직업명</th>
                    <tr>
                        <td>전문대졸</td>
                        <td>{graduateCollege}</td>
                    </tr>
                    <tr>
                        <td>대졸</td>
                        <td>{graduateUniv}</td>
                    </tr>
                    <tr>
                        <td>대학원졸</td>
                        <td>{graduateGrad}</td>
                    </tr>
                </table>
            </>
        )
    }
//직업
function ShowMajorInfo(){
    return (
    <>
        <h3>종사자 평균 전공별</h3>
        <table>
            <th className="major-col1">분야</th>
            <th className="major-col2">직업명</th>
            <tr>
                <td>계열무관</td>
                <td>
                    {majorInfo
                    .filter((item) => {
                        return item[2] === 0
                    })
                    .map((item) => {
                        return item[1]
                    })
                    .join(", ")}
                </td>
            </tr>

            <tr>
                <td>인문</td>
                <td>
                {majorInfo
                    .filter((item) => {
                        return item[2] === 1
                    })
                    .map((item) => {
                        return item[1]
                    })
                    .join(", ")}
                </td>
            </tr>

            <tr>
                <td>사회</td>
                <td>
                {majorInfo
                    .filter((item) => {
                        return item[2] === 2
                    })
                    .map((item) => {
                        return item[1]
                    })
                    .join(", ")}
                </td>
            </tr>

            <tr>
                <td>교육</td>
                <td>
                {majorInfo
                    .filter((item) => {
                        return item[2] === 3
                    })
                    .map((item) => {
                        return item[1]
                    })
                    .join(", ")}
                </td>
            </tr>
            
            <tr>
                <td>공학</td>
                <td>
                {majorInfo
                    .filter((item) => {
                        return item[2] === 4
                    })
                    .map((item) => {
                        return item[1]
                    })
                    .join(", ")}
                </td>
            </tr>

            <tr>
                <td>자연</td>
                <td>
                    {majorInfo
                        .filter((item) => {
                    return item[2] === 5
                    })
                        .map((item) => {
                    return item[1]
                    })
                        .join(", ")}
                </td>
            </tr>

            <tr>
                <td>의학</td>
                <td>
                {majorInfo
                    .filter((item) => {
                        return item[2] === 6
                    })
                    .map((item) => {
                        return item[1]
                    })
                    .join(", ")}
                </td>
            </tr>

            <tr>
                <td>예체능</td>
                <td>
                {majorInfo
                    .filter((item) => {
                        return item[2] === 7
                    })
                    .map((item) => {
                        return item[1]
                    })
                    .join(", ")}
                </td>
            </tr>
        </table>
    </>
)
    }
// 차트 ]
    function ShowChart(){
        const wonScore = jsonData.result['wonScore'];
        const wonScoreList = [];
        const wonScoreData = wonScore
            .split(" ").map((item)=>{return item.split("=")[1]}).forEach((item)=>{wonScoreList.push(item)})
        return (
          <div className="chartBarContainer">
            { wonScoreList.map((item) => {
                    return(
                    <div className="barContainer">
                        <ChartBar num={parseInt(item)}>
                            <p>{item}</p>
                        </ChartBar>
                    </div>
                    )
              }) }
          </div>
          );
    }


    
    return (
        
        <div className="result">
            <div className="inner">
              <div className="title">
                <h1>직업가치관검사 결과표</h1>
              </div>
              
              { jsonData && Object.keys(jsonData).length > 0 ?
              <>
              <table>
                <th>이름</th>
                <th>성별</th>
                <th>검사일</th>
                <tr>
                  <td>{userForm.name}</td>
                  <td>{userForm.gender === "100323" ? "남" : "여"}</td>
                  <td>{jsonData.result['endDtm'].slice(0,10).split("-").join("-")}</td>
                </tr>
              </table>
              <div className="jobValue">
                <h2>직업가치관 결과</h2>
                <ShowChart />
                <div className="category">
                  <p>능력발휘</p>
                  <p>자율성</p>
                  <p>보수</p>
                  <p>안정성</p>
                  <p>사회적 인정</p>
                  <p>사회봉사</p>
                  <p>자기계발</p>
                  <p>창의성</p>
                </div>
              </div>
              </>
              : undefined}
              <div className="relativeJob">
                <h2>가치관과 관련이 높은 직업</h2>
                <div className="jobInfo">
                   <ShowJobInfo />
                </div>
                <div className="majorInfo">
                   <ShowMajorInfo />
                </div>
              </div>
              <div className="btnBox">
              <FinishButton
                onClick={(e) => {
                    alert('검사가 종료되었습니다. 이용해 주셔서 감사합니다.');
                    history.push("/")
                }}
                >처음으로</FinishButton>
              </div>
            </div>
          </div>
        
    );
}
    

const ChartBar = styled.div`
  width: 100%;
  height: ${props => props.num*10}%;
  background-color: #B2ACFA;
  position: absolute;
  bottom: 0;
  left: 70%;

`;
const BackButton = styled.button`
    float:left;
    border: 0;
    background: white;
`;
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



