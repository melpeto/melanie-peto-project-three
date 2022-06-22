import './App.css';
import { Routes, Route} from 'react-router-dom';
import Header from './Header';
import Creation from './Creation';
import DisplayNewPoll from './DisplayNewPoll';
import AllPolls from './AllPolls';
import Footer from './Footer';

function App() {

  return (
    <div className="App">

        <Routes>
          <Route path="/" element={
            <div className="App">
              <Header />
              <Creation />
            </div>
          } />
          <Route path="/:pollNumber" element={<DisplayNewPoll/>}/>
          <Route path="/allpolls" element={<AllPolls />}/>
        </Routes>

        <Footer />

    </div>
  );
}

export default App;
