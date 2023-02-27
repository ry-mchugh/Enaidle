import { Navigate, BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Listings from "./pages/ListingsFeed";
import { useAuthContext } from "./hooks/useAuthContext";

const App = () => {
  const {orgUser} = useAuthContext()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={!orgUser ? <Signup /> : <Navigate to="/listings" />} />
        <Route path="/login" element={!orgUser ? <Login /> : <Navigate to="/listings" /> } />
        <Route path="/listings" element={orgUser ? <Listings /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
