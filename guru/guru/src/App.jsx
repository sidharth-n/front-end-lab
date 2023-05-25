import { useState, useEffect, useRef } from "react";
import Quote from "./components/Quote.jsx";
import SendIcon from "./SendIcon";
import CloseIcon from "./CloseIcon";
import { TypeAnimation } from "react-type-animation";
import { translateText } from "./TranslationService";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showCards, setShowCards] = useState(true);
  const quoteContainerRef = useRef(null);

  const handleChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setShowCards(false);

    // Translate the question to English before sending it to GPT-3
    const translatedQuestion = await translateText(question, "en");

    const prompt = ` ${translatedQuestion}.`;
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
    //const parsedResult = JSON.parse(result);
    console.log(result);
    const answer_from_gpt = await translateText(result, "ml");

    setAnswer(answer_from_gpt);
    setIsLoading(false);
  };

  const handleClear = () => {
    setQuestion("");
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
    <div className="flex flex-col h-screen bg-black text-white font-sans">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
      />
      <main className="flex-1 overflow-auto p-4 mt-2 mb-24">
        <div className="quote-container flex justify-center items-center">
          {isLoading ? (
            <div className="text-center">
              <TypeAnimation
                sequence={[
                  "Connecting to Bot...",
                  1000,
                  "Asking question...",
                  1000,
                  "Getting reply...",
                  1000,
                ]}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
                style={{ fontSize: "1em", display: "inline-block" }}
              />
            </div>
          ) : (
            answer && <Quote answer={answer} />
          )}
        </div>
        {showCards && (
          <div className="flex-cols justify-around items-center mx-4">
            <div className="card mb-4 bg-gray-800 shadow-lg p-4 rounded">
              വൈവിധ്യമാർന്ന ചോദ്യങ്ങളിലും സംഭാഷണങ്ങളിലും നിങ്ങളെ സഹായിക്കാൻ
              കഴിയുന്ന നൂതന ഭാഷാ മോഡലായ ChatGPT യുടെ കഴിവുകൾ അനുഭവിക്കുക.
            </div>
            <div className="card mb-4 bg-gray-800 shadow-lg p-4 rounded">
              ചോദ്യങ്ങൾക്ക് ഉത്തരം നൽകുന്നത് മുതൽ വിവിധ വിഷയങ്ങൾ ചർച്ച
              ചെയ്യുന്നത് വരെ, വിജ്ഞാനപ്രദവും സഹായകരവുമായ പ്രതികരണങ്ങൾ
              നൽകുന്നതിനാണ് ഞങ്ങളുടെ AI രൂപകൽപ്പന ചെയ്തിരിക്കുന്നത്.
            </div>
            <div className="card mb-4 bg-gray-800 shadow-lg p-4 rounded">
              നിങ്ങളുടെ സന്ദേശം ഇംഗ്ലീഷിൽ ടൈപ്പുചെയ്യാൻ ആരംഭിക്കുക, നമുക്ക്
              ഒരുമിച്ച് പര്യവേക്ഷണം ചെയ്യാം!
            </div>
          </div>
        )}
      </main>
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

export default App;
