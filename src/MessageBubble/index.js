import React, { Component } from 'react';

import './MessageBubble.css';

export default class MessageBubble extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoveredOver: false
    }
    
  }
  
  render() {
    let message = this.props.message;
    let timestamp = new Date(message.timestamp);
    let timestampText = `
      ${timestamp.toLocaleDateString()} 
      ${timestamp.toLocaleTimeString("en-US", { hour: 'numeric', minute: 'numeric' })}
    `;
    return (
      <div
        className={`message-bubble ${this.props.position}`}
        onMouseOver={() => { this.setState({ hoveredOver: true }) }}
        onMouseOut={() => { this.setState({ hoveredOver: false }) }}>
        {
          (this.props.displayAuthor) ? <div className="message-author">{message.author}</div> : ''
        }
        <div className="message-content">
          {message.content}
        </div>
        <div className="message-timestamp">
          {timestampText}
        </div>
        <a className="message-edit">
          {(this.state.hoveredOver && !this.props.displayAuthor) ? 'Edit' : ''}
        </a>
      </div>
    )
  }
}