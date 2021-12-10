import { ChatEngine } from "react-chat-engine";
import "./App.css";
import ChatFeed from './components/ChatFeed';
import LoginForm from './components/LoginForm'; 

const App = () => {

    if(!localStorage.getItem('username')) return <LoginForm/>

  return (
    <ChatEngine
      height="100vh"
      projectID="YOUR_PROJECT_ID"
      userName={localStorage.getItem('username')}
      userSecret={localStorage.getItem('password')}
      renderChatFeed={(chatFeedProps) => <ChatFeed {...chatFeedProps} />}
    />
  );
};

export default App;
