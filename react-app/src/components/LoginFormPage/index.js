import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./LoginForm.css";
import baconDood from '../../assets/bacon-icon.jpeg'
// import leftPerson from "../../assets/left-person.png";
// import middlePerson from "../../assets/middle-person.png";
// import rightPerson from "../../assets/right-person.png";
// import { NavLink } from "react-router-dom";
// import piggy from "../../assets/piggy-icon.png";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      console.log(data)
      setErrors(data);
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
          {/* <div className="login-people">
            <div className="login-person-container">
              <img className="login-person-image left" src={leftPerson} alt="" />
            </div>
            <div className="login-person-container">
              <img className="login-person-image middle" src={middlePerson} alt="" />
            </div>
            <div className="login-person-container">
              <img className="login-person-image right" src={rightPerson} alt="" />
            </div>
          </div> */}
          <div className="login-quote">
            <h1 className="login-qoute-text">
              "Everything's impossible until somebody does it."
            </h1>
          </div>
        </div>
        <div className="login-left-bottom">
          <img className="bacon-dood-img" src={baconDood} alt='' />
          <h3 className="quote-credits">
            Quotes curated by Chris P. Bacon, renowned productivity expert
          </h3>
        </div>
      </div>
      <div className="login-right-container">
        <form className="login-form-item" onSubmit={handleSubmit}>
          <div className="inner-form-container">
            <ul>
            {/* <label> */}
            {/* Email */}
            <h3 className="form-title">Been here before? Welcome Back!</h3>
              {errors.map((error, idx) => (
                <p className="errors" key={idx}>{error}</p>
              ))}
            </ul>
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
            <button className="form-button" type="submit">
              Log In
            </button>
            <button
              className="form-button"
              type="submit"
              onClick={(e) => {
                setEmail("demo@aa.io");
                setPassword("password");
              }}
            >
              Demo User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginFormPage;
