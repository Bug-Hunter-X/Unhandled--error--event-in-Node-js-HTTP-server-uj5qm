# Unhandled 'error' event in Node.js HTTP server

This repository demonstrates a common error in Node.js HTTP servers: the unhandled 'error' event.  The error arises when the server is unexpectedly terminated (e.g., via Ctrl+C) before it can gracefully close its connections, potentially leading to incomplete responses or data loss.

## Bug Description

The provided `server.js` shows a basic HTTP server.  When this server is running and you forcefully terminate it (e.g., using Ctrl+C), an 'error' event might not be caught, resulting in an unhandled exception. This isn't always caught and leads to problems when scaling. 

## Solution

The `serverSolution.js` demonstrates how to handle the 'error' event and implement graceful shutdown to mitigate the issue.  The solution includes a listener for the 'SIGTERM' signal, allowing the server to properly close existing connections before exiting.