import { BrowserRouter, Routes, Route } from "react-router-dom";
import CalorieTracker from "./CaloriesTracker";
import AuthPages from "./pages/AuthPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={
          <ProtectedRoute>
            <CalorieTracker />
          </ProtectedRoute>} />

        
        <Route path="/auth" element={<AuthPages />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;


