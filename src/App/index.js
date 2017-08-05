import Reeact, { Component } from 'react';
import LoginForm from './LoginForm';
import Messenger from './Messenger';

export default class App extends Component {
  constructor() {
    super();
    this.state = { name: '' };
    this.onNameEnter = this.onNameEnter.bind(this);
  }

  onNameEnter(name) {
    this.setState({ name });
  }

  render() {
    if (!this.state.name) {
      return <LoginForm onNameEnter={this.onNameEnter} />
    } else {
      return <Messenger name={this.state.name} />
    }
  }
}
