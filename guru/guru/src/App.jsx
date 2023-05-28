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

  // Load initial messages from local storage
  useEffect(() => {
    const storedMessages = localStorage.getItem("chatHistory");
    if (storedMessages) {
      console.log("Loading chat history" + storedMessages);
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  // Update local storage whenever messages change
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);

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

    // Create conversation history for context
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
              </Message>
            ))}
            {typingIndicator && (
              <Message
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
