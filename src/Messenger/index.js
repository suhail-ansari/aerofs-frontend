import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import MessageInput from '../MessageInput';
import MessageList from '../MessageList';

import './Messenger.css';

export default class Messenger extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editMessage: {
        text: '',
        id: -1
      },
      error: '',
      text: '',
      messages: [],
      last_seen: 0
    };

    this.sendHandler = this.sendMessage.bind(
      this,
      { key: 'Enter' }
    );
    this.sendMessage = this.sendMessage.bind(this);
    this.handleInputTextChange = this.handleInputTextChange.bind(this);
    this.handleFetchSuccess = this.handleFetchSuccess.bind(this);
    this.handleFetchError = this.handleFetchError.bind(this);
    this.fetchMessages();
  }

  fetchMessages() {
    fetch('/fixtures/fakedata.json')
      .then(res => res.json())
      .then(this.handleFetchSuccess)
      .catch(this.handleFetchError);
  }

  handleFetchSuccess(data) {
    let messages = this._sortMessages([
      ...data.messages,
      ...this.state.messages
    ]);
    this.setState({
      ...this.state,
      messages
    });
  }

  handleFetchError() {
    this.setState({
      ...this.state,
      error: 'There was an error while fetching messages.'
    });
  }

  handleInputTextChange({ target }) {
    this.setState({
      ...this.state,
      text: target.value
    });
  }

  _getLastId(messages) {
    return messages.reduce((prev, next) => {
      return prev.id > next.id ? prev.id : next.id
    }, 1);
  }

  _sortMessages(messages) {
    return (
      [...messages].sort((a, b) => a.timestamp > b.timestamp)
    );
  }

  handleEditMessage(index) {
    let message = this.state.messages[index];
    this.setState({
      ...this.state,
      text: message.content
    });
  }

  updateMessage(id) {
    let updatedMessages
  }

  sendMessage() {
    if (this.state.text !== '') {
      let newMessageId = this._getLastId(this.state.messages) + 1;
      this.setState({
        ...this.state,
        text: '',
        messages: [
          ...this.state.messages,
          {
            id: newMessageId,
            author: this.props.username,
            timestamp: new Date().getTime(),
            content: this.state.text
          }
        ]
      });
    }
  }

  render() {
    return (
      <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 col-lg-offset-2 col-md-offset-2 messenger-container">
        <div className="message-list-container">
          <MessageList 
            username={this.props.username} 
            messages={this.state.messages} />
        </div>
        <div className="message-input-container">
          <MessageInput
            text={this.state.text}
            onInputChange={this.handleInputTextChange}
            onSendMessage={this.sendMessage} />
        </div>
      </div>
    );
  }

}