import React from 'react';
import Messenger from './index';
import { mount } from 'enzyme';
import { spy, stub } from 'sinon';

describe('<Messenger />', () => {

  let promise = Promise.resolve({
    json: () => Promise.resolve({
      messages: [{
        "id": 11,
        "author": "alex",
        "timestamp": 1421953601859,
        "content": "i'm on like aleutian time these days :P",
        "last_edited": 1421953605859
      }]
    })
  });

  global.fetch = jest.fn(() => promise);

  test('should initialize', () => {

    let wrapper = mount(
      <Messenger username={'Sam'} />
    );

    expect(wrapper.find('input').length).toEqual(1);
    expect(wrapper.find('button').length).toEqual(1);
  });

  test('should render fetched messages', () => {
    let fetchMessagesSpy = spy(Messenger.prototype, 'fetchMessages');

    let wrapper = mount(
      <Messenger username={'Sam'} />
    );

    setImmediate(() => {
      expect(wrapper.find('.message-bubble').length).toEqual(1);
    });
  });

  test('should render new messages', () => {

    let handleInputTextChangeSpy = spy(Messenger.prototype, 'handleInputTextChange');
    let sendMessageSpy = spy(Messenger.prototype, 'sendMessage');

    let wrapper = mount(
      <Messenger username={'Sam'} />
    );

    let input = wrapper.find('input');
    let form = wrapper.find('form');
    let button = wrapper.find('button');

    input.simulate('change', { target: { value: 'hello, world' } });
    expect(handleInputTextChangeSpy.calledOnce).toEqual(true);
    expect(input.props().value).toEqual('hello, world');

    form.simulate('submit', { preventDefault: () => { } });
    expect(sendMessageSpy.calledOnce).toEqual(true);

    expect(wrapper.find('.message-bubble').length).toEqual(1);

  });

  test('should update message on edit', () => {

    let handleMessageEditSpy = spy(Messenger.prototype, 'handleMessageEdit');
    let editMessageSpy = spy(Messenger.prototype, 'editMessage');
    let exitEditModeSpy = spy(Messenger.prototype, 'exitEditMode');

    let wrapper = mount(
      <Messenger username={'Sam'} />
    );

    let prevState = wrapper.state();
    wrapper.setState({
      ...prevState,
      messages: [
        ...prevState.messages,
        {
          "id": 11,
          "author": "Sam",
          "timestamp": 1421953601859,
          "content": "Hello, World",
          "last_edited": 1421953605859
        }
      ]
    });

    let input = wrapper.find('input');
    let form = wrapper.find('form');
    let button = wrapper.find('button');

    expect(wrapper.find('.message-bubble').length).toEqual(1);

    let rightBubble = wrapper.find('.message-bubble.right');
    rightBubble.simulate('mouseover');

    let editTextButton = rightBubble.find('a.message-edit');
    editTextButton.simulate('click');

    wrapper.update();

    expect(handleMessageEditSpy.calledOnce).toEqual(true);

    expect(wrapper.find('blockquote').text()).toEqual(input.props().value);
    input.simulate('change', { target: { value: 'new Message' } });
    form.simulate('submit');

    expect(editMessageSpy.calledOnce).toEqual(true);
    expect(rightBubble.find('p').text()).toEqual('new Message');

    rightBubble.simulate('mouseout');

    rightBubble.simulate('mouseover');
    editTextButton.simulate('click');

    let closeQuoteButton = wrapper.find('.glyphicon.glyphicon-remove');
    closeQuoteButton.simulate('click');
    expect(exitEditModeSpy.calledOnce).toBe(true);

  });
});
