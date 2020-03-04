const express = require("express");
const nunjucks = require("nunjucks");
const videos = require("./data");

const server = express();

server.use(express.static("public"));

server.set("view engine", "njk");

nunjucks.configure("views", {
  express: server,
  autoescape: false,
  noCache: true
});

server.get("/", (req, res) => {
  const about = {
    avatar_url:
      "https://avatars1.githubusercontent.com/u/53025782?s=400&u=f1ffa8eaccb8545222b7c642532161f11e74a03d&v=4",
    name: "Elton Lazzarin",
    role: "Fullstack Developer | Node.js | ReactJS | React Native",
    description:
      "Started programming in C++, with knowledge in HTML5, CSS3, JavaScript languages and is currently improving his knowledge of Node.js, ReactJS and React Native.",
    links: [
      {
        name: "Github",
        url: "https://github.com/eltonlazzarin"
      },
      {
        name: "Linkedin",
        url: "https://linkedin.com/in/eltonlazzarin"
      }
    ]
  };

  return res.render("about", { about });
});

server.get("/portfolio", (req, res) => {
  return res.render("portfolio", { items: videos });
});

server.get("/video", (req, res) => {
  const id = req.query.id;

  const video = videos.find(video => {
    return video.id === id;
  });

  if (!video) {
    return res.send("Video not found!");
  }

  return res.render("video", { item: video });
});

server.listen(5000, () => {
  console.log("Server is running...");
});
