const http = require("http");

const myServer = http.createServer( (req, res) => {
    console.log("Request received.");

    if (req.url === "/") {
        res.write("Welcome to Backend");
        res.end();
    }
    else if (req.url === "/home") {
        res.write("Welcome to Home");
        res.end();
    }
    else if (req.url === "/about") {
        res.end("Welcome to About Page");
    }
    else {
        res.end("404 | Page not found.");
    }
} );

myServer.listen(8008, () => {
    console.log("Server is running ...")
});