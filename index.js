const flyingSquid = require('flying-squid')
const path = require('path')
const events = require('./events')


const express = require('express')
const app = express()
const port = 3000


app.get('/throw-player', (req, res) => {
  const username = req.query.username
  console.log('[REQUEST] throw-player', username)
  events.emit('throw-player', { username })
  res.status(200)
  res.send(true)
})

app.get('/kill-player', (req, res) => {
  const username = req.query.username
  console.log('[REQUEST] kill-player', username)
  events.emit('kill-player', { username })
  res.status(200)
  res.send(true)
})

app.get('/kill-players', (req, res) => {
  const usernames = req.query.usernames.split(',')
  console.log('[REQUEST] kill-players', usernames)
  for (const username of usernames) {
    events.emit('kill-player', { username })
  }
  res.status(200)
  res.send(true)
})

app.get('/kick-player', (req, res) => {
  const username = req.query.username
  console.log('[REQUEST] kick-player', username)
  events.emit('kick-player', { username })
  res.status(200)
  res.send(true)
})

app.get('/give-player', (req, res) => {
  const username = req.query.username
  const itemId = req.query.itemId
  const number = req.query.number
  console.log('[REQUEST] give-player', username, itemId, number)
  events.emit('give-player', { username, itemId, number })
  res.status(200)
  res.send(true)
})

app.get('/broadcast-players', (req, res) => {
  const usernames = req.query.usernames.split(',')
  const message = req.query.message
  console.log('[REQUEST] broadcast-players', usernames, message)
  for (const username of usernames) {
    events.emit('broadcast-player', { username, message })
  }
  res.status(200)
  res.send(true)
})

app.get('/spawn-blocks', (req, res) => {
  const username = req.query.username
  const itemId = req.query.itemId
  console.log('[REQUEST] spawn-blocks', username, itemId)
  events.emit('spawn-blocks', { username, itemId })
  res.status(200)
  res.send(true)
})

app.get('/spawn-logo', (req, res) => {
  const username = req.query.username
  console.log('[REQUEST] spawn-logo', username)
  events.emit('spawn-logo', { username })
  res.status(200)
  res.send(true)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

flyingSquid.createMCServer({
  version: '1.16.5',  // You can specify the Minecraft version
  port: 25565,        // Default Minecraft server port
  'max-players': 10,  // Maximum players allowed
  onlineMode: true,  // Set to true if you want players to authenticate with Mojang
  motd: 'Attio Minecraft',  // Message of the day
  logging: true,  // Enable server logging
  gameMode: 0,    // 0: Survival, 1: Creative, 2: Adventure, 3: Spectator
  generation: {
    name: 'diamond_square',
    options: {
      worldHeight: 80
    }
  },
  difficulty: 2,  // Difficulty level: 0 (Peaceful), 1 (Easy), 2 (Normal), 3 (Hard)
  'view-distance': 10,  // View distance for players
  'player-list-text': {
    header: 'Welcome to Attio Minecraft.',
    footer: 'Enjoy your stay!'
  },
  'everybody-op': true,  // Set to true if you want every player to be an operator
  'max-entities': 100,
  plugins: {
    [path.join(__dirname, './attio-api-plugin.js')]: {}
  },
})
