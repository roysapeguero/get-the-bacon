import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import piggy from "../../assets/piggy-icon.png";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="nav-container">
      <div className="nav-bar">
        <div className="header-left">
					<NavLink className='link ' to="/">
          	<div className="logo">
              <img className="logo-img" src={piggy} alt="" />
              <h1 className="logo-text"><em>get the bacon</em></h1>
          	</div>
					</NavLink>
        </div>
				<div className="header-right">
        {sessionUser ? <NavLink className='action link jobs' to='/'>Home</NavLink> : ''}
        {sessionUser ? <NavLink className='action link jobs' to='/jobs'>My Jobs</NavLink> : ''}
        {sessionUser ? <NavLink className='action link jobs' to='/contacts'>My Contacts</NavLink> : ''}
        {isLoaded && <ProfileButton user={sessionUser} />}
				</div>
      </div>
    </div>
    // </div>
  );
}

export default Navigation;
