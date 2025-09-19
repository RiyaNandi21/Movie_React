import { HashRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./component/Pagess/login/loginForm";
import First from "./component/Pagess/Signup/First";
import Next from "./component/Pagess/Signup/Next";
import DashBoard from "./component/Pagess/DashBoard/DashBoard";
import MovieDetails from "./component/Pagess/Page/MovieDetails";
import MovieEditPage from "./component/Pagess/Page/MovieEditPage";
import ProtectedRoute from "./component/ProtectedRoute";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<First />} />
        <Route path="/Next" element={<Next />} />
        {/* <Route path="/Dashboard" element={<DashBoard />} />
        <Route path="/dashboard/movies/:id" element={<MovieDetails />}/>
        <Route path="/movies/:id/edit" element={<MovieEditPage />} /> */}
        
        <Route path="/Dashboard" element={
          <ProtectedRoute><DashBoard /></ProtectedRoute>
        }
       />
       <Route path="/dashboard/movies/:id" element={
        <ProtectedRoute><MovieDetails /></ProtectedRoute>
       }
       />
       <Route path="/movies/:id/edit" element={
        <ProtectedRoute><MovieEditPage /></ProtectedRoute>
       }
      />
      </Routes>
    </Router>
  );
}

export default App;
