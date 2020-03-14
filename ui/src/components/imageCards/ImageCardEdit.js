import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchImageCard, editImageCard } from "../../actions";
import ImageCardForm from "./ImageCardForm";
import ImageUpload from "./ImageUpload";

class ImageCardEdit extends Component {
  componentDidMount() {
    this.props.fetchImageCard(this.props.match.params.id);
  }

  onSubmit = imageCard => {
    this.props.editImageCard(this.props.match.params.id, imageCard);
  };

  renderImage() {
    const { url } = this.props.imageCard.image;
    if (url) {
      return <img className="ui medium image" src={url} />;
    }
  }

  render() {
    const imageCard = this.props.imageCard;
    if (!imageCard) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <h3>Edit an Image Card</h3>
        {this.renderImage()}
        <ImageCardForm
          initialValues={_.pick(
            imageCard,
            "name",
            "content",
            "firstDayOfWork",
            "lastDayOfWork"
          )}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { imageCard: state.imageCards[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchImageCard, editImageCard })(
  ImageCardEdit
);
