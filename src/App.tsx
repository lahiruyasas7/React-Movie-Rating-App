import "./App.css";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from "./components/navbar";
import Auth from "./pages/auth/Auth";

function App() {
  return <div>
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<div className="font-bold font-9xl underline">Home</div>}/>
        <Route path="/auth" element={<Auth/>}/>
        <Route path="/rated" element={<h1>Rated</h1>}/>
      </Routes>
    </Router>
  </div>;
}

export default App;
