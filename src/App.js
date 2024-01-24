import { Route, Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homee from "./pages/Homee";
import { AuthContextProvider } from "./context/AuthContext";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Account from "./pages/Account";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homee />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/account" 
          element={
            // here we are making the account protected
          <ProtectedRoute>
          <Account/>
          </ProtectedRoute>
          
          }/>

        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
