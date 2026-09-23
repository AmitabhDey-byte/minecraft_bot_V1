const {goals:{GoalFollow}}=require('mineflayer-pathfinder')

function follow(bot,name){
  const player=bot.players[name]?.entity

  if(!player){
    setTimeout(()=>follow(bot,name),1000)
    return
  }

  bot.pathfinder.setGoal(
    new GoalFollow(player,2),
    true
  )
}

module.exports=follow