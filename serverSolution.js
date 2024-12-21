const http = require('http');

const requestListener = (request, response) => {
  response.setHeader('Content-Type', 'application/json');
  response.writeHead(200);
  const jsonData = {
    message: 'Hello from Node.js!',
  };
  response.end(JSON.stringify(jsonData));
};

const server = http.createServer(requestListener);

let isClosing = false;

function gracefulShutdown() {
  if (isClosing) return;
  isClosing = true;
  console.log('Server is shutting down...');
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
  setTimeout(() => {
    console.error('Could not close connections in time');
    process.exit(1);
  }, 5000); // 5 seconds timeout
}

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);


server.on('error', (err) => {
  console.error('Server error:', err);
  gracefulShutdown();
});

server.listen(8080, () => {
  console.log('Server is running on port 8080');
});