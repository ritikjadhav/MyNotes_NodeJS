const express = require("express");
const fs = require("fs");
const bodyparser = require("body-parser");
const path = require("path");
const https = require("https");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const route = require("./Routes/route");
const errorLogger = require("./Utilities/error-logger");
const requestLogger = require("./Utilities/request-logger");

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(helmet()); //helmet middleware is a set of 14 small middleware functions that help in setting up security-related HTTP headers with default values

app.use(requestLogger);
app.use("/", route);
app.use(errorLogger);

// Read the contents of the key and cert files synchronously
const key = fs.readFileSync("ssl/sshServer.key");
const cert = fs.readFileSync("ssl/sshServer.cert");

https
  .createServer(
    {
      key: key,
      cert: cert,
    },
    app
  )
  .listen(3000, () => {
    console.log("MyNotes Welcomes You!");
  });
