var exec = require('child_process').exec;

function start(response) {

    exec('ls -lah', (error, stdout, stderr)=>{
        if (error) return responseError(response);
        response.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
        response.write(stdout);
        response.end();
    });
}

function search(response) {
    console.log('search');
}

function responseError(response){
    response.writeHead(500, {'Content-Type': 'text/html'});
    response.write('500 error');
    response.end();
}

exports.start = start;
exports.search = search;
