import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import ImageUpload from "./ImageUpload";
// import DatePicker from "react-datepicker";
import DatePicker, { formatDates, normalizeDates } from "./DatePicker";
import "react-datepicker/dist/react-datepicker.css";

class ImageCardForm extends Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderImageInput = ({ input, type }) => {
    return <ImageUpload input={input} type={type} />;
  };

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = imageCard => {
    this.props.onSubmit(imageCard);
  };

  render() {
    return (
      <div>
        <form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          className="ui form error"
        >
          <Field
            name="image"
            type="file"
            component={this.renderImageInput}
            label="Upload Your profile"
          />
          <Field
            name="name"
            component={this.renderInput}
            label="Enter Your Name"
          />
          <Field
            name="content"
            component={this.renderInput}
            label="Enter Content of Your Card"
          />

          <Field
            name="firstDayOfWork"
            component={DatePicker}
            placeholder="Start Date"
            parse={normalizeDates}
            format={formatDates}
            label="Enter Your First Month of Work"
          />
          <Field
            name="lastDayOfWork"
            component={DatePicker}
            placeholder="End Date"
            parse={normalizeDates}
            format={formatDates}
            label="Enter Your First Month of Work"
          />
          <button className="ui button primary">Save</button>
        </form>
      </div>
    );
  }
}

const validate = imageCard => {
  const errors = {};
  if (!imageCard.name) {
    errors.name = "You must enter your name";
  }
  if (!imageCard.content) {
    errors.content = "You must enter a content";
  }
  return errors;
};

export default reduxForm({
  form: "imageCardForm",
  validate
})(ImageCardForm);
