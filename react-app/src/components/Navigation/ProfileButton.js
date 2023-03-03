import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
// import OpenModalButton from "../OpenModalButton";
// import LoginFormModal from "../LoginFormModal";
// import SignupFormModal from "../SignupFormModal";
import { NavLink } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    closeMenu()
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button className="menu-drop-btn" onClick={openMenu}>
        <i className="fas fa-user-circle" />
        {user ? user.username : ''}
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <p>{user.username}</p>
            <p>{user.email}</p>
            <p>
              <button onClick={handleLogout}>Log Out</button>
            </p>
          </>
        ) : (
          <div className="drop-links">
            <NavLink className='action link' onClick={closeMenu} to='/login'>
              Login
            </NavLink>
            <NavLink className='action link' onClick={closeMenu} to='/signup'>
              Sign up
            </NavLink>
          </div>
          // <>
          //   <OpenModalButton
          //     buttonText="Log In"
          //     onItemClick={closeMenu}
          //     modalComponent={<LoginFormModal />}
          //   />

          //   <OpenModalButton
          //     buttonText="Sign Up"
          //     onItemClick={closeMenu}
          //     modalComponent={<SignupFormModal />}
          //   />
          // </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
