import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import Navbar from "./components/navbar";
import Auth from "./pages/auth/Auth";
import Home from "./pages/home/Home";
import Footer from "./components/footer";
import RegisterPage from "./pages/auth/RegisterPage";
import SaveMovies from "./pages/savedMovies/SaveMovies";
import TvSeries from "./pages/tv-series/TvSeries";
import ProtectedRoute from "./components/ProtectedRoute";
import Page404 from "./pages/page404/Page404";
import UserProfile from "./pages/user-profile/UserProfile";
import GoogleSuccess from "./pages/auth/GoogleSuccess";
import ChatPage from "./pages/chat/Chat";
import ChatListPage from "./pages/chat/ChatListpage";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/rated"
            element={
              <ProtectedRoute>
                <SaveMovies />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/tv-series"
            element={
              <ProtectedRoute>
                <TvSeries />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <Page404 />
              </ProtectedRoute>
            }
          />
          <Route path="/google-success" element={<GoogleSuccess />} />
          <Route path="/chat-list-page" element={<ChatListPage />} />
          <Route path="/chat/:targetUserId" element={<ChatPageWrapper />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

function ChatPageWrapper() {
  const { targetUserId } = useParams();
  return <>{targetUserId && <ChatPage targetUserId={targetUserId} />}</>;
}
