import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

//JokesAPI constants
const baseURL = "https://v2.jokeapi.dev";
const categories = ["Programming", "Misc", "Pun", "Spooky", "Christmas"];
const params = ["blacklistFlags=nsfw,religious,racist", "idRange=0-100"];

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      `${baseURL}/joke/${categories.join(",")}?${params.join("&")}`
    );
    const result = response.data;
    // console.log(response.data);
    res.render("index.ejs", {
      category: JSON.stringify(result.category),
      joke: JSON.stringify(result.setup),
      answer: JSON.stringify(result.delivery),
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
