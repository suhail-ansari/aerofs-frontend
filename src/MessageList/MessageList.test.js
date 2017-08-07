import React from 'react';
import { mount } from 'enzyme';
import MessageList from './index';

describe("<MessageList/>", () => {
  test("should render the component", () => {
    let messages = [
      {
        "id": 1,
        "author": "alex",
        "timestamp": 1421953601859,
        "content": "i'm on like aleutian time these days :P",
        "last_edited": 1421953605859
      },
      {
        "id": 2,
        "author": "Sam",
        "timestamp": 1421953638978,
        "content": "Hi Lili! How did your art show go? :D"
      },
    ]

    let wrapper = mount(
      <MessageList
        username={'Sam'}
        onEditMessage={jest.fn()}
        messages={messages} />
    );

    expect(wrapper.find('.message-bubble').length).toEqual(2);

    messages.push({
      "id": 3,
      "author": "alex",
      "timestamp": 1421953601859,
      "content": "i'm on like aleutian time these days :P",
      "last_edited": 1421953605859
    });
    wrapper.setProps({
      ...wrapper.props,
      messages
    });
    wrapper.update();
    expect(wrapper.find('.message-bubble').length).toEqual(3);
  });
});