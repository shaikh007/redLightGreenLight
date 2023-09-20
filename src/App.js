import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import GreenLightRedLight from "./Component/GreenLightRedLight/GreenLightRedLight";
import RegistrationForm from "./Component/RegistrationForm/RegistrationForm";
import LeaderBoard from "./Component/LeaderBoard/LeaderBoard";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [level, setLevel] = useState("");

  const [startGame, setStartGame] = useState(false);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(40);
  const [gameOver, setGameOver] = useState(false);
  const [clicks, setClicks] = useState(10);

  const [scores, setScores] = useState([]);
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <RegistrationForm
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              number={number}
              setNumber={setNumber}
              level={level}
              setLevel={setLevel}
              setClicks={setClicks}
            />
          }
        />
        <Route
          path="gamearea"
          element={
            <GreenLightRedLight
              startGame={startGame}
              setStartGame={setStartGame}
              score={score}
              setScore={setScore}
              timeRemaining={timeRemaining}
              setTimeRemaining={setTimeRemaining}
              gameOver={gameOver}
              setGameOver={setGameOver}
              scores={scores}
              setScores={setScores}
              clicks={clicks}
              setClicks={setClicks}
            />
          }
        />
        <Route
          path="gamearea/leaderBoard"
          element={
            <LeaderBoard
              scores={scores}
              setScores={setScores}
              score={score}
              setScore={setScore}
              name={name}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
