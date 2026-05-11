import { BrowserRouter, Routes, Route } from "react-router-dom";
import CalorieTracker from "./CaloriesTracker";
import CalorieTracker2 from "./calorieTracker";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<CalorieTracker />} />

        <Route path="/calories" element={<CalorieTracker2 />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;


