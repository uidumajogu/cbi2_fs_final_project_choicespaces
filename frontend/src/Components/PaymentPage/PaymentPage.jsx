import React, { Component } from "react";
import "./PaymentPage.css";
import NavBar from "../Shared/NavBar/NavBar.jsx";
import Footer from "../Shared/Footer/Footer.jsx";
import Gap from "../Shared/Gap/Gap.jsx";
import SizedShape from "../Shared/SizedShape/SizedShape.jsx";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import StripeCheckout from "react-stripe-checkout";

export class UnconnectedPaymentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      propertyData: this.props.propertyData
    };
  }

  componentDidMount = () => {
    this.props.dispatch({
      type: "CURRENT_PATH",
      path: "/payment/" + this.props.propertyData._id
    });
  };

  onToken = async token => {
    let data = new FormData();
    data.append("token", token);
    data.append("propertyID", this.props.propertyData._id);
    data.append("forSale", this.props.propertyData.forSale);
    data.append("vendorID", this.props.propertyData.vendorUserID);
    data.append("rentPeriod", 2);
    data.append("rentExpiryDate", "today");
    let response = await fetch("/submit-payment", {
      method: "POST",
      body: data
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    if (!body.success) {
      alert(body.message);
      return;
    }

    if (body.success) {
      this.props.history.push("/");
      return;
    }
  };

  makePayment = () => {
    return (
      <StripeCheckout
        name="ChoiceSpaces"
        //  description={title}
        token={this.onToken}
        amount={
          (this.state.propertyData.price +
            (this.state.propertyData.price * 1.5) / 100 +
            (this.state.propertyData.price * 0.5) / 100) *
          100
        }
        stripeKey="pk_test_6lDc8O9BMYSvT3eTUnOAdI0t007mLNRYX7"
      />
    );
  };

  render() {
    return (
      <React.Fragment>
        <NavBar
          borderBottom="none"
          backgroundColor="#f3f4fb"
          home={true}
          addProperty={true}
        />
        <div className="paymentPage-wrapper">
          <div className="paymentPage-wrapper-left">
            <div>
              {"Make payment for - " +
                this.state.propertyData.title.toUpperCase()}
            </div>
            <Gap value="10px" />
            <div className="paymentPage-property-image-wrapper">
              <img
                src={this.state.propertyData.propertyMainImageURL}
                alt="Main Property"
              />
            </div>
          </div>
          <Gap value="50px" />
          <div className="paymentPage-wrapper-right">
            <Gap value="10px" />
            <div className="paymentPage-amount-row">
              <h5>Amount: </h5>
              <p>${this.state.propertyData.price}</p>
            </div>
            <Gap value="15px" />
            <div className="paymentPage-amount-row">
              <h5>Tax: </h5>
              <p>${(this.state.propertyData.price * 1.5) / 100}</p>
            </div>
            <Gap value="15px" />
            <div className="paymentPage-amount-row">
              <h5>Service Fee: </h5>
              <p>${(this.state.propertyData.price * 0.5) / 100}</p>
            </div>
            <Gap value="20px" />
            <SizedShape width="100%" height="1px" backgroundColor="#CFD4DD" />
            <Gap value="20px" />
            <div className="paymentPage-amount-row">
              <h5 className="total">Total: </h5>
              <p className="total">
                $
                {this.state.propertyData.price +
                  (this.state.propertyData.price * 1.5) / 100 +
                  (this.state.propertyData.price * 0.5) / 100}
              </p>
            </div>

            <Gap value="50px" />

            <div style={{ width: "100%" }}>
              <StripeCheckout
                name="ChoiceSpaces"
                style={{
                  width: "100%"
                }}
                //  description={title}
                token={this.onToken}
                amount={
                  (this.state.propertyData.price +
                    (this.state.propertyData.price * 1.5) / 100 +
                    (this.state.propertyData.price * 0.5) / 100) *
                  100
                }
                allowRememberMe={false}
                currency="CAD"
                stripeKey="pk_test_6lDc8O9BMYSvT3eTUnOAdI0t007mLNRYX7"
              />
            </div>
          </div>
        </div>

        <Gap value="50px" />
        <Footer />
      </React.Fragment>
    );
  }
}

let mapStateToProps = state => {
  return {
    user: state.user
  };
};

let PaymentPage = connect(mapStateToProps)(UnconnectedPaymentPage);
export default withRouter(PaymentPage);
