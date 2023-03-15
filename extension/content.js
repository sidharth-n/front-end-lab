function addHelloButton() {
  const subscribeButton = document.querySelector("#subscribe-button");
  if (!subscribeButton) return;

  const helloButton = document.createElement("button");
  helloButton.id = "askButton";
  helloButton.innerText = "Ask";
  subscribeButton.parentNode.insertBefore(
    helloButton,
    subscribeButton.nextSibling
  );
  helloButton.addEventListener("click", () => {
    alert("button clicked");
  });
}

// Observe changes to the body of the YouTube page
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    // Check if the subscribe button has been updated
    if (mutation.target.id === "subscribe-button") {
      if (document.querySelector("#askButton")) return;
      addHelloButton();
    }
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
