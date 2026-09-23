const {goals:{GoalBlock}}=require('mineflayer-pathfinder')

async function spawn(bot){
  const block=bot.findBlock({
    matching:b=>b.name==='emerald_block',
    maxDistance:64
  })

  if(!block)return

  const p=block.position.offset(0,1,0)

  await bot.pathfinder.goto(
    new GoalBlock(p.x,p.y,p.z)
  )
}

module.exports=spawn