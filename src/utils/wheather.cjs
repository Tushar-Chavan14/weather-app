const request = require("postman-request");

const wheather = (lat, lon, callback) => {
  const key = "28fc76d8f1457ff5e698362e43dc7c5";
  const url =
    "http://api.weatherstack.com/current?access_key=" +
    key +
    "6&query=" +
    lat +
    "," +
    lon +
    "&units=m";

  request({ url: url, json: true }, (e, res) => {
    if (e) {
      callback("their was error fetching reqest", undefined);
    } else if (res.body.error) {
      callback("unable to find the loaction", undefined);
    } else {
      const {
        temperature,
        feelslike,
        weather_descriptions,
        weather_icons,
        wind_speed,
        wind_dir,
      } = res.body.current;
      callback(undefined, {
        desc: weather_descriptions[0],
        temperature,
        feelslike,
        icon: weather_icons[0],
        wind_speed,
        wind_dir,
      });
    }
  });
};

module.exports = wheather;
