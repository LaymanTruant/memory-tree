import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchImageCard } from "../../actions";

class ImageCardShow extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchImageCard(id);
  }

  renderTimestamp(timestamp) {
    const date = new Date(timestamp);
    return (
      <span>
        {date.getFullYear()}/{date.getMonth() + 1}
      </span>
    );
  }

  render() {
    if (!this.props.imageCard) {
      return <div>Loading...</div>;
    }

    const {
      id,
      name,
      firstDayOfWork,
      lastDayOfWork,
      content,
      image
    } = this.props.imageCard;
    return (
      <div>
        <img className="ui medium image" src={image.url} />
        <h1>{name}</h1>
        <div className="ui content">
          {this.renderTimestamp(firstDayOfWork)}-
          {this.renderTimestamp(lastDayOfWork)}
        </div>
        <h5>{content}</h5>
        <div style={{ textAlign: "right", margin: "10px" }}>
          <Link to={`/imageCards/edit/${id}`} className="ui button primary">
            Edit
          </Link>
          <Link to={`/imageCards/delete/${id}`} className="ui button negative">
            Delete
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    imageCard: state.imageCards[ownProps.match.params.id]
  };
};

export default connect(mapStateToProps, { fetchImageCard })(ImageCardShow);
