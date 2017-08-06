import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MessageInput extends Component {
  render() {
    return (
      <form onSubmit={(event) => {
        event.preventDefault();
        this.props.onSendMessage();
      }}>
        <div className="form-group">
          <div className="input-group">
            <input
              placeholder="Type a message and press enter to send"
              className="form-control"
              value={this.props.text}
              onChange={this.props.onInputChange} />
            <span className="input-group-btn">
              <button className="btn btn-default" type="submit">Send</button>
            </span>
          </div>
        </div>
      </form>
    );
  }
}

MessageInput.propTypes = {
  text: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSendMessage: PropTypes.func.isRequired
}