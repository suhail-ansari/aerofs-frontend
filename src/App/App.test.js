import React from 'react';
import App from './index';
import LoginForm from '../LoginForm';
import Messenger from '../Messenger';
import { shallow } from 'enzyme';

describe('<App/>', () => {
  test('should initialize', () => {
    let tree = shallow(
      <App />
    );
    expect(tree.find(LoginForm).length).toEqual(1);
    expect(tree.find(Messenger).length).toEqual(0);
    
    tree.instance().onNameEnter('Sam');
    expect(tree.state().name).toEqual('Sam');
    
    expect(tree.find(LoginForm).length).toEqual(0);
    expect(tree.find(Messenger).length).toEqual(1);
  });
});