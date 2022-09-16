import express from "express";
import { URL } from "url";
import hbs from "hbs";
import geocode from "./utils/geocode.cjs";
import wheather from "./utils/wheather.cjs";

const app = express();
const port = process.env.PORT || 3000;

const publicPath = new URL("../public/", import.meta.url).pathname;
const viewsPath = new URL("../templates/views/", import.meta.url).pathname;
const partialsPath = new URL("../templates/partials/", import.meta.url)
  .pathname;

app.use(express.static(publicPath));

//set up handelbars and veiws

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.get("/", (req, res) => {
  res.render("index", {
    title: "wheather app",
    name: "tushar",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    helptxt: "Just type out the location and hit the search button and you'll find your forecast displayed.",
    name: "tushar",
  });
});

app.get("/weather", (req, res) => {
  const loaction = req.query.address;

  if (!loaction) {
    return res.send({
      error: "No address provided",
    });
  }

  geocode(loaction, (error, { lat, lon, city, state } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }

    wheather(lat, lon, (error, forecastdata) => {
      if (error) {
        return res.send({
          error,
        });
      }

      res.send({
        city,
        state,
        forecast: forecastdata,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    errormsg: "The help article not found",
    name: "tushar",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    errormsg: "The page not found",
    name: "tushar",
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
