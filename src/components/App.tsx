import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Board from "./Board";
import BoardInitializer from "./BoardInitializer";
import Games from "./Games";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Games />} />
        <Route path="/new" element={<BoardInitializer />} />
        <Route path="/games/:slug" element={<Board />} />
      </Routes>
    </Router>
  );
}

export default App;
