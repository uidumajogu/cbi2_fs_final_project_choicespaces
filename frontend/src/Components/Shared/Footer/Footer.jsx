import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import Gap from "../Gap/Gap.jsx";
import Logo from "../Logo/Logo.jsx";

export class Footer extends Component {
  render() {
    return (
      <React.Fragment>
        {(this.props.footerUpper === undefined ||
          this.props.footerUpper === true) && (
          <div className="footer-MainRow">
            <div className="footer-TopItems">
              <h3>Address</h3>
              <Gap value="5px" />
              <div>16122 Guy Street West </div>
              <div>Montreal QC, H8D 007 </div>
              <div>Quebec, Canada</div>
              <div>+1 514 837 6284</div>
              <div>hello@choicespaces.com</div>
            </div>
            <div className="footer-TopItems">
              <h3>Company</h3>
              <Gap value="5px" />
              <div>
                <Link className="footer-MainRowLink" to="/about-us">
                  About us
                </Link>
              </div>
              <div>
                <Link className="footer-MainRowLink" to="/contact-us">
                  Contact Us
                </Link>
              </div>
              <div>
                <Link className="footer-MainRowLink" to="/career">
                  Career
                </Link>
              </div>
            </div>

            <div className="footer-TopItems">
              <h3>Resources</h3>
              <Gap value="5px" />
              <div>
                <Link className="footer-MainRowLink" to="/faqs">
                  FAQs
                </Link>
              </div>
              <div>
                <Link className="footer-MainRowLink" to="/order-tracking">
                  Support
                </Link>
              </div>
              <div>
                <Link className="footer-MainRowLink" to="/policy">
                  Policy
                </Link>
              </div>
            </div>

            <div className="footer-TopItems">
              <h3>Legal</h3>
              <Gap value="5px" />
              <div>
                <Link className="footer-MainRowLink" to="/privacy-policy">
                  Privacy Policy
                </Link>
              </div>
              <div>
                <Link className="footer-MainRowLink" to="/terms-and-conditions">
                  Terms and Conditions
                </Link>
              </div>
            </div>
          </div>
        )}

        {(this.props.footerLower === undefined ||
          this.props.footerLower === true) && (
          <div className="footer-bottomRow ">
            {(this.props.logo === undefined || this.props.logo === true) && (
              <Logo type="light" width="20px" />
            )}
            <Gap value="5px" />
            <div>© ChoiceSpaces 2019. All Rights Reserved</div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Footer;
