var express = require('express');
var http = require('http');

var init = require("./middlewares/init");
var routes = require("./middlewares/routes");
var loggerMw = require("./middlewares/loggerMw");
var error = require("./middlewares/errorMw");
var responseMw = require("./middlewares/responseMw");

var app = express();

init(app);
loggerMw(app);
routes(app);
responseMw(app);
error(app);

// Watchers ====>

/**
 * Any Queue Consumers can be added here, or they can be separate process, defined as npm scripts
 */
// ============|

// Default Route ====>
// catch 404 and forward to error handler
app.use("/*", function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.status(404).json({error: err, result: null});
});
// =================|

// Start Server ====>
var server = http.createServer(app);
var port = +process.env.PORT || '3001';
app.set('port', port);
server.listen(port);
server.on('error', (err) => {
    loggerMw.logger.error(err);
    process.exit(1);
});
server.on('listening', () => {
    loggerMw.logger.info("Listening on " + port);
});
// ==================|

module.exports = app;
