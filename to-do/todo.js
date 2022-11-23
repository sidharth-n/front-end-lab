const btn = document.querySelector("button");
const input = document.querySelector("input");
const list = document.querySelector("ol");

btn.addEventListener("click", () => {
  const new_item = input.value;
  input.value = "";
  const listItem = document.createElement("li");
  const listText = document.createElement("span");
  const remove_button = document.createElement("button");
  remove_button.setAttribute("class", "rmBtn");

  listItem.appendChild(listText);
  listText.textContent = new_item;
  listItem.appendChild(remove_button);
  remove_button.textContent = "-";
  list.appendChild(listItem);

  remove_button.addEventListener("click", () => {
    list.removeChild(listItem);
  });
});
