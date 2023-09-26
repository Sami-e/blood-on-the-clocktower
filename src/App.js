import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GamePageEdit from "./pages/GamePageEdit";
import GamePageView from "./pages/GamePageView";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="games/view/:id" element={<GamePageView/>}/>
        <Route path="games/edit/:id" element={<GamePageEdit/>}/>
      </Routes>
    </BrowserRouter>
  );
}