const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./models");

const { User } = require("./models");

const app = express();

dotenv.config();
db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/user/join", async (req, res, next) => {
  try {
    const check = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    console.log(check);
    if (check) {
      return res.status(403).send("이미 사용중인 아이디입니다.");
    }
    const result = await User.create(req.body);
    return res.status(200).send("success");
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
});

app.listen(3065, () => {
  console.log("server start");
});
