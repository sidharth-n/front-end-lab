import { useState, useEffect, useRef } from "react";
import Quote from "./components/Quote.jsx";
import SendIcon from "./SendIcon";
import CloseIcon from "./CloseIcon";
import { TypeAnimation } from "react-type-animation";

function App() {
  const [issue, setIssue] = useState("");
  const [quote, setQuote] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showCards, setShowCards] = useState(true);
  const quoteContainerRef = useRef(null);

  const handleChange = (event) => {
    setIssue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setShowCards(false);

    const prompt = `Retrieve a quote from Bhagavad Gita relevant to the life issue: "${issue}". Provide a verse and a short explanation of how it addresses the issue. give them back as a json file which contains only two keys -one is the verse and next is its explanation`;

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

  const handleClear = () => {
    setIssue("");
  };

  useEffect(() => {
    // Disable body scrolling on mobile
    document.body.style.overflow = "hidden";

    // Re-enable body scrolling when component is unmounted
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
      />
      {/*   <header className="p-4 mx-auto">
        <h1 className="text-sm font-bold mt-0 mb-4">Krishna Online</h1>
      </header> */}
      <main
        className="flex-1 overflow-auto p-4 mt-2 mb-24"
        ref={quoteContainerRef}
      >
        <div className="quote-container mt-16">
          {isLoading ? (
            <div className="flex flex-col items-center">
              <TypeAnimation
                sequence={[
                  "Connecting to Krishna...",
                  1000,
                  "Please wait for a moment...",
                  1000,
                  "Finding the perfect quote...",
                  1000,
                ]}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
                style={{ fontSize: "1em", display: "inline-block" }}
              />
            </div>
          ) : (
            quote.verse && (
              <Quote verse={quote.verse} explanation={quote.explanation} />
            )
          )}
        </div>
        {showCards && (
          <div className="flex-cols justify-around items-center mx-4">
            <div className="card mb-4 bg-gray-800 shadow-lg p-4 rounded">
              This is based on the Bhagavad Gita.
            </div>
            <div className="card mb-4 bg-gray-800 shadow-lg p-4 rounded">
              It is completely fictitious.
            </div>
            <div className="card mb-4 bg-gray-800 shadow-lg p-4 rounded">
              Ask a question and receive a verse from the Gita as guidance.
            </div>
          </div>
        )}
      </main>
      <footer className="fixed bottom-0 w-full p-4">
        <form onSubmit={handleSubmit} className="flex items-center">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Your life issues"
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-xl text-white outline-none"
              value={issue}
              onChange={handleChange}
              autoFocus
            />
            {issue && (
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
            className="ml-4 bg-gray-900 text-white p-3 rounded-full"
          >
            <SendIcon />
          </button>
        </form>
      </footer>
    </div>
  );
}

export default App;
