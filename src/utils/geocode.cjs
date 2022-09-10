const request = require("postman-request");

const geocode = (address, callback) => {
  const geocode_url =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    encodeURIComponent(address) +
    "&appid=c4a9fd4edef5b1fd931935d60633c9c1";

  request({ url: geocode_url, json: true }, (e, res) => {
    if (e) {
      callback(
        "Their was error connecting to the server please check your internet connection"
      );
    } else if (res.body.cod || res.body.length === 0) {
      callback("unable to find the loaction");
    } else {
      const [{ name, state, lat, lon }] = res.body;
      callback(undefined, {
        city: name,
        state: state,
        lat: lat,
        lon: lon,
      });
    }
  });
};

module.exports = geocode;
