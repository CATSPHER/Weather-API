import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

const APIkey="bd5f14e51d1a8da8ca28d17caf3892fa";

// app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let cityname;
let tempi;
app.get("/", async (req, res) => {
    try {
        res.render("index.ejs", { city: cityname, temp: tempi });
  
      } catch (error) {
          res.render("index.ejs", {
              city: null,
              temp: null,
              error: "City not found. Please try again.",
          });
      }
});

app.post("/", async (req, res) => {
    try {
      console.log(req.body);
      cityname = req.body.city;
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${APIkey}&units=metric`
      );
      const result = response.data;
      cityname=result.name;
      tempi= result.main.temp;

    } catch (error) {
        res.render("index.ejs", {
            city: null,
            temp: null,
            error: "City not found. Please try again.",
        });
    }

    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});