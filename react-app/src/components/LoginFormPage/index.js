import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';
import { NavLink } from "react-router-dom";
import piggy from "../../assets/piggy-icon.png";


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
      setErrors(data);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-left-container">
        <div className="login-left-top">
          <NavLink className='link 'exact to="/">
          	<div className="logo">
              <img className="logo-img" src={piggy} alt="" />
              <h1 className="logo-text"><em>get the bacon</em></h1>
          	</div>
					</NavLink>
        </div>
        <div className="login-left-middle">
          quote here
        </div>
        <div className="login-left-bottom">
          lil bacon doode here but higher
        </div>
      </div>
      <div className="login-right-container">
        <form className="login-form-item" onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
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
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
}

export default LoginFormPage;
