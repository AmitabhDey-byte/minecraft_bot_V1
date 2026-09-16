const mineflayer = require('mineflayer')
const { pathfinder, Movements, goals: { GoalFollow } } = require('mineflayer-pathfinder')
const mcDataLoader = require('minecraft-data')
const GoalBlock = require('mineflayer-pathfinder').goals.GoalBlock    
const targetName = 'BetrayedChair284'

const bot2 = mineflayer.createBot({
  host: 'localhost',
  port: 25565,
  username: 'RealNiggaChu',
  version: '1.21.1',
  skin: true
  })

bot2.loadPlugin(pathfinder)

const target2 = () => bot2.players['NiggaChu']?.entity

function followBot2() {
  const player = target2()
  if (!player) return false

  const movements = new Movements(bot2, mcDataLoader(bot2.version))
  movements.allowParkour = true

  bot2.pathfinder.setMovements(movements)
  bot2.pathfinder.setGoal(new GoalFollow(player, 2), true)

  return true
}
function lookBot2() {
  const player = target2()
  if (player) bot2.lookAt(player.position.offset(0, player.height * 0.85, 0), true)
}

function attackWithBot2() {
  const mob = bot2.nearestEntity(entity => entity.type === 'mob')
  if (!mob) return false

  const movements = new Movements(bot2, mcDataLoader(bot2.version))
  movements.allowParkour = true
  bot2.pathfinder.setMovements(movements)
  bot2.pathfinder.setGoal(new GoalFollow(mob, 2), true)
  bot2.lookAt(mob.position.offset(0, mob.height * 0.85, 0), true)

  if (bot2.entity.position.distanceTo(mob.position) <= 3) bot2.attack(mob)
  return true
}

bot2.on('spawn', () => {
  const followInterval = setInterval(() => {
    if (followBot2()) clearInterval(followInterval)
  }, 1000)
  setInterval(() => {
    if (!attackWithBot2()) lookBot2()
  }, 500)
})

bot2.on('error', console.log)

const bot = mineflayer.createBot({
  host: 'localhost',
  port: 25565,
  username: 'NiggaChu',
  version: '1.21.1'
})

bot.loadPlugin(pathfinder)

const target = () => bot.players[targetName]?.entity

function followBot() {
  const player = target()
  if (!player) return false

  const movements = new Movements(bot, mcDataLoader(bot.version))
  movements.allowParkour = true

  bot.pathfinder.setMovements(movements)
  bot.pathfinder.setGoal(new GoalFollow(player, 2), true)

  return true
}
function locateSpawnBlock() {
  const movements = new Movements(bot, mcDataLoader(bot.version))
  movements.allowParkour = true

  const spawnBlock = bot.findBlock({
    matching: block => block.name === 'emerald_block',
    maxDistance: 64
  })

  if (!spawnBlock) {
    console.log('No emerald block found nearby.')
    return false
  }

  const x = spawnBlock.position.x
  const y = spawnBlock.position.y + 1
  const z = spawnBlock.position.z
  const goal = new GoalBlock(x, y, z)
  bot.pathfinder.setMovements(movements)
  bot.pathfinder.setGoal(goal)
  return true
}
function lookBot() {
  const mob = bot.nearestEntity(entity => entity.type === 'mob')
  if (mob) {
    const movements = new Movements(bot, mcDataLoader(bot.version))
    movements.allowParkour = true
    bot.pathfinder.setMovements(movements)
    bot.pathfinder.setGoal(new GoalFollow(mob, 2), true)
    bot.lookAt(mob.position.offset(0, mob.height * 0.85, 0), true)
    if (bot.entity.position.distanceTo(mob.position) <= 3) bot.attack(mob)
    return
  }

  const player = target()
  if (player) bot.lookAt(player.position.offset(0, player.height * 0.85, 0), true)
}

bot.on('spawn', () => {
  bot.once('goal_reached', () => {
    const followInterval = setInterval(() => {
      if (followBot()) clearInterval(followInterval)
    }, 1000)
  })
  const interval = setInterval(() => {
    if (locateSpawnBlock()) clearInterval(interval)
  }, 1000)

  setInterval(lookBot, 300)
})

bot.on('error', console.log)