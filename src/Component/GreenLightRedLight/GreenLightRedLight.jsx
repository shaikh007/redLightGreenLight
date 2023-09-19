import React, { useEffect } from "react";
import "../GreenLightRedLight/greenlighredlight.css";
import { useNavigate } from "react-router-dom";

const GreenLightRedLight = ({
  startGame,
  setStartGame,
  score,
  setScore,
  timeRemaining,
  setTimeRemaining,
  gameOver,
  setGameOver,
  scores,
  setScores,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (startGame) {
      const interval = setInterval(() => {
        setTimeRemaining(timeRemaining - 1);
        if (timeRemaining === 0) {
          setGameOver(true);
          setTimeRemaining(0);
        }
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
    const savedData = JSON.parse(localStorage.getItem("leaderboardData")) || [];
    setScores(savedData);
  }, [startGame, timeRemaining]);

  const handleClick = () => {
    if (gameOver) {
      return;
    }

    if (startGame && boxColor === "green") {
      setScore(score + 1);
    } else if (startGame && boxColor === "red") {
      setGameOver(true);
    }
  };

  const startGameHandler = () => {
    setStartGame(true);
  };
  const handleRestart = () => {
    window.location.reload();
  };

  const boxColor = Math.random() > 0.5 ? "green" : "red";

  // leaderBoard
  console.log(scores);
  const addDataToLeaderboard = (newData) => {
    const updatedData = [...scores, newData];
    setScores(updatedData);
    localStorage.setItem("leaderboardData", JSON.stringify(updatedData));
    localStorage.setItem("scores", score);
  };

  const handleLeaderBoard = () => {
    const newData = {
      name: localStorage.getItem("Name"),
      scored: localStorage.getItem("scores"),
    };
    addDataToLeaderboard(newData);
    navigate("leaderBoard");
  };

  return (
    <div className="container">
      <div className="backshadow">
        <div className="welcome">
          <h1>WellCome AlphaGreek</h1>
        </div>
        <div className="time-level-profile">
          <div className="time">
            <h4>Timer : {timeRemaining} seconds</h4>
            <div>
              <div class="box-canvas">
                <div class="frame">
                  <div class="top"></div>
                  <div class="bottom">
                    <div class="drip"></div>
                    <div class="blob"></div>
                    <div class="glass"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="levelType">
            <h4>Difficulty : {localStorage.getItem("Difficulty Level")}</h4>
          </div>
          <div className="profile">
            <h4>Hello {localStorage.getItem("Name")}</h4>
          </div>
        </div>
        <div className="score-leaderBoard">
          <div className="score">
            <h4>High Score : {score} </h4>
          </div>
          <div className="LeaderBoard" onClick={handleLeaderBoard}>
            <h4>LeaderBoard</h4>
          </div>
        </div>
        <div className="gamebox">
          <div
            className="box"
            style={{ backgroundColor: boxColor }}
            onClick={handleClick}
          >
            {gameOver ? (
              <div className="game-over">Game Over</div>
            ) : (
              <div>Click Me</div>
            )}
          </div>
        </div>

        <div className="startbtn">
          {gameOver ? (
            <button onClick={handleRestart}>Restart Game</button>
          ) : (
            <button onClick={startGameHandler}>Start Game</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GreenLightRedLight;
