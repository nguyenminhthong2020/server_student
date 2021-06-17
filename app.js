const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
require("express-async-errors");
const dotenv = require("dotenv");
dotenv.config();

const db = require("./utils/db");
const port = process.env.PORT || 3000;
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(limiter);

(async () => {
  try {
    const dbConnect = await db.connectDB(process.env.MONGODB_URI);
    if (dbConnect) {
      console.log(
        `\nConnected to Mongodb is sucessfully ${dbConnect.connection.port}`
      );
    }
  } catch (err) {
    console.log(`conect to db failed ${err}`);
  }
})();


app.get("/", (req, res) => {
  res.json(`Welcome to our Student server`);
});

app.use("/api/v1/student", require('./routes/student.route'));


app.use((req, res, next) => {
  // default route
  res.status(404).send("ROUTE NOT FOUND");
});

app.use(function (err, req, res, next) {
  // default error-handler
  if (typeof err.status === "undefined" || err.status === 500) {
    console.error(err.stack);
    res.status(500).send("View error log on console.");
  } else {
    res.status(err.status).send(err);
  }
});


app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`);
});
