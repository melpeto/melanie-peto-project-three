import './App.css';
import { Routes, Route} from 'react-router-dom';
import Creation from './Creation';
import DisplayNewPoll from './DisplayNewPoll';
import AllPolls from './AllPolls';

function App() {

  return (
    <div className="App">
      <>
        <Routes>
          <Route path="/" element={
            <div className="App">
              <h1>project 3 voting app</h1>
              <Creation />
            </div>
          } />
          <Route path="/:pollNumber" element={<DisplayNewPoll/>}/>
          <Route path="/allpolls" element={<AllPolls />}/>
        </Routes>
      </>
      
      
    </div>
  );
}

export default App;
