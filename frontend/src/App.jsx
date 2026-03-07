import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PostPage from "./pages/PostPage";
import EditPage from "./pages/EditPage";
import SettingsPage from "./pages/SettingsPage";
import AdminGuard from "./components/AdminGuard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/post"
          element={
            <AdminGuard>
              <PostPage />
            </AdminGuard>
          }
        />
        <Route
          path="/edit"
          element={
            <AdminGuard>
              <EditPage />
            </AdminGuard>
          }
        />
        <Route
          path="/settings"
          element={
            <AdminGuard>
              <SettingsPage />
            </AdminGuard>
          }
        />{" "}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
