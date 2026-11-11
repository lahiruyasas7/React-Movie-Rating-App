import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";
import { RootState } from "./redux/reducers";
import LoaderOverlay from "./components/CustomLoader";
import { lazy, Suspense } from "react";

// Lazy-loaded route components
const Home = lazy(() => import("./pages/home/Home"));
const Auth = lazy(() => import("./pages/auth/Auth"));
const RegisterPage = lazy(() => import("./pages/auth/RegisterPage"));
const SaveMovies = lazy(() => import("./pages/savedMovies/SaveMovies"));
const TvSeries = lazy(() => import("./pages/tv-series/TvSeries"));
const UserProfile = lazy(() => import("./pages/user-profile/UserProfile"));
const UserVideos = lazy(() => import("./pages/user-videos/UserVideos"));
const AddNewVideo = lazy(() => import("./pages/user-videos/AddNewVideo"));
const PopularMovies = lazy(() => import("./pages/popular-movies/PopularMovies"));
const TopRatedMovies = lazy(() => import("./pages/top-rated-movies/TopRatedMovies"));
const ChatPage = lazy(() => import("./pages/chat/Chat"));
const ChatListPage = lazy(() => import("./pages/chat/ChatListpage"));
const Page404 = lazy(() => import("./pages/page404/Page404"));
const GoogleSuccess = lazy(() => import("./pages/auth/GoogleSuccess"));

// Route-level Suspense fallback - lightweight skeleton
function RouteSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="animate-pulse space-y-4 w-3/4 max-w-3xl">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-[2/3] bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Wrapper for dynamic chat route
function ChatPageWrapper() {
  const { targetUserId } = useParams();
  return <>{targetUserId && <ChatPage targetUserId={targetUserId} />}</>;
}

function App() {
  const loader = useSelector((state: RootState) => state.reducer.loader);
  return (
    <div>
      {loader && <LoaderOverlay />}
      <Router>
        <Navbar />
        <Routes>
          {/* Public routes with route-level Suspense */}
          <Route
            path="/"
            element={
              <Suspense fallback={<RouteSkeleton />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/auth"
            element={
              <Suspense fallback={<RouteSkeleton />}>
                <Auth />
              </Suspense>
            }
          />
          <Route
            path="/register"
            element={
              <Suspense fallback={<RouteSkeleton />}>
                <RegisterPage />
              </Suspense>
            }
          />
          <Route path="/google-success" element={<GoogleSuccess />} />

          {/* Protected routes with route-level Suspense */}
          <Route
            path="/rated"
            element={
              <ProtectedRoute>
                <Suspense fallback={<RouteSkeleton />}>
                  <SaveMovies />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/tv-series"
            element={
              <ProtectedRoute>
                <Suspense fallback={<RouteSkeleton />}>
                  <TvSeries />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-profile"
            element={
              <ProtectedRoute>
                <Suspense fallback={<RouteSkeleton />}>
                  <UserProfile />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-videos"
            element={
              <ProtectedRoute>
                <Suspense fallback={<RouteSkeleton />}>
                  <UserVideos />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-new-video"
            element={
              <ProtectedRoute>
                <Suspense fallback={<RouteSkeleton />}>
                  <AddNewVideo />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/popular-movies"
            element={
              <ProtectedRoute>
                <Suspense fallback={<RouteSkeleton />}>
                  <PopularMovies />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/top-rated-movies"
            element={
              <ProtectedRoute>
                <Suspense fallback={<RouteSkeleton />}>
                  <TopRatedMovies />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat-list-page"
            element={
              <ProtectedRoute>
                <Suspense fallback={<RouteSkeleton />}>
                  <ChatListPage />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat/:targetUserId"
            element={
              <ProtectedRoute>
                <Suspense fallback={<RouteSkeleton />}>
                  <ChatPageWrapper />
                </Suspense>
              </ProtectedRoute>
            }
          />

          {/* 404 - no ProtectedRoute, accessible to all */}
          <Route
            path="*"
            element={
              <Suspense fallback={<RouteSkeleton />}>
                <Page404 />
              </Suspense>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
