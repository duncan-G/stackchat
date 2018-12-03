import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateName } from '../store';

class NameEntry extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.props.updateName(event.target.value);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <form className="form-inline" onSubmit={this.handleSubmit}>
        <label htmlFor="name">Your name:</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          className="form-control"
          onChange={this.handleChange}
        />
      </form>
    );
  }
}

const mapPropToState = state => ({
  name: state.name
});

const mapDispatchToState = dispatch => ({
  updateName: name => dispatch(updateName(name))
});

export default connect(
  mapPropToState,
  mapDispatchToState
)(NameEntry);
