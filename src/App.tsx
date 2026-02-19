import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainTaskDashboard from "./pages/MainTaskDashboard";
import MainLayout from "./pages/MainLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<MainTaskDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
