const mineflayer=require('mineflayer')
const {pathfinder,Movements}=require('mineflayer-pathfinder')
const spawn=require('./spawn')
const follow=require('./follow')
const attack=require('./attack')

const bot=mineflayer.createBot({
  host:'localhost',
  port:25565,
  username:'NiggaChu',
  version:'1.21.1'
})

bot.loadPlugin(pathfinder)

bot.once('spawn',async()=>{
  const movements=new Movements(bot)
  movements.allowParkour=true
  bot.pathfinder.setMovements(movements)

  await spawn(bot)

  follow(bot,'BetrayedChair284')

  attack(bot,()=>{
    follow(bot,'BetrayedChair284')
  })
})

bot.on('error',console.log)
bot.on('kicked',console.log)