/* // App.jsx
import React, { useEffect, useState } from "react";
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
import TextToSpeech from "./TextToSpeech";
import { translateText } from "./TranslationService";
import joeIco from "./icon.png";

function App() {
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [typingIndicator, setTypingIndicator] = useState(false);

  useEffect(() => {
    const storedMessages = localStorage.getItem("chatHistory");
    if (storedMessages) {
      console.log("Loading chat history" + storedMessages);
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);

  const handleSubmit = async (event) => {
    setIsLoading(true);
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

    const translatedQuestion = await translateText(question, "en");
    const prompt = `${translatedQuestion}`;

    setTypingIndicator(true);

    const conversationHistory = messages.slice(-6).map((message) => ({
      role: message.sender === "me" ? "user" : "assistant",
      content: message.message,
    }));

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [...conversationHistory, { role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const result = data.choices[0].message.content;
    console.log(result);
    const answer_from_gpt = result;

    newMessages.push({
      message: <TextToSpeech text={answer_from_gpt} />,
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
              </Message>
            ))}
            {typingIndicator && (
              <Message
                model={{
                  message: `ഒന്ന് ആലോയിക്കട്ടെ... വെയ്റ്റ് ...`,
                  sender: "Bot",
                  direction: "incoming",
                  sentTime: "just now",
                  position: "single",
                }}
                avatarPosition="tl"
              >
                <Avatar src={joeIco} name={"Bot"} size="sm" />
                <TypingIndicator size="sm" />
              </Message>
            )}
          </MessageList>
          <MessageInput
            placeholder="നിങ്ങളുടെ ചോദ്യം ഇവിടെ ചേർക്കുക"
            onChange={(val) => setQuestion(val)}
            onSend={() => handleSubmit(question)}
            loading={isLoading}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}

export default App; */
// App.jsx
// App.jsx
import React, { useState } from "react";
import TextToSpeech from "./TextToSpeech";

const App = () => {
  const [inputText, setInputText] = useState("");
  const [textToSpeak, setTextToSpeak] = useState("");

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSend = () => {
    setTextToSpeak(inputText);
  };

  return (
    <div>
      <input
        type="text"
        value={inputText}
        onChange={handleChange}
        placeholder="Enter text here"
      />
      <button onClick={handleSend}>Send</button>
      <TextToSpeech text={textToSpeak} />
    </div>
  );
};

export default App;
