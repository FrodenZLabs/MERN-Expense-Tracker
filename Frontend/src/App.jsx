import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProvider from "./context/UserContext";
import Root from "./utils/root";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signUp" exact element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
