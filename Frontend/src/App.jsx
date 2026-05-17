import { BrowserRouter, Routes, Route } from "react-router-dom";
import CalorieTracker from "./CaloriesTracker";
import CalorieTracker2 from "./calorieTracker";
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

        <Route path="/calories" element={<CalorieTracker2 />} />
        <Route path="/auth" element={<AuthPages />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;


