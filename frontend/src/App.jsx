import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PostPage from "./pages/PostPage";
import EditPage from "./pages/EditPage";
import SettingsPage from "./pages/SettingsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post" element={<PostPage />} />
        <Route path="/edit" element={<EditPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
