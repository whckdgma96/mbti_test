import React,{useState} from 'react';

const MainPage = ({history}) =>{

  const [inputs, setInputs] = useState({
    name:"",
    gender:"",
  });
  const {name, gender} = inputs;

    return(
            
            <div className="App">
            {/* 유저 정보 입력 */}
              
                <h1>직업가치관검사</h1>
                
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
                  value="male"
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
                  value="female"
                  name="gender"
                  onChange={(e) => {
                    setInputs({
                      ...inputs,
                      [e.target.name]:e.target.value
                    })
                  }}/>
                  <label for="female">여자</label><br />
                </div>
            
                <button 
                type = "button"
                //disabled={name.length===0 || gender.length===0}
                onClick={(e) => {

                  if (name.length!==0 && gender.length!==0) {
                    alert('심리 검사를 시작하겠습니다!!😎');
                    history.push("/ServiceStart")
                  }
                  else if(name.length===0){
                    alert("이름을 입력해 주세요.😝")
                  }
                  else{
                    alert("성별을 입력해 주세요.😝")
                  }
                  

                }}>이동하기</button>
                
                
            </div>
        
    )

};

export default MainPage;