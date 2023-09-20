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
  clicks,
  setClicks,
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
  }, [startGame, timeRemaining, setGameOver, setScores, setTimeRemaining]);

  const handleClick = () => {
    if (gameOver) {
      return;
    }

    if (startGame && boxColor === "green") {
      setScore(score + 1);
      setClicks(clicks - 1);
    } else if (startGame && boxColor === "red") {
      setGameOver(true);
    }
    if (clicks === 0) {
      setStartGame(false);
      setClicks(0);
    }
  };

  const startGameHandler = () => {
    setStartGame(true);
  };
  const handleRestart = () => {
    setTimeRemaining(40);
    setGameOver(false);
    setScore(0);
    setStartGame(false);
    if (localStorage.getItem("Difficulty Level") === "Easy") {
      setClicks(10);
    } else if (localStorage.getItem("Difficulty Level") === "Medium") {
      setClicks(15);
    } else if (localStorage.getItem("Difficulty Level") === "Hard") {
      setClicks(20);
    }
  };

  const boxColor = Math.random() > 0.5 ? "green" : "red";

  // leaderBoard
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

  const timeColor = timeRemaining <= 10 ? "red" : "green";

  return (
    <div className="container">
      <div className="backshadow">
        <div className="welcome">
          <h1>WellCome {localStorage.getItem("Name")}</h1>
        </div>
        <div className="time-level-profile">
          <div className="time">
            <h4>
              Timer : <span style={{ color: timeColor }}>{timeRemaining}</span>{" "}
              seconds
            </h4>
            <div>
              <div className="box-canvas">
                <div className="frame">
                  <div className="top"></div>
                  <div className="bottom">
                    <div className="drip"></div>
                    <div className="blob"></div>
                    <div className="glass"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="levelType">
            <h4>Difficulty : {localStorage.getItem("Difficulty Level")}</h4>
          </div>
        </div>
        <div className="score-leaderBoard">
          <div className="score">
            <h4>High Score : {score} </h4>
          </div>
          <div className="profile">
            <h4>clicks : {clicks} </h4>
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
        {clicks === 0 ? <div>You Won The game </div> : <div>Play the game</div>}

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
