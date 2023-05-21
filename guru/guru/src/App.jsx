import { useState } from "react";
import Quote from "./components/Quote.jsx";
import SendIcon from "./SendIcon";

function App() {
  const [issue, setIssue] = useState("");
  const [quote, setQuote] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setIssue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const prompt = `Imagine you are a indian spiritual guru.give me a very wise and knowledgable reply to my life issue: "${issue}".you can refer to bhavat gita , upanishads, yoga sutras, vedas and any indian spiritual teachings of any spiritrual masters.the reply should be quoted and should resemble the language and dilect of a guru.this is just for an experiment. you don't have to mention an caution message along. please give the reply in a json format.`;

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
    const parsedResult = JSON.parse(result);
    const { verse, explanation } = parsedResult;

    setQuote({ verse, explanation });
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <header className="p-4 mx-auto">
        <h1 className="text-sm font-bold mt-0 mb-4">Krishna Online</h1>
      </header>
      <main className="flex-1 overflow-auto p-4">
        {isLoading ? (
          <div className="flex flex-col items-center">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
            <p>Connecting to Krishna...</p>
          </div>
        ) : (
          quote.verse && (
            <Quote verse={quote.verse} explanation={quote.explanation} />
          )
        )}
        <div className="flex flex-col items-center">
          <div className="card">This is based on the Bhagavad Gita.</div>
          <div className="card">It is completely fictitious.</div>
          <div className="card">
            Ask a question and receive a verse from the Gita as guidance.
          </div>
        </div>
      </main>
      <footer className="p-4 bg-gray-800">
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            type="text"
            placeholder="Your life issue"
            className="flex-grow p-4 bg-gray-800 border border-gray-600 rounded text-white"
            value={issue}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="ml-4 bg-blue-500 text-white p-2 rounded-full"
          >
            <SendIcon />
          </button>
        </form>
      </footer>
    </div>
  );
}

export default App;

//Bearer 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
