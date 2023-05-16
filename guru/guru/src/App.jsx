import { useState } from "react";
import Quote from "./components/Quote";

function App() {
  const [issue, setIssue] = useState("");
  const [quote, setQuote] = useState({});

  const handleChange = (event) => {
    setIssue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const prompt = `Retrieve a quote from Bhagavad Gita relevant to the life issue: "${issue}". Provide a verse and a short explanation of how it addresses the issue.`;

    const response = await fetch(
      "https://api.openai.com/v1/engines/davinci-codex/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer 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`,
        },
        body: JSON.stringify({
          prompt,
          max_tokens: 150,
          n: 1,
          stop: null,
          temperature: 1,
        }),
      }
    );

    const data = await response.json();
    console.log(data);
    const result = data.choices[0].text.trim();
    const [verse, explanation] = result.split("\n\n");
    setQuote({ verse, explanation });
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mt-8 mb-4">Spiritual App</h1>
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
          Get Advice
        </button>
      </form>
      {quote.verse && (
        <Quote verse={quote.verse} explanation={quote.explanation} />
      )}
    </div>
  );
}

export default App;
