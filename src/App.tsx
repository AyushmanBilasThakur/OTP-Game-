import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainMenu from "./pages/MainMenu";
import Game from "./pages/Game";
import store from "./store";
import { Provider } from "react-redux";
import GameOver from "./pages/GameOver";
import About from "./pages/About";

function App() {
  return (
    <div className="container">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainMenu />} />
            <Route path="/game" element={<Game />} />
            <Route path="/about" element={<About />} />
            <Route path="/game-over" element={<GameOver />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
