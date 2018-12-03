import React, { Component } from 'react';
import { connect } from 'react-redux';
import Message from './Message';
import NewMessageEntry from './NewMessageEntry';
import { fetchMessages } from '../store';

class MessagesList extends Component {
  componentDidMount() {
    try {
      this.props.fetchInitialMessages();
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const channelId = Number(this.props.match.params.channelId); // because it's a string "1", not a number!
    const messages = this.props.messages;
    const filteredMessages = messages.filter(
      message => message.channelId === channelId
    );

    return (
      <div>
        <ul className="media-list">
          {filteredMessages.map(message => (
            <Message message={message} key={message.id} />
          ))}
        </ul>
        <NewMessageEntry channelId={channelId}/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  messages: state.messages
});

const mapDispatchToProps = dispatch => ({
  fetchInitialMessages: () => dispatch(fetchMessages())
});

const ConnectedMessagesList = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagesList);

export default ConnectedMessagesList;
