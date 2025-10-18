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
import { useSelector } from "react-redux";
import { RootState } from "./redux/reducers";
import LoaderOverlay from "./components/CustomLoader";
import UserVideos from "./pages/user-videos/UserVideos";
import AddNewVideo from "./pages/user-videos/AddNewVideo";
import PopularMovies from "./pages/popular-movies/PopularMovies";

function App() {
  const loader = useSelector((state: RootState) => state.reducer.loader);
  return (
    <div>
      {loader && <LoaderOverlay />}
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
            path="/user-videos"
            element={
              <ProtectedRoute>
                <UserVideos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-new-video"
            element={
              <ProtectedRoute>
                <AddNewVideo />
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
          <Route
            path="/popular-movies"
            element={
              <ProtectedRoute>
                <PopularMovies />
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
