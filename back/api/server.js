const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require("./config/db");
const routes = require("./routes");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("tiny"));
app.use(cors());

app.use("/api", routes);

const port = process.env.PORT || 3001;

db.sync({ force: false }).then(() => {
  app.listen(port, () => {
    console.log("Escuchando en el puerto ", port);
  });
});
