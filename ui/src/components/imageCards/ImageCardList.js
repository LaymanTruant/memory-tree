import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchImageCards } from "../../actions";

class ImageCardList extends Component {
  componentDidMount() {
    this.props.fetchImageCards();
  }

  renderTimestamp(timestamp) {
    const date = new Date(timestamp);
    return (
      <span>
        {date.getFullYear()}/{date.getMonth() + 1}
      </span>
    );
  }

  renderList() {
    return this.props.imageCards.map(imageCard => {
      const {
        id,
        name,
        content,
        firstDayOfWork,
        lastDayOfWork,
        image
      } = imageCard;
      return (
        <Link to={`/imageCards/${id}`} className="ui card" key={id}>
          <div className="image">
            <img src={image.url} alt={content} />
          </div>
          <div className="content">
            <div className="header">{name}</div>
            <div className="meta">Friends</div>
            <div className="description">{content}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="yellow star icon" />
              {this.renderTimestamp(firstDayOfWork)}-
              {this.renderTimestamp(lastDayOfWork)}
            </span>
          </div>
        </Link>
      );
    });
  }

  renderCreate() {
    return (
      <div style={{ textAlign: "right", margin: "10px" }}>
        <Link to="/imageCards/new" className="ui button primary">
          Create an Image Card
        </Link>
      </div>
    );
  }

  render() {
    if (!this.props.imageCards) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <div className="ui five stackable doubling link cards">
          {this.renderList()}
        </div>
        {this.renderCreate()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    imageCards: Object.values(state.imageCards)
  };
};

export default connect(mapStateToProps, { fetchImageCards })(ImageCardList);
