import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/layout/Header";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <HomePage />
            </ProtectedRoutes>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}
export function ProtectedRoutes(props) {
  const { user } = useAuthContext();
  return user ? props.children : <Header />;
}
export default App;
