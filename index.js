/**
 * Node application entry point
 */

// Include node modules
var http    = require('http');
var url     = require('url');
var sDecoder= require('string_decoder').StringDecoder;

// Include custom modules
var config  = require('./config');
var routes  = require('./routes/api');

// Instantiate the HTTP server
var httpServer = http.createServer(function (req, res) {

    // Get the URL and parse it usind Node library
    var parsedUrl = url.parse(req.url, true);

    // Get the API path which will be
    // passed to the router object to match
    var path = parsedUrl.pathname;
    var route = path.replace(/^\/+|\/$/g,"");

    // Collect the query string
    var queryStringObject = parsedUrl.query;

    // Get the HTTP method
    var method = req.method.toLowerCase();

    // Set response headers, all response should be sent as JSON
    res.setHeader('Content-Type', 'application/json');

    // All methods except post will receive a 405 error
    if(method != 'post') {
        var err = {
            'status' : 'error',
            'responseMessage' : 'Method not allowed.'
        };
        res.writeHeader(405);
        res.end(JSON.stringify(err));
        return;
    }

    // Collect the buffer and convert into a readable string
    var buffer  = '';
    var decoder = new sDecoder('utf-8');

    // Bind a function onto the "HTTP Request's data" event and
    // store the value in the buffer variable
    req.on('data', function (data) {
        buffer += decoder.write(data);
    });

    // Bind a function onto the "HTTP Request's end" event
    req.on('end', function () {

        // Close the buffer
        buffer += decoder.end();

        // Choose the hanlder this route should go to
        // If no valid route passed, then call notFound handler
        var chosenHandler = typeof (routes[route]) !== 'undefined' ? routes[route] : routes['notFound'];

        var data = {
            'payload' : buffer,
            'queryString' : queryStringObject
        };

        // Call the handler
        chosenHandler(data, function (statusCode, payload) {

            // Set the HTTP response code
            res.writeHead(statusCode);

            // Set the HTTP response data in JSON format
            var payloadString = JSON.stringify(payload);
            res.end(payloadString);
        });
    });
});

// Listen the server on port defined in the config file
httpServer.listen(config.httpPort, function () {
    console.log('Listening on port: ' + config.httpPort);
});