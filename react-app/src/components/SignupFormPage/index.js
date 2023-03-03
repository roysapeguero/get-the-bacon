import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import leftPerson from "../../assets/left-person.png";
import middlePerson from "../../assets/middle-person.png";
import rightPerson from "../../assets/right-person.png";
import "./SignupForm.css";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (password === confirmPassword) {
    const data = await dispatch(
      signUp(first_name, last_name, username, email, password)
    );
    if (data) {
      setErrors(data);
    }
    // } else {
    //     setErrors(['Confirm Password field must be the same as the Password field']);
    // }
  };

  return (
    <div className="login-page-container">
      <div className="login-left-container signup-page">
        {/* <div className="login-left-top">
          <NavLink className='link 'exact to="/">
          	<div className="logo">
              <img className="logo-img" src={piggy} alt="" />
              <h1 className="logo-text"><em>get the bacon</em></h1>
          	</div>
					</NavLink>
        </div> */}
        <div className="signup-left-middle">
          <div className="signup-people">
            <div className="signup-person-container left">
              <img
                className="signup-person-image"
                src={leftPerson}
                alt=""
              />
            </div>
            <div className="signup-person-container middle">
              <img
                className="signup-person-image"
                src={middlePerson}
                alt=""
              />
            </div>
            <div className="signup-person-container right">
              <img
                className="signup-person-image"
                src={rightPerson}
                alt=""
                />
            </div>
                </div>
          <div className="login-quote">
            <h1 className="login-qoute-text signup">
              Join millions of people getting more productive!
            </h1>
          </div>
        </div>
        {/* <div className="login-left-bottom">
          <img />
          <h3>
            Quotes curated by Chris P. Bacon, renowned productivity expert
          </h3>
        </div> */}
      </div>
      <div className="login-right-container">
        <form className="login-form-item" onSubmit={handleSubmit}>
        <div className="inner-form-container">

          {/* <label> */}
          {/* Email */}
              <h3 className="form-title">Sign up for free.</h3>
          <ul>
            {errors.map((error, idx) => (
              <p className='errors' key={idx}>{error}</p>
              ))}
          </ul>
          <input
            className="input-item"
            type="text"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            required
            placeholder="First Name"
          />
          <input
            className="input-item"
            type="text"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            required
            placeholder="Last Name"
          />
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
          {/* <input
              className="input-item"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm Password"
          /> */}

          {/* </label> */}
          <button className="form-button" type="submit">
            Sign up!
          </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupFormPage;
