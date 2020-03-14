import React, { Component } from "react";
import Modal from "../Modal";
import history from "../../history";
import { connect } from "react-redux";
import { fetchImageCard, deleteImageCard } from "../../actions";
import { Link } from "react-router-dom";

class ImageCardDelete extends Component {
  componentDidMount() {
    this.props.fetchImageCard(this.props.match.params.id);
  }

  renderActions() {
    const { id } = this.props.match.params;

    return (
      // prevent CSS format issue in Semantic old version, now you can use <div> directly
      <React.Fragment>
        <button
          onClick={() => this.props.deleteImageCard(id)}
          className="ui button negative"
        >
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </React.Fragment>
    );
  }

  renderContent() {
    if (!this.props.imageCard) {
      return "Are you sure you want to delete this image card?";
    }
    return `Are you sure you want to delete this image card with title ${this.props.imageCard.title}?`;
  }

  render() {
    return (
      <Modal
        title="Delete an Image Card"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push("/")}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { imageCard: state.imageCards[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchImageCard, deleteImageCard })(
  ImageCardDelete
);
