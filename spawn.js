const {goals:{GoalBlock}}=require('mineflayer-pathfinder')

async function spawn(bot){
  let block=null

  while(!block){
    block=bot.findBlock({
      matching:b=>b&&b.name==='emerald_block',
      maxDistance:64
    })

    if(!block)await new Promise(r=>setTimeout(r,1000))
  }

  const p=block.position.offset(0,1,0)

  await bot.pathfinder.goto(
    new GoalBlock(p.x,p.y,p.z)
  )
}

module.exports=spawn