import React from "react";
import "../LeaderBoard/leaderBoard.css";
import { useNavigate } from "react-router-dom";

const LeaderBoard = ({ scores }) => {
  const navigate = useNavigate();

  const handleBackToGame = () => {
    navigate(-1);
  };

  return (
    <div className="leaderboard">
      <div className="leaderBoarList">
        <h2>Leaderboard</h2>

        <ul>
          <li>Name ----- Scores</li>
        </ul>
        <ol>
          {scores.map((data, index) => (
            <li key={index}>
              {data.name} ----- {data.scored}
            </li>
          ))}
        </ol>
        <div className="backtogame">
          <button onClick={handleBackToGame}>Back</button>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
