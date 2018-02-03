var server = require('./server');
var router = require('./router');
var handlers = require('./handlers');

var handle = {};

handle['/'] = handlers.start;
handle['/start'] = handlers.start;
handle['/search'] = handlers.search;

server.start(router.route, handle);
