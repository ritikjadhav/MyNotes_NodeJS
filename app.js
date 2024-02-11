const express = require("express");
const bodyparser = require("body-parser");
const path = require("path");
const route = require("./Routes/route");
const errorLogger = require("./Utilities/error-logger");
const requestLogger = require("./Utilities/request-logger");

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(requestLogger);
app.use("/", route);
app.use(errorLogger);

const port = process.env.PORT || 1234;
app.listen(port, () => {
    console.log("MyNotes Welcomes You!");
});