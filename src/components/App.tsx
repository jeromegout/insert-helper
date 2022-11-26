import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Board from "./Board";
import BoardInitializer from "./BoardInitializer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BoardInitializer />} />
        <Route path="/game/:slug" element={<Board />} />
      </Routes>
    </Router>
  );
}

export default App;
