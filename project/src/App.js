import './css/App.css';
import './css/EndPage.css';
import MainPage from './components/MainPage';
import ServiceEx from './components/ServiceEx';
import ResultPage from './components/ResultPage';
import ServiceStart from './components/ServiceStart';
import EndPage from './components/EndPage';
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
        <Route path="/ServiceStart" render={(props) =><ServiceStart {...props} />}/>
        <Route path="/ResultPage" component = {ResultPage} />
        <Route path="/EndPage" component = {EndPage} />

      </Router>
    </div>
    
  );
}

export default App;
