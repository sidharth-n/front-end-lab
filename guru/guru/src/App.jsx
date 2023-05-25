/* import { useState, useEffect, useRef } from "react";
import SendIcon from "./SendIcon";
import CloseIcon from "./CloseIcon";
import { translateText } from "./TranslationService";

function MessageBubble({ message, isUser }) {
  return (
    <div className={`bubble ${isUser ? "user-bubble" : "bot-bubble"}`}>
      <p>{message}</p>
    </div>
  );
}

function ChatWindow({ messages }) {
  return (
    <div className="chat-window">
      {messages.map((message, index) => (
        <MessageBubble key={index} {...message} />
      ))}
    </div>
  );
}

function App() {
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  const handleChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    // Add user's question to the chat
    setMessages([...messages, { message: question, isUser: true }]);

    // Translate the question to English before sending it to GPT-3
    const translatedQuestion = await translateText(question, "en");

    const prompt = `Retrieve the answer to this question: "${translatedQuestion}" in a json format with key "answer" and give me. make sure to return only the json no matter what the prompt is and to only reply in english no matter what the language is asked upon`;

    // Add typing message from bot
    setMessages([...messages, { message: "Typing...", isUser: false }]);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const result = data.choices[0].message.content;
    const parsedResult = JSON.parse(result);
    console.log(parsedResult);
    const answer_from_gpt = await translateText(parsedResult.answer, "ml");

    // Replace bot's last message (Typing...) with the actual answer
    const updatedMessages = [...messages];
    updatedMessages[updatedMessages.length - 1] = {
      message: answer_from_gpt,
      isUser: false,
    };
    setMessages(updatedMessages);
    setIsLoading(false);
  };

  const handleClear = () => {
    setQuestion("");
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white font-sans">
      <ChatWindow messages={messages} />
      <footer className="fixed bottom-0 w-full p-4">
        <form onSubmit={handleSubmit} className="flex items-center">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Ask in english"
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-xl text-white outline-none shadow-md"
              value={question}
              onChange={handleChange}
              autoFocus
            />
            {question && (
              <button
                type="button"
                className="absolute top-1 right-2 text-gray-500"
                onClick={handleClear}
              >
                <CloseIcon />
              </button>
            )}
          </div>
          <button
            type="submit"
            className="ml-4 bg-gray-900 text-white p-3 rounded-full shadow-md"
          >
            <SendIcon />
          </button>
        </form>
      </footer>
    </div>
  );
}

export default App; */

/* import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
  ConversationHeader,
  TypingIndicator,
  MessageSeparator,
} from "@chatscope/chat-ui-kit-react";
const joeIco = "./botIcon.jpg";
const localSender = "me";
function App() {
  return (
    <>
      <div
        style={{
          height: "90vh",
        }}
      >
        <ChatContainer>
          <MessageList
            typingIndicator={<TypingIndicator content="Bot is typing" />}
          >
            <MessageSeparator content="Saturday, 30 November 2019" />

            <Message
              model={{
                message: "Hello my friend",

                sentTime: "15 mins ago",

                sender: "Joe",

                direction: "incoming",

                position: "single",
              }}
            >
              <Avatar src={joeIco} name={"Joe"} />
            </Message>

            <Message
              model={{
                message: "Hello my friend",

                sentTime: "15 mins ago",

                sender: localSender,

                direction: "outgoing",

                position: "single",
              }}
            />
            <Message
              model={{
                message: "Hello my friend",

                sentTime: "15 mins ago",

                sender: "Joe",

                direction: "incoming",

                position: "single",
              }}
            >
              <Avatar src={joeIco} name={"Joe"} />
            </Message>
          </MessageList>
          <MessageInput placeholder="Type message here" />
        </ChatContainer>
      </div>
    </>
  );
}
export default App; */

import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { useState, useEffect } from "react";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
  TypingIndicator,
  MessageSeparator,
} from "@chatscope/chat-ui-kit-react";
import { translateText } from "./TranslationService";
import joeIco from "./icon.png";

function App() {
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [typingIndicator, setTypingIndicator] = useState(false);

  const handleSubmit = async (event) => {
    setIsLoading(true);
    // Add user's question to the chat
    const newMessages = [
      ...messages,
      {
        message: question,
        sender: "me",
        direction: "outgoing",
        sentTime: "just now",
        position: "single",
      },
    ];
    setMessages(newMessages);

    // Translate the question to English before sending it to GPT-3
    const translatedQuestion = await translateText(question, "en");

    const prompt = `${translatedQuestion}`;

    // Add typing message from bot
    setTypingIndicator(true);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const result = data.choices[0].message.content;
    console.log(result);
    const answer_from_gpt = await translateText(result, "ml");

    // Replace bot's last message (Typing...) with the actual answer
    newMessages.push({
      message: answer_from_gpt,
      sender: "Bot",
      direction: "incoming",
      sentTime: "just now",
      position: "single",
    });
    setMessages(newMessages);
    setIsLoading(false);
    setTypingIndicator(false);
  };

  return (
    <div style={{ height: "90vh" }}>
      <MainContainer>
        <ChatContainer>
          <MessageList>
            <MessageSeparator content="Monday, 25 May 2023" as="h1" />
            {messages.map((message, index) => (
              <Message key={index} model={message} avatarPosition="tl">
                {message.sender === "Bot" && (
                  <Avatar src={joeIco} name={"Bot"} size="sm" />
                )}
                <MessageSeparator content="Monday, 23 December 2019" as="h1" />
              </Message>
            ))}
            {typingIndicator && (
              <Message
                typingIndicator={<TypingIndicator content="Emily is typing" />}
                model={{
                  message: `ഒന്ന് ആലോയിക്കട്ടെ... വെയ്റ്റ് ...`,
                  sender: "Bot",
                  direction: "incoming",
                  position: "single",
                }}
              >
                <Avatar src={joeIco} name={"Bot"} size="sm" />
                <TypingIndicator content="Bot is typing" />
              </Message>
            )}
          </MessageList>
          <MessageInput
            autoFocus
            placeholder="Type message here"
            attachButton={false}
            onChange={setQuestion}
            onSend={handleSubmit}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}

export default App;
