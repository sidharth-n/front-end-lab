/* function addHelloButton() {
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
 */

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
    popupDiv.id = "askButton";
    popupDiv.id = "popupDiv";
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
