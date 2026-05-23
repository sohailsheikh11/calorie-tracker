import { BrowserRouter, Routes, Route } from "react-router-dom";
import CalorieTracker from "./CaloriesTracker";
import AuthPages from "./pages/AuthPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { CalorieProvider } from "./context/CalorieContext";

function App() {
  return (
    <CalorieProvider>

      <BrowserRouter>
      <Routes>

        <Route path="/" element={
          <ProtectedRoute>
            <CalorieTracker />
          </ProtectedRoute>} />

        
        <Route path="/auth" element={<AuthPages />} />

      </Routes>
    </BrowserRouter>
    </CalorieProvider>
  );
}

export default App;


