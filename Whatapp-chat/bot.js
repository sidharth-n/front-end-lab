const text_area = document.querySelector(".type");
const s_btn = document.querySelector(".send-btn");
const r_msg = document.querySelector(".r-msg");
const s_msg = document.querySelector(".s-msg");
const main_con = document.querySelector(".main-container");
let msg = "";
let pos = 0;
let started = 0;

const fetcher = () => {
  const url = `https://textdb.dev/api/data/sid123007`;
  const read = () => fetch(url);
  const write = (data) => {
    const value = JSON.stringify(data);

    fetch(url, {
      body: value,
      headers: { "Content-Type": "text/plain" },
      method: "POST",
    });
  };
  return { read: read, write: write };
};

const updater = () => {
  if (started == 1) {
    fetcher()
      .read()
      .then((r) => r.json())
      .then((j) => {
        if (msg != j) {
          consle.log(j.split("---")[0]);
          add_msg(j);
          msg = j;
        }
      })
      .catch((_) => {
        console.log("some error");
      })
      .finally(() => console.log("Message read successfully"));
  }
};

const add_msg = (new_msg) => {
  const el = document.createElement("div");
  if (pos == 0) {
    el.classList.add("s-msg", "msg");
    pos = 1;
  } else {
    el.classList.add("r-msg", "msg");
    pos = 0;
  }
  el.textContent = new_msg;
  main_con.appendChild(el);
};

s_btn.addEventListener("click", () => {
  if (text_area.value != "") {
    started = 1;
    const time = new Date();
    timeString = `${time.getMinutes()}:${time.getSeconds()}`;
    fetcher().write(text_area.value + "---" + timeString);
    text_area.value = "";
  }
});

setInterval(updater, 2000);
