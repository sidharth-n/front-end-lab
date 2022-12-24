const text_area = document.querySelector(".type");
const s_btn = document.querySelector(".send-btn");
const r_msg = document.querySelector(".r-msg");
const s_msg = document.querySelector(".s-msg");
const main_con = document.querySelector(".main-container");
const main_div = document.querySelector(".main");
const popup = document.querySelector(".popup");
const popup2 = document.querySelector(".room-join");
const popup3 = document.querySelector(".share-link");
const create_room_btn = document.querySelector(".cr-btn");
const join_btn = document.querySelector(".j-btn");
const room_name = document.querySelector(".sender-name");
const overlay = document.querySelector(".overlay");
const senderName = document.querySelector(".snder-name");
const roomTitle = document.querySelector(".room-title");
const color1 = document.querySelector(".c1");
const color2 = document.querySelector(".c2");
const color3 = document.querySelector(".c3");
const color4 = document.querySelector(".c4");
const color5 = document.querySelector(".c5");
const colorSelected = document.querySelector(".colorPicked");
const nickName = document.querySelector(".user-name");
const roomName = document.querySelector(".room-name");
const shareBTn = document.querySelector(".add-btn");
const closeBtn = document.querySelector(".close-btn");
const shareLinkArea = document.querySelector(".share-link-text");
let msg = {};
let chat = [];
let pos = 0;
let no = 0;
let prev_msg = "";
let _id = "sidtesting123";
let url = "";
let userColor = "default";
let userName = "Stranger";
let new_url = "";
const queryString = window.location.search;
if (queryString != "") {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  _id = params.id;
  room_name.innerText = `${params.rn}`;
  popup.style.display = "none";
  popup2.style.display = "flex";
  overlay.style.display = "block";
  roomTitle.innerText = `${params.rn}`;
}

const vw = Math.max(
  document.documentElement.clientWidth || 0,
  window.innerWidth || 0
);
const vh = Math.max(
  document.documentElement.clientHeight || 0,
  window.innerHeight || 0
);
popup.style.top = `${(vh - 200) / 2 - popup.offsetHeight / 2}px`;
popup.style.left = `${(vw - popup.offsetWidth) / 2}px`;
main_div.style.width = `${vw}px`;
main_div.style.height = `${vh}px`;
popup2.style.top = `${(vh - 200) / 2 - popup2.offsetHeight / 2}px`;
popup2.style.left = `${(vw - popup2.offsetWidth) / 2}px`;
text_area.focus();

const getId = function (_id = null) {
  const getRandomId = () => {
    const randomChar = () =>
      String.fromCharCode(97 + Math.floor(26 * Math.random()));
    return [1, 1, 1]
      .map((_) => {
        return [1, 1, 1].map(randomChar).join("");
      })
      .join("-");
  };

  if (!_id) {
    _id = getRandomId();
  }

  return _id;
};

create_room_btn.addEventListener("click", () => {
  if (roomName.value != "") {
    _id = getId();
    url = `https://textdb.dev/api/data/${_id}`;
    const value = JSON.stringify("");
    fetch(url, {
      body: value,
      headers: { "Content-Type": "text/plain" },
      method: "POST",
    });
    /* room_link_area.innerText = `${window.location.href}?${_id}`; */
    create_room_btn.style.boxShadow = "none";
    create_room_btn.innerText = "room created";
    /* popup.style.left = `${(vw - popup.offsetWidth) / 2}px`; */
    new_url = `${window.location.href}?id=${_id}&rn=${roomName.value}`;
    window.location = new_url;

    popup.style.display = "none";
    popup2.style.display = "flex";
    popup2.style.top = `${(vh - 200) / 2 - popup2.offsetHeight / 2}px`;
    popup2.style.left = `${(vw - popup2.offsetWidth) / 2}px`;
    /*   overlay.style.height = "0px";
    overlay.style.width = "0px"; */
  } else {
    roomName.style.border = "0.5px solid red";
  }
});

color1.addEventListener("click", () => {
  userColor = "#c71717";
  colorSelected.innerText = "red";
  colorSelected.style.color = "#c71717";
});
color2.addEventListener("click", () => {
  userColor = "#6da020";
  colorSelected.innerText = "Green";
  colorSelected.style.color = "#6da020";
});
color3.addEventListener("click", () => {
  userColor = "#bd5e1f";
  colorSelected.innerText = "Orange";
  colorSelected.style.color = "#bd5e1f";
});
color4.addEventListener("click", () => {
  userColor = "#146fc4";
  colorSelected.innerText = "Blue";
  colorSelected.style.color = "#146fc4";
});
color5.addEventListener("click", () => {
  userColor = "#831fbd";
  colorSelected.innerText = "Violet";
  colorSelected.style.color = "#831fbd";
});

join_btn.addEventListener("click", () => {
  console.log("join btn clicked");
  if (nickName.value == "") {
    nickName.style.border = `1px solid red`;
  } else if (colorSelected.innerText == "Pick a color") {
    colorSelected.style.color = "red";
  } else {
    popup2.style.display = "none";
    overlay.style.display = "none";
    userName = nickName.value;
    console.log("nickname selected : " + nickName.value);
  }
});

const rand_colors = [
  "rgb(180, 243, 244)",
  "rgb(255, 153, 153)",
  "rgb(242, 242, 145)",
  "rgb(200, 139, 139)",
  "rgb(175, 175, 238)",
  "rgb(236, 173, 111)",
  "rgb(225, 227, 146)",
  "rgb(207, 149, 245)",
];

const random_color = () => {
  let rand = Math.floor(Math.random() * 8);
  return rand_colors[rand];
};

const fetcher = () => {
  url = `https://textdb.dev/api/data/${_id}`;
  const read = () => fetch(url);
  const write = (data) => {
    fetcher()
      .read()
      .then((r) => r.json())
      .then((j) => {
        let serverMsg = j || [];
        console.log(serverMsg);
        serverMsg.push(data);
        const value = JSON.stringify(serverMsg);

        fetch(url, {
          body: value,
          headers: { "Content-Type": "text/plain" },
          method: "POST",
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  };

  return { read: read, write: write };
};
const initial_loader = () => {
  fetcher()
    .read()
    .then((r) => r.json())
    .then((j) => {
      for (let i = 0; i < j.length - 1; i++) {
        add_msg(j[i].text, j[i].time, j[i].name, j[i].color);
      }
    })
    .catch((error) => {
      console.log("Nothing initial to load");
    })
    .finally(() => {});
};
initial_loader();

const updater = () => {
  fetcher()
    .read()
    .then((r) => r.json())
    .then((j) => {
      let last_msg = j[j.length - 1];
      if (prev_msg != last_msg.text) {
        add_msg(last_msg.text, last_msg.time, last_msg.name, last_msg.color);
        console.log(last_msg.text);
        prev_msg = last_msg.text;
      }
    })
    .catch((error) => {
      console.log("no messages yet");
    })
    .finally(() => {});
};
const add_msg = (new_msg, s_time, s_name, s_color) => {
  const msg_el = document.createElement("div");
  const time_el = document.createElement("span");
  const name_el = document.createElement("span");
  time_el.classList.add("time");
  name_el.classList.add("snder-name");
  if (s_name == userName) {
    msg_el.classList.add("s-msg", "msg");
  } else {
    msg_el.classList.add("r-msg", "msg");
  }
  msg_el.textContent = new_msg;
  time_el.textContent = s_time;
  name_el.textContent = s_name;
  main_con.appendChild(msg_el);
  msg_el.appendChild(time_el);
  msg_el.appendChild(name_el);
  name_el.style.color = s_color;
  msg_el.style.border = `0.5px solid${s_color}`;
  main_con.scrollTop = main_con.scrollHeight;
};

shareBTn.addEventListener("click", () => {
  new_url = window.location;
  navigator.clipboard.writeText(new_url).then(() => {
    console.log("text copied to clipboard : " + new_url);
  });
  overlay.style.display = "block";
  popup3.style.display = "flex";
  popup3.style.top = `${(vh - 200) / 2 - popup3.offsetHeight / 2}px`;
  popup3.style.left = `${(vw - popup3.offsetWidth) / 2}px`;
  shareLinkArea.innerText = new_url;
});

closeBtn.addEventListener("click", () => {
  overlay.style.display = "none";
  popup3.style.display = "none";
});

s_btn.addEventListener("click", () => {
  if (text_area.value != "") {
    const time = new Date();
    timeString = `${time.getHours()}:${time.getMinutes()}`;
    msg.no = no;
    msg.text = text_area.value;
    msg.time = timeString;
    msg.name = userName;
    msg.color = userColor;
    chat.push(msg);
    fetcher().write(msg);
    no++;
    msg = {};
    text_area.value = "";
  }
});

setInterval(updater, 500);
