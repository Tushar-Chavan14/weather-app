console.log("loaded");

const getweather = document.querySelector("form");
const input = document.querySelector("input");
const msg1 = document.querySelector("#msg1");
const msg2 = document.querySelector("#msg2");
const error = document.getElementById("error");

getweather.addEventListener("submit", (e) => {
  e.preventDefault();

  msg1.textContent = "loading...";

  const loaction = input.value;

  fetch(`http://localhost:3000/weather?address=${loaction}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        msg1.textContent= ''
        error.textContent = data.error;
      } else {
        msg1.textContent = ` ${data.city} ${data.state}`;
        msg2.textContent = `${data.forecast}`;
      }
    });
  });
});
