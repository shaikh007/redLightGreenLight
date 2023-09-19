import React from "react";
import "../RegistrationForm/registrationform.css";
import { useNavigate } from "react-router-dom";

const RegistrationForm = ({
  name,
  setName,
  email,
  setEmail,
  number,
  setNumber,
  level,
  setLevel,
}) => {
  const navigate = useNavigate();
  const option = ["Easy", "Medium", "Hard"];
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleNumber = (e) => {
    setNumber(e.target.value);
  };
  const handleLevel = (e) => {
    setLevel(e.target.value);
  };

  const handleClick = () => {
    let inputValue = email;
    let emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    if (name === "" && inputValue === "" && number === "" && level === "") {
      alert("Please fill all the details");
    } else if (name === "") {
      alert("Please fill the name");
    } else if (!emailRegex.test(inputValue)) {
      alert("Error! you have entered invalid email.");
    } else if (number === "") {
      alert("Please fill the number");
    } else if (level === "") {
      alert("Please select the level");
    }
    localStorage.setItem("Name", name);
    localStorage.setItem("Email", email);
    localStorage.setItem("Mobile Number", number);
    localStorage.setItem("Difficulty Level", level);
    if (name && email && number && level) {
      navigate("gamearea");
    } else {
      navigate("/");
    }
    console.log(name, email, number, level);
  };
  return (
    <div className="registor">
      <div className="registerForm">
        <div className="announcement">
          <h1>
            <span className="green">Green</span> Light{" "}
            <span className="red">Red</span> Light
          </h1>
          <h3>Fill The Form to start the game</h3>
        </div>
        <div className="formbox">
          <div className="name divs">
            <label htmlFor="name">Name : </label>
            <input
              type="text"
              name="Name"
              id="name"
              placeholder="Enter Name here"
              required
              onChange={handleName}
            />
          </div>
          <div className="email divs">
            <label htmlFor="email">Email : </label>
            <input
              type="email"
              name="Email"
              id="email"
              placeholder="Enter Email Here"
              required
              onChange={handleEmail}
            />
          </div>
          <div className="number divs">
            <label htmlFor="number">Mobile Number : </label>
            <input
              type="text"
              name="Number"
              id="number"
              placeholder="Enter Your Mobile Number here"
              required
              onChange={handleNumber}
            />
          </div>
          <div className="levels divs">
            <label htmlFor="levels"> Difficulty Levels : </label>
            <select name="levels" id="levels" onChange={handleLevel}>
              <option>Please choose one option</option>
              {option.map((option, index) => (
                <option key={index}>{option}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="startbtn divs">
          <button className="glowing-btn" onClick={handleClick}>
            <span className="glowing-text">Star</span>
            <span className="faulty-letter">t</span> Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
