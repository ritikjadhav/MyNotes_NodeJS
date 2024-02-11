const fs = require("fs");

const { promisify } = require("util");
const appendFile = promisify(fs.appendFile);

async function requestLogger(req, res, next) {
    try {
        const logMessage = `${new Date()} - ${req.method} - ${req.url}\n`;
        await appendFile("RequestLogger.txt", logMessage);
        next();
    } catch (error) {
        next(err);
    }
}

module.exports = requestLogger;