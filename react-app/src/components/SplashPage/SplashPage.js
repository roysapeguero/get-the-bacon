import { NavLink } from "react-router-dom";
import "./SplashPage.css";
import steveDood from "../../assets/steve-character.png";
import thinkCloud from "../../assets/think-cloud.png";

const SplashPage = () => {
  return (
    <div className="splash-page-container">
      <div className="splash-inner-container">
        <div className="splash-header-container">
          <h1 className="splash-title">The to-do app for busy people</h1>
          <NavLink to="/signup">
            <button className="form-button splash">Sign Up Free</button>
          </NavLink>
        </div>
        <div className="splash-body-container">
          <div className="cloud-div">
            <p className="cloud-text">CALL BOB AT 5PM.</p>
            <img className="cloud-image" alt="" src={thinkCloud} />
          </div>
          <img className="splash-person-image" alt="" src={steveDood} />
          <div className="cloud-div">
            <p className="cloud-text">PICK UP THE BACON.</p>
            <img className="cloud-image" alt="" src={thinkCloud} />
          </div>
        </div>
        <div className="splash-footer-container">
          <h1 className="splash-footer-title">Get to-dos out of your head.</h1>
          <p className="splash-footer-text">
            Stop thinking about your to-dos, and let the app remember for you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SplashPage;
