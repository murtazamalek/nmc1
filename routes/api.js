/**
 * Routes file
 *
 * All application routes will be defined in this file
 */

// Define the handlers object
var handlers = {};

handlers.helloWorld = function (data, callback) {
    var responseData = {
        'status' : 'success',
        'responseMessage' : 'Welcome ' + data.queryString.name + ', You send us the following data: ' + data.payload
    }
    callback(200, responseData);
};

handlers.notFound = function (data, callback) {
    callback( 404, {
        'status' : 'error',
        'responseMessage' : 'Invalid API path.'
    });
};

// Define the application routes
var routes = {
    'hello' : handlers.helloWorld,
    'notFound' : handlers.notFound
};

module.exports = routes;
