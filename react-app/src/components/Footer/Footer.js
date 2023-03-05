import "./Footer.css";

function Footer() {
  return (
    <div className="page-outer-container">
      <div className="footer">
        <h3 className="dev-info">Developer Information:</h3>
        <div className="contact-div">
          <div className="dev">
            <h4 className="dev-name">Roysa Peguero Martinez</h4>
            <div className="dev-ind-container">
              <button className="contact-btns">
                <a target="_blank" href="https://github.com/roysapeguero">
                  <i className="fa-brands fa-github"></i>
                </a>
              </button>
              <button className="contact-btns">
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/roysapeguero/"
                >
                  <i className="fa-brands fa-linkedin-in"></i>
                </a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
