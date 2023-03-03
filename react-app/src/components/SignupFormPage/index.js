import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import leftPerson from "../../assets/left-person.png";
import middlePerson from "../../assets/middle-person.png";
import rightPerson from "../../assets/right-person.png";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
        const data = await dispatch(signUp(username, email, password));
        if (data) {
          setErrors(data)
        }
    } else {
        setErrors(['Confirm Password field must be the same as the Password field']);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-left-container">
        {/* <div className="login-left-top">
          <NavLink className='link 'exact to="/">
          	<div className="logo">
              <img className="logo-img" src={piggy} alt="" />
              <h1 className="logo-text"><em>get the bacon</em></h1>
          	</div>
					</NavLink>
        </div> */}
        <div className="login-left-middle">
          <div className="login-people">
            <div className="login-person-container">
              <img className="login-person-image left" src={leftPerson} alt="" />
            </div>
            <div className="login-person-container">
              <img className="login-person-image middle" src={middlePerson} alt="" />
            </div>
            <div className="login-person-container">
              <img className="login-person-image right" src={rightPerson} alt="" />
            </div>
          </div>
          {/* <div className="login-quote">
            <h1 className="login-qoute-text">
              "Everything's impossible until somebody does it."
            </h1>
          </div> */}
        </div>
        {/* <div className="login-left-bottom">
          <img />
          <h3>
            Quotes curated by Chris P. Bacon, renowned productivity expert
          </h3>
        </div> */}
      </div>
      <div className="login-right-container">
      <h3 className="form-title">Sign Up</h3>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        {/* <label> */}
          {/* Email */}
          <input
              className="input-item"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
          />
        {/* </label> */}
        {/* <label> */}
          {/* Username */}
          <input
              className="input-item"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Username"
          />
        {/* </label> */}
        {/* <label> */}
          {/* Password */}
          <input
              className="input-item"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        {/* </label> */}
        {/* <label> */}
          {/* Confirm Password */}
          <input
              className="input-item"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm Password"
          />
        {/* </label> */}
        <button className="form-button" type="submit">Sign Up</button>
      </form>
    </div>
    </div>
  );
}

export default SignupFormPage;
