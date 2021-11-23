import React,{useState} from 'react';
import styled from "styled-components";

const MainPage = ({history}) =>{

  const [inputs, setInputs] = useState({
    name:"",
    gender:"",
  });
  const {name, gender} = inputs;

    return(
            
            <div className="App">
            {/* 유저 정보 입력 */}
              
                <h1>직업가치관검사</h1><br />
                
                <div>
                  <label>이름</label><br/>
                  <input
                  type="text"
                  name="name"
                  placeholder="이름"
                  value={name}
                  onChange={(e) => {
                    setInputs({
                      ...inputs,
                      [e.target.name]:e.target.value
                      // https://dubaiyu.tistory.com/80
                    });
                  }} />
                  <br /><br />
                </div>

                <div>
                  <label>성별</label><br />
                  <input
                  type="radio"
                  value="남"
                  name="gender"
                  onChange={(e) => {
                    setInputs({
                      ...inputs,
                      [e.target.name]:e.target.value
                    })
                  }}/>
                  <label for="male">남자</label><br />
                  <input
                  type="radio"
                  value="여"
                  name="gender"
                  onChange={(e) => {
                    setInputs({
                      ...inputs,
                      [e.target.name]:e.target.value
                    })
                  }}/>
                  <label for="female">여자</label><br />
                </div><br /><br />
            
                <StartButton 
                type = "button"
                //disabled={name.length===0 || gender.length===0}
                onClick={(e) => {

                  if (name.length!==0 && gender.length!==0) {
                    alert(`${name}(${gender})님 심리 검사를 시작하겠습니다!!😎`);
                    history.push("/ServiceEx")
                  }
                  else if(name.length===0){
                    alert("이름을 입력해 주세요.😝")
                  }
                  else{
                    alert("성별을 입력해 주세요.😝")
                  }
                  

                }}>검사시작</StartButton>
                
                
            </div>
        
    )

};
const StartButton = styled.button`
    text-align: center;
    border: 0;
    border-radius: 10px;
    width: 20vw;
    background: #96A5FF;
    color: #fff;
    font-size: 30px;
`;
export default MainPage;