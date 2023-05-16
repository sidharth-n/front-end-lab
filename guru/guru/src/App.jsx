import { useState } from "react";
import Quote from "./components/Quote.jsx";

function App() {
  const [issue, setIssue] = useState("");
  const [quote, setQuote] = useState({});

  const handleChange = (event) => {
    setIssue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const prompt = `Retrieve a quote from Bhagavad Gita relevant to the life issue: "${issue}". Provide a verse and a short explanation of how it addresses the issue. give them back as a json file which contains only two keys -one is the verse and next is its explanation`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer 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`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    const result = data.choices[0].message.content;
    //console.log(result);
    const parsedResult = JSON.parse(result);
    const { verse, explanation } = parsedResult;
    console.log(verse);

    setQuote({ verse, explanation });
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mt-8 mb-4">Guru</h1>
      <form onSubmit={handleSubmit} className="mb-8">
        <input
          type="text"
          placeholder="Your life issue"
          className="w-full p-4 border border-gray-300 rounded mb-4"
          value={issue}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded font-bold"
        >
          Seek Advice
        </button>
      </form>
      {quote.verse && (
        <Quote verse={quote.verse} explanation={quote.explanation} />
      )}
    </div>
  );
}

export default App;

//Bearer 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
