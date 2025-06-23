import "./App.css";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from "./components/navbar";
import Auth from "./pages/auth/Auth";
import Home from "./pages/home/Home";
import Footer from "./components/footer"
import RegisterPage from "./pages/auth/RegisterPage";
import SaveMovies from "./pages/savedMovies/SaveMovies";
import TvSeries from "./pages/tv-series/TvSeries";

function App() {
  return <div>
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/auth" element={<Auth/>}/>
        <Route path="/rated" element={<SaveMovies/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/tv-series" element={<TvSeries/>}/>
      </Routes>
      <Footer/>
    </Router>
  </div>;
}

export default App;
