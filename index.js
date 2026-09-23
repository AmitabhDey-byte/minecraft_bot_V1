const mineflayer=require('mineflayer')
const {pathfinder,Movements}=require('mineflayer-pathfinder')

const follow=require('./follow')


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
  movements.canDig=false
  bot.pathfinder.setMovements(movements)

  try{
    await spawn(bot)

    console.log('Reached emerald block')

    follow(bot,'BetrayedChair284')


  }catch(err){
    console.log(err)
  }
})

bot.on('error',console.log)
bot.on('kicked',console.log)