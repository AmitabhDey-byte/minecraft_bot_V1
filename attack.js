const {goals:{GoalFollow}}=require('mineflayer-pathfinder')

function attack(bot,resume){
  setInterval(async()=>{
    const zombie=bot.nearestEntity(e=>e.name==='zombie')

    if(!zombie){
      resume()
      return
    }

    const distance=bot.entity.position.distanceTo(zombie.position)

    if(distance>2.5){
      bot.pathfinder.setGoal(new GoalFollow(zombie,1),true)
      return
    }

    bot.pathfinder.setGoal(null)

    try{
      await bot.lookAt(
        zombie.position.offset(0,zombie.height*.8,0),
        true
      )

      bot.attack(zombie)

    }catch(err){
      console.log(err)
    }

  },700)
}

module.exports=attack