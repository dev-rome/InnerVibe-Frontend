import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      <main>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
            </Route>
          </Routes>
        </AuthProvider>
      </main>
    </>
  );
}

export default App;
