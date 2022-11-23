let index = 0;
const buy = document.querySelector(".buy");

function sold_out() {
  buy.innerText = "oops !! sold Out";
  buy.style.color = "red";
  buy.style.fontSize = "25px";
}

function reset() {
  buy.innerText = "Buy Now";
  buy.style.fontSize = "2rem";
  buy.style.color = "White";
  document.querySelector(".product").src = "Men-Shoes.png";
  index = 0;
}
const image_array = ["shoe1.jpg", "shoe2.jpg", "shoe3.png", "shoe4.webp"];

function toggle() {
  console.log("toggle is working");
  if (index < image_array.length)
    document.querySelector(".product").src = image_array[count];
  index++;
}
