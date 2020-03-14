import React, { Component } from "react";
import { connect } from "react-redux";
import { createImageCard } from "../../actions";
import ImageCardForm from "./ImageCardForm";

class ImageCardCreate extends Component {
  onSubmit = imageCard => {
    this.props.createImageCard(imageCard);
  };

  render() {
    return (
      <div>
        <h3>Create Your Image Card</h3>
        <ImageCardForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(null, { createImageCard })(ImageCardCreate);
