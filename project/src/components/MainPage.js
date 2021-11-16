import React,{useState} from 'react';

const MainPage = () =>{
    const start = (event) =>{
        event.preventDefault();
        alert('심리 검사를 시작하겠습니다.');
      }; 
      const [username,setUsername] = useState('');
    return(
        <div className="App">
      <header className="navigation">
        <div>직업 심리 검사 서비스</div>
      </header>
      <form onSubmit={start}>
        <h2>직업가치관검사</h2>
        <label>이름</label><br/>
        <input placeholder="이름" value={username} onChange={(e) => setUsername(e.target.value)} /><br /><br />
        <label>성별</label><br />
        <input id="male" type="radio"  value="남성" name="ss" />
        <label for="male">남자</label><br />
        
        <input id="female" type="radio" checked value="여성" name="ss" />
        <label for="female">여자</label><br /><br />
        <button type="submit">검사시작</button>
      </form>
    </div>
    )

};

export default MainPage;