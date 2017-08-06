import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MessageBubble from '../MessageBubble';

export default class MessageList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messagesLength: props.messages.length
    }
  }

  componentDidUpdate() {
    if (this.state.messagesLength !== this.props.messages.length) {
      let messagesListEl = ReactDOM.findDOMNode(this.messagesListRef);
      messagesListEl.scrollTop = messagesListEl.scrollHeight;
      this.setState({
        messagesLength: this.props.messages.length
      });
    }
  }

  render() {
    return (
      <div ref={(el) => { this.messagesListRef = el }} style={{ height: '100%', overflow: 'scroll' }}>
        {
          this.props.messages.map(
            (message, index) => <MessageBubble
              key={index}
              displayAuthor={message.author == this.props.username ? false : true}
              message={message}
              position={message.author == this.props.username ? 'right' : 'left'} />
          )
        }
      </div>
    )
  }
}