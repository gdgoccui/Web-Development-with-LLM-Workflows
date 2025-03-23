const http = require("http");
const fs = require("fs");

const server = http.createServer( (req, res) => {

    fs.readFile("index.html", (err, data) => {

        if (err) {
            console.log(`Error occurs: ${err}`);
        }
        else {
            res.end(data);
        }
    })
});

server.listen(5005, () => {
    console.log("Server is listening at port number 5005.");
})