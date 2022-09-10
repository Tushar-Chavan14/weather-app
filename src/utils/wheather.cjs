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
      const { weather_descriptions, temperature, feelslike } = res.body.current;
      callback(
        undefined,
        weather_descriptions[0] +
          ".it is currently " +
          temperature +
          " and feels like " +
          feelslike
      );
    }
  });
};

module.exports = wheather;
