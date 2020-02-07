import React, { Component } from "react";
import "./ReviewStars.css";

export class ReviewStars extends Component {
  render() {
    let _star1 = this.props.reviewStars > 0 ? true : false;
    let _star2 = this.props.reviewStars > 1 ? true : false;
    let _star3 = this.props.reviewStars > 2 ? true : false;
    let _star4 = this.props.reviewStars > 3 ? true : false;
    let _star5 = this.props.reviewStars > 4 ? true : false;

    return (
      <div className="review-row">
        {_star1 ? (
          <img
            src="../assets/icons/MarkedStarIcon.png"
            alt="Review Star Marked"
          />
        ) : (
          <img src="../assets/icons/StarIcon.png" alt="Review Star" />
        )}
        {_star2 ? (
          <img
            src="../assets/icons/MarkedStarIcon.png"
            alt="Review Star Marked"
          />
        ) : (
          <img src="../assets/icons/StarIcon.png" alt="Review Star" />
        )}
        {_star3 ? (
          <img
            src="../assets/icons/MarkedStarIcon.png"
            alt="Review Star Marked"
          />
        ) : (
          <img src="../assets/icons/StarIcon.png" alt="Review Star" />
        )}
        {_star4 ? (
          <img
            src="../assets/icons/MarkedStarIcon.png"
            alt="Review Star Marked"
          />
        ) : (
          <img src="../assets/icons/StarIcon.png" alt="Review Star" />
        )}
        {_star5 ? (
          <img
            src="../assets/icons/MarkedStarIcon.png"
            alt="Review Star Marked"
          />
        ) : (
          <img src="../assets/icons/StarIcon.png" alt="Review Star" />
        )}
      </div>
    );
  }
}

export default ReviewStars;
