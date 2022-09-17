const getweather = document.querySelector("form");
const input = document.querySelector("input");
const msg1 = document.querySelector("#msg1");
const error = document.getElementById("error");
const container = document.getElementById("con");
const img = document.getElementById("img");
const loc = document.getElementById("loc");
const descrip = document.getElementById("desc");

container.style.display = "none";

getweather.addEventListener("submit", (e) => {
  e.preventDefault();

  msg1.textContent = "loading...";

  const loaction = input.value;

  fetch(`/weather?address=${loaction}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        msg1.textContent = "";
        error.textContent = data.error;
      } else {
        msg1.textContent = "";
        error.textContent = "";
        const {
          name,
          state,
          icon,
          temperature,
          feelslike,
          desc,
          wind_speed,
          wind_dir,
        } = data;
        container.style.display = "";
        img.src = icon;
        loc.textContent = name + " " + state;
        descrip.textContent =
          desc +
          " ,Curently the temprature is " +
          temperature +
          "°C" +
          " it feels like " +
          feelslike +
          "°C" +
          " wind speed is " +
          wind_speed +
          " in the direction " +
          "'" +
          wind_dir +
          "'";
      }
    });
  });
});
