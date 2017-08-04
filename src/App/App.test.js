import React from 'react';
import App from './index';
import {mount} from 'enzyme';
import {spy} from 'sinon';

global.fetch = jest.fn(() => new Promise(resolve => resolve()));

test('should initialize', () => {

  let getMessageSpy = spy(App.prototype, 'getMessages');
  let sendMessageSpy = spy(App.prototype, 'sendMessage');
  let updateTextSpy = spy(App.prototype, 'updateText');

  let wrapper = mount(
    <App/>
  );
  expect(wrapper.find('input')).toBeDefined();
  expect(getMessageSpy.calledOnce).toEqual(true);

  let input = wrapper.find('input');
  let button = wrapper.find('button');

  input.simulate('change', {target: {value: 'hello, world'}});
  expect(updateTextSpy.calledOnce).toEqual(true);
  expect(input.props().value).toEqual('hello, world');

  input.simulate('keyup', {key: 'Enter'});
  expect(sendMessageSpy.calledOnce).toEqual(true);

  button.simulate('click');
  expect(sendMessageSpy.callCount).toEqual(2);

});
