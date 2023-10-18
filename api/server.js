const express = require('express');
const server = express();
server.use(express.json())
// Configure your server here
// Build your actions router in /api/actions/actions-router.js
const actionsRouter = require('./actions/actions-router')
server.use('/api/actions', actionsRouter)
// Build your projects router in /api/projects/projects-router.js
const projectsRouter = require('./projects/projects-router')
server.use('/api/projects', projectsRouter)
// Do NOT `server.listen()` inside this file!

module.exports = server;
