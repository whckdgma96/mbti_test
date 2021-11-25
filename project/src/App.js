import './App.css';
import React, {useState, useEffect} from 'react';
import MainPage from './components/MainPage';
import ServiceEx from './components/ServiceEx';
import ResultPage from './components/ResultPage';
import ServiceStart from './components/ServiceStart';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  
  return (
    <div className="App">
      <Router>
        {/* 상단 정보 */}
        <header className="navigation">
                <div>직업 심리 검사 서비스</div>
        </header>
        <Route path="/" exact component = {MainPage} />
        <Route path="/ServiceEx" render={(props) =><ServiceEx {...props} />}/> 
        <Route path="/ServiceStart" render={(props) =><ServiceStart {...props} />}/> />
        <Route path="/ResultPage" component = {ResultPage} />
      </Router>
    </div>
    
  );
}

export default App;
