function route(handle, pathname, response) {
    console.log(`Abount to route a request for ${pathname}`);

    if (typeof handle[pathname] === 'function') {
        handle[pathname](response);
    } else {
        response.writeHead(404, {'Content-Type': 'text/html'});
        response.write('404 Not found');
        response.end();
    }
}

exports.route = route;
