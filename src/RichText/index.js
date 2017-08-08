import React, { Component } from 'react';

const urlRegEx = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/;

export default class RichText extends Component {

  parseText() {
    let tokens = this.props.children.split(urlRegEx);
    for (let i = 1; i < tokens.length; i += 2) {
      tokens[i] = <a key={'link-' + i} target="_blank" href={tokens[i]}>{tokens[i]}</a>
    }
    return tokens;
  }

  render() {
    let text = this.parseText()
    return (
      <p >{text}</p>
    )
  }
}