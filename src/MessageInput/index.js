import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MessageInput extends Component {
  render() {
    return (
      <div>
        <input 
          value={ this.props.text } 
          onChange={ this.props.changeHandler }
          onKeyUp={ this.props.keyUpHandler }/>
        <button onClick={ this.props.sendHandler }>Send</button>
      </div>
    );
  }
}

MessageInput.propTypes = {
  text: PropTypes.string.isRequired,
  changeHandler: PropTypes.func.isRequired,
  keyUpHandler: PropTypes.func.isRequired,
  sendHandler: PropTypes.func.isRequired
}