import MessageForm from "./MessageForm";
import TheirMessage from "./TheirMessage";
import MyMessage from "./MyMessage";

const ChatFeed = (props) => {
  const { chats, activeChat, userName, messages } = props;

  const chat = chats && chats[activeChat];

  const renderChatReceipts = (message, isMyMessage) => {
    return chat.people.map(
      (person, index) =>
        person.last_read === message.id && (
          <div
            key={`read-${index}`}
            className="read-receipt"
            style={{
              float: isMyMessage ? "right" : "left",
              backgroundImage: `url(${person?.person?.avatar})`,
            }}
          />
        )
    );
  };

  const renderMessages = () => {
    const keys = Object.keys(messages);

    return keys.map((key, index) => {
      const message = messages[key];
      const lastMessageKey = index === 0 ? null : keys[index - 1];
      const IsMyMessage = userName === message.sender.username;

      return (
        <div key={`msg_${index}`} style={{ width: "100%" }}>
          <div className="message-block">
            {IsMyMessage ? (
              <MyMessage message={message} />
            ) : (
              <TheirMessage
                message={message}
                lastMessage={messages[lastMessageKey]}
              />
            )}
          </div>
          <div
            className="read-receipts"
            style={{
              marginRight: IsMyMessage ? "18px" : "0",
              marginLeft: IsMyMessage ? "0px" : "68px",
            }}
          >
            {renderChatReceipts(message, IsMyMessage)}
          </div>
        </div>
      );
    });
  };

  renderMessages();

  const logoutHandler = (e) => {
    e.preventDefault();

    localStorage.removeItem("username");
    localStorage.removeItem("password");

    window.location.reload();
  };

  if (!chat) return "loading";
  return (
    <div className="chat-feed">
      <form onSubmit={logoutHandler}>
        <button onClick={logoutHandler}>Logout</button>
      </form>
      <div className="chat-title-container">
        <div className="chat-title">{chat?.title}</div>
        <div className="chat-subtitle">
          {chat.people.map((person) => `${person.person.username}`)}
        </div>
      </div>
      {renderMessages()}
      <div style={{ height: "100px" }} />
      <div className="message-form-container">
        <MessageForm {...props} chatId={activeChat} />
      </div>
    </div>
  );
};

export default ChatFeed;
