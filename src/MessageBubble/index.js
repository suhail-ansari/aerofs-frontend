import React, { Component } from 'react';
import './MessageBubble.css';
import RichText from '../RichText';

export default class MessageBubble extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoveredOver: false
    }
  }

  render() {
    let message = this.props.message;
    let timestamp = message.last_edited ? new Date(message.last_edited) : new Date(message.timestamp);
    let timestampDate = timestamp.toLocaleDateString();
    let timestampTime = timestamp.toLocaleTimeString("en-US", { hour: 'numeric', minute: 'numeric' });
    let timestampText = `${message.last_edited ? '*' : ''}${timestampDate} ${timestampTime}`;

    return (
      <div
        className={`message-bubble ${this.props.position}`}
        onMouseOver={() => { this.setState({ hoveredOver: true }) }}
        onMouseOut={() => { this.setState({ hoveredOver: false }) }}>
        {
          (this.props.displayAuthor) ? <div className="message-author">{message.author}</div> : null
        }
        <div className="message-content">
          <RichText>{message.content}</RichText>
        </div>
        <div className="message-timestamp">
          {timestampText}
        </div>
        <a className="message-edit" onClick={() => { this.props.onMessageEdit(message.id) }}>
          {(this.state.hoveredOver && !this.props.displayAuthor) ? 'Edit' : ''}
        </a>
      </div>
    )
  }
}