import "./App.css";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return <div>
    <Router>
      <Routes>
        <Route path="/" element={<h1>Home</h1>}/>
        <Route path="/" element={<h1>Auth</h1>}/>
        <Route path="/" element={<h1>Rated</h1>}/>
      </Routes>
    </Router>
  </div>;
}

export default App;
