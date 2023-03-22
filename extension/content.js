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
    // Create a popup div
    const popupDiv = document.createElement("div");
    popupDiv.id = "popupDiv";

    // Create an iframe element and set its properties
    const iframe = document.createElement("iframe");
    iframe.src = "https://quizzapp-v4.netlify.app/";
    iframe.id = "iframe";
    // Append the iframe to the popup div
    popupDiv.appendChild(iframe);

    // Create a close button element and append it to the popup div
    const topBar = document.createElement("div");
    topBar.id = "top-bar";
    topBar.innerHTML = `<div id='title'>GPTube</div><button id='closeBtn'><svg id='close-svg' xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
viewBox="0 0 24 24" 
fill="none" stroke="currentColor" 
stroke-width="2" stroke-linecap="round" 
stroke-linejoin="round"><line x1="18" 
y1="6" x2="6" y2="18"></line><line x1="6" 
y1="6" x2="18" y2="18"></line>
</svg>
</button>`;
    popupDiv.appendChild(topBar);

    // Make the popup div draggable
    let isDragging = false;
    let mouseOffsetX = 0;
    let mouseOffsetY = 0;

    popupDiv.addEventListener("mousedown", (event) => {
      isDragging = true;
      mouseOffsetX = event.clientX - popupDiv.offsetLeft;
      mouseOffsetY = event.clientY - popupDiv.offsetTop;
    });

    document.addEventListener("mousemove", (event) => {
      if (isDragging) {
        popupDiv.style.left = event.clientX - mouseOffsetX + "px";
        popupDiv.style.top = event.clientY - mouseOffsetY + "px";
      }
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;
    });

    // Add the popup div to the body
    document.body.appendChild(popupDiv);

    // Add event listener to close button once it's been added to the DOM
    const closeButton = document.querySelector("#closeBtn");
    closeButton.addEventListener("click", () => {
      popupDiv.remove();
    });
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
