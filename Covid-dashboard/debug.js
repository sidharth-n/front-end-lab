const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
const value = params.mode;
const debug_nav = document.querySelector(".debug-nav");
if (value == "1") {
  debug_nav.style.display = "flex";
} else {
  debug_nav.style.display = "none";
}
