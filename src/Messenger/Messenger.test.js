import React from 'react';
import App from './index';
import {mount} from 'enzyme';
import {spy} from 'sinon';

test('should initialize', () => {
  
  global.fetch = jest.fn(() => {
    return new Promise(resolve => resolve({
      json: () => {
        return new Promise(resolve2 => {
          resolve2({messages: []});
        })
      }
    }));
  });

  let getMessageSpy = spy(App.prototype, 'getMessages');
  let sendMessageSpy = spy(App.prototype, 'sendMessage');
  let updateTextSpy = spy(App.prototype, 'updateText');

  let wrapper = mount(
    <App/>
  );

  let initState = wrapper.state();
  expect(initState.text).toEqual('');
  expect(initState.error).toEqual('');
  expect(initState.messages.length).toEqual(0);
  expect(initState.last_seen).toEqual(0);

  expect(wrapper.find('input')).toBeDefined();
  expect(wrapper.find('button')).toBeDefined();
  expect(getMessageSpy.callCount).toEqual(1);

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

test("test 1", () => {
  global.fetch = jest.fn(() => {
    return new Promise((resolve, reject) => reject())
  });

  let wrapper2 = mount(
    <App/>
  );
});
