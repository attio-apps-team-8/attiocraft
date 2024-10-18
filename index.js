const flyingSquid = require('flying-squid')
const path = require('path')

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
  difficulty: 0,  // Difficulty level: 0 (Peaceful), 1 (Easy), 2 (Normal), 3 (Hard)
  'view-distance': 10,  // View distance for players
  'player-list-text': {
    header: 'Welcome to Attio Minecraft.',
    footer: 'Enjoy your stay!'
  },
  'everybody-op': false,  // Set to true if you want every player to be an operator
  'max-entities': 100,
  plugins: {
    [path.join(__dirname, './attio-api-plugin.js')]: {}
  },
})
