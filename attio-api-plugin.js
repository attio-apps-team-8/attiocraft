const axios = require('axios')
var events = require('./events');
const Vec3 = require('vec3').Vec3

const ATTIO_API_KEY = '210268df87538f59811ad8065558a32b4dfbcc18e31dcdf4fa0efb83309018b8'

const attioApi = axios.create({
  baseURL: 'https://api.attio.com/v2',
  headers: {
    'Content-Type': 'application/json',
    'accept': 'application/json',
    'Authorization': `Bearer ${ATTIO_API_KEY}`
  }
})

module.exports.player = function (player, serv) {
  player.on('spawned', async () => {
    const response = await attioApi.post(`/objects/players/records/query`, {
      filter: {
        username: player.username,
      }
    })
    const exists = response.data.data.length > 0
    if (!exists) {
      await attioApi.post(`/objects/players/records`, {
        data: {
          values: {
            username: player.username,
            "avatar_url": `https://mc-heads.net/avatar/${player.username}`,
          }
        }
      })
    }
  });

  events.addListener('throw-player', async ({ username }) => {
    if (username !== player.username) return
    console.log('[SERVER] throw', username)
    player.takeDamage({
      sound: 'game.player.hurt',
      damage: 0,
      velocity: new Vec3(40, 60, 10),
    })

  })

  events.addListener('kill-player', async ({ username }) => {
    if (username !== player.username) return
    console.log('[SERVER] kill-player', username)
    player.updateHealth(0)
  })

  events.addListener('kick-player', async ({ username }) => {
    if (username !== player.username) return
    console.log('[SERVER] kick-player', username)
    player.kick()
  })

  events.addListener('give-player', async ({
    username,
    itemId,
    number
  }) => {
    if (username !== player.username) return
    player.handleCommand(`give ${username} ${itemId} ${number || 1}`);
  })

  events.addListener('broadcast-player', async ({
    username,
    message
  }) => {
    if (username !== player.username) return
    player.chat(message);

    res.status(200)
  })

  events.addListener('spawn-blocks', async ({
    username,
    itemId
  }) => {
    if (username !== player.username) return

    console.log(`[SERVER] spawn-blocks`)

    const position = {
      x: Math.round(player.position.x),
      y: Math.round(player.position.y),
      z: Math.round(player.position.z),
    }


    player.handleCommand(
      `setblock ${position.x} ${position.y - 1} ${position.z} ${itemId}`
    );

    player.handleCommand(
      `setblock ${position.x} ${position.y - 1} ${position.z + 1} ${itemId}`
    );
    player.handleCommand(
      `setblock ${position.x} ${position.y - 1} ${position.z - 1} ${itemId}`
    );

    player.handleCommand(
      `setblock ${position.x} ${position.y - 1} ${position.z + 2} ${itemId}`
    );
    player.handleCommand(
      `setblock ${position.x} ${position.y - 1} ${position.z - 2} ${itemId}`
    );
    player.handleCommand(
      `setblock ${position.x + 1} ${position.y - 1} ${position.z} ${itemId}`
    );
    player.handleCommand(
      `setblock ${position.x + 1} ${position.y - 1} ${position.z - 1} ${itemId}`
    );
    player.handleCommand(
      `setblock ${position.x + 1} ${position.y - 1} ${position.z - 2} ${itemId}`
    );
    player.handleCommand(
      `setblock ${position.x + 1} ${position.y - 1} ${position.z + 1} ${itemId}`
    );
    player.handleCommand(
      `setblock ${position.x + 1} ${position.y - 1} ${position.z + 2} ${itemId}`
    );
    player.handleCommand(
      `setblock ${position.x - 1} ${position.y - 1} ${position.z} ${itemId}`
    );
    player.handleCommand(
      `setblock ${position.x - 1} ${position.y - 1} ${position.z - 1} ${itemId}`
    );
    player.handleCommand(
      `setblock ${position.x - 1} ${position.y - 1} ${position.z - 2} ${itemId}`
    );
    player.handleCommand(
      `setblock ${position.x - 1} ${position.y - 1} ${position.z + 1} ${itemId}`
    );
    player.handleCommand(
      `setblock ${position.x - 1} ${position.y - 1} ${position.z + 2} ${itemId}`
    );
  })
}
