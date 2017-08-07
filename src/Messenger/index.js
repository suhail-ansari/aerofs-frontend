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
        index: -1
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
    this.handleMessageEdit = this.handleMessageEdit.bind(this);
    this.exitEditMode = this.exitEditMode.bind(this);
    this.fetchMessages = this.fetchMessages.bind(this);
  }

  componentDidMount() {
    this.fetchMessages();
  }

  _getLastId(messages) {
    return messages.reduce((prev, next) => {
      return prev.id > next.id ? prev.id : next.id
    }, 0);
  }

  _sortMessages(messages) {
    return (
      [...messages].sort((a, b) => a.timestamp > b.timestamp)
    );
  }

  fetchMessages() {
    fetch('/fixtures/fakedatas.json')
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

  handleMessageEdit(index) {
    let message = this.state.messages[index];
    this.setState({
      ...this.state,
      text: message.content,
      editMode: true,
      editMessage: {
        text: message.content,
        index
      }
    });
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

  editMessage(index) {
    let message = this.state.messages[index];

    if (this.state.text !== '' && message) {
      message.content = this.state.text;
      message.last_edited = new Date().getTime();

      this.setState({
        ...this.state,
        messages: [
          ...this.state.messages.slice(0, index),
          message,
          ...this.state.messages.slice(index + 1)
        ],
        text: '',
        editMode: false,
        editMessage: {
          text: '',
          index: -1
        }
      });
    }
  }

  exitEditMode() {
    this.setState({
      ...this.state,
      text: '',
      editMode: false,
      editMessage: {
        text: '',
        index: -1
      }
    });
  }

  render() {

    let containerClass = `col-lg-8 col-md-8 col-sm-12 col-xs-12 col-lg-offset-2 col-md-offset-2 messenger-container`;
    containerClass = `${containerClass} ${this.state.editMode ? 'quote-open' : ''}`;

    return (
      <div className={containerClass}>
        <div className="message-list-container">
          <MessageList
            username={this.props.username}
            messages={this.state.messages}
            onMessageEdit={this.handleMessageEdit} />
        </div>
        <div className="message-input-container">
          {
            this.state.editMode ?
              <div className="previous-message-container">
                <blockquote>
                  <p>{this.state.editMessage.text}</p>
                </blockquote>
                <span className="glyphicon glyphicon-remove" onClick={this.exitEditMode}></span>
              </div>
              : null
          }
          <MessageInput
            text={this.state.text}
            onInputChange={this.handleInputTextChange}
            onSendMessage={this.state.editMode ? this.editMessage.bind(this, this.state.editMessage.index) : this.sendMessage} />
        </div>
        {
          this.state.error ?
            <div className="alert alert-danger error-message" role="alert">{this.state.error}</div>
            : null
        }
      </div>
    );
  }

}