import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import hbs from "hbs";
import geocode from "./utils/geocode.js";
import forecast from "./utils/forecast.js";

const app = express();

// Defined paths for express config
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlebars and view engine
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Saif",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Saif",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Saif",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide an address",
    });
  }

  geocode(
    req.query.address,
    ({ latitude, longitude, location } = {}, error) => {
      if (error) {
        return res.send({ error: error.message });
      }

      forecast(latitude, longitude, (forecastData, error) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    },
  );
});

app.get("/product", (req, res) => {
  if (!req.query.search) {
    return res.send({ error: "Please provide a search" });
  }

  console.log(req.query);
  res.send({
    product: [],
  });
});

app.get("/help/*splat", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Saif",
    errorMessage: "Help article not found",
  });
});

app.get("*splat", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Saif",
    errorMessage: "Page Not Found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
