import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styled from "styled-components";
import ProgressBar from 'react-bootstrap/ProgressBar';
import ReactPaginate from "react-paginate";
import './page.css';
const ServiceStart = ({history}) =>{
    const inputs = location.state.inputs; //state 전달용
    const [exData, setExData] = useState([]);
    const [progressbar, setProgressbar] = useState(0);
    const [saveData, setSaveData] = useState({});
    const [pageNum, setPageNum] = useState(0);
    const [btnDisable, setBtnDisable] = useState(true);

    const DataInPage = 5;
    const pages = pageNum * DataInPage;


    const dataSet = (e) =>{
        let keyname = e.target.name;
        const {value} = e.target;

        setSaveData({
            ...saveData,
            [keyname]:value
        })
        if(Object.keys(saveData).length ===27){
            return(
                setProgressbar(100),
                setBtnDisable(false)
            )
        } else{
            return 
        }
    }
    console.log(Object.keys(saveData).length)


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

    const displayDatas = exData
        .slice(pages,pages+DataInPage)
        .map((item) => {
            return (
                <div>
                    <TestSheet>
                        <h7>No.{item.qitemNo} {item.question}</h7>
                        <div>
                            <label for={item.answer01}>
                                <input type="radio" name={item.qitemNo} value="0" onChange={dataSet}>
                                </input>{item.answer01}
                            </label>
                            
                            <label for={item.answer02}>
                                <input type="radio" name={item.qitemNo} value="1" onChange={dataSet}>
                                </input>{item.answer02}
                            </label>
                        </div>
                    </TestSheet>
                </div>
            )
        });
    const pageCount = Math.ceil(exData.length / DataInPage); //ceil는 반올림

    const onPageChange = ({selected}) => {
        setPageNum(selected);
    };
    console.log(pageNum)


    return (
        <div>
            <BackButton onClick={ () => {history.goBack()} }> 👈 </BackButton><br />
            <h1>검사 진행</h1>
            <div>
                <p>{progressbar}%</p>
                <ProgressBar now={progressbar} label={`${progressbar}%`} />
                
            </div>
            <br/>
            <h5>직업과 관련된 두개의 가치 중에서 자기에게 더 중요한 가치에 표시하세요.<br/>
                가치의 뜻을 잘 모르겠다면 문항 아래에 있는 가치의 설명을 확인해보세요.</h5><br />
            <div>
                {displayDatas}<br/>
                {/* 페이지네이션(참고)   https://www.npmjs.com/package/react-paginate */}
                <ReactPaginate 
                    pageCount = {pageCount}
                    onPageChange = {onPageChange}
                    pageClassName="pagination"
                    theme="bottom-border"
                    
                    previousLabel = {
                        <PriviousButton
                            onClick={(e) => {
                                setProgressbar(progressbar-18)
                                if (progressbar === 0){
                                    history.goBack()
                                }else{
                                    return ;
                                }
                            }}>이전</PriviousButton>}

                    nextLabel = {
                        <NextButton
                            disabled={btnDisable && Object.keys(saveData).length % 5 !== 0 || pageNum * 5 == Object.keys(saveData).length}
                            onClick={(e) => {
                                if (progressbar === 100){
                                    history.push("/ResultPage")
                                    alert('검사가 완료되었습니다. 결과를 기다려 주십시오.🧐');
                                }else{
                                    setProgressbar(progressbar+18)
                                }
                            }}>{progressbar === 100 ? "결과보기" : "다음"}</NextButton>}
                />
            </div>
        </div>
        
    );
};
const BackButton = styled.button`
    float:left;
    border: 0;
    background: white;
`;

const PriviousButton = styled.button`
    text-align: center;
    border: 0;
    border-radius: 10px;
    width: 20vw;
    background: #96A5FF;
    color: #fff;
    font-size: 30px;
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
const TestSheet = styled.div`
    background-color: #E1F6FA;
    width: 70%;
    height:50%
    border-radius: 3px;
    border : 100px;
    display: block;
    margin : auto;
`;
export default ServiceStart;