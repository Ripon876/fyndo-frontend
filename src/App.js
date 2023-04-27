import { Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import SignUp from "./components/signup/SignUp";
import Dashboard from "./components/dashboard/Dashboard";
import MessagesPage from "./pages/MessagesPage";
import ProfilePage from "./pages/ProfilePage";
import SettingPage from "./pages/SettingPage";
import AuthProtected from "./auth/AuthProtected";
import UnProtected from "./auth/UnProtected";
import NotFound from "./components/notfound/NotFound";

function App() {
  return (
    <Routes>
      <Route element={<AuthProtected />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/messages/:id" element={<MessagesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingPage />} />
      </Route>
      <Route element={<UnProtected />}>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
