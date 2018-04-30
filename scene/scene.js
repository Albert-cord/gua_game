
var Scene = function (game) {
    //初始化
    var s = {
        game: game,

    }


    var paddle = Paddle(game)
    var ball = Ball(game)
    s.dealBlocksDate = function () {
        var blocksArrayPositon = JSON.parse(localStorage.getItem("level-" + currentLevel))
        currentLevelBlocks = []
        // log('blocksArrayPositon', blocksArrayPositon)
        // log('length', Object.keys(blocksArrayPositon).length)
        for (var i = 0; i < Object.keys(blocksArrayPositon).length; i++) {
            let position = blocksArrayPositon[i]
            let b = Block(game, position)
            currentLevelBlocks.push(b)
        }
        return currentLevelBlocks
    }
    blocks =  s.dealBlocksDate()
    // || localStorageLevel || editerBlocks || levelLoad( game, Number(window.k) || 3 )
    // log('blocks', blocks)

    editerBoolean = false

    var score = 0
    //执行events
    game.registerEvent('f', function () {
        ball.fire()
    })
    game.registerEvent('a', function () {
        paddle.moveLeft()
    })
    game.registerEvent('d', function () {
        paddle.moveRight()
    })
    //上下太快了 中间碰撞检测发生了多次 使小球反弹了多次
    game.registerEvent('w', function () {
        paddle.moveUp()
    })
    game.registerEvent('s', function () {
        paddle.moveDown()
    })

    s.update = function () {
        // log(window.paused)
        // editerBoolean = false
        if(window.paused){
            return
        }
        // log(window.paused)
        ball.ejection()
        if( paddle.collideY(ball)){
            ball.collideActionY()
        } else if(paddle.collideX(ball)){
            ball.collideActionX()
        }

        if(!ball.survival() && sceneSequence == 2){
            sceneSequence = 3
            editerBoolean = false

            var end = SceneEnd.new(game)
            game.replaceScene(end)
        }

        for (var i = 0; i < blocks.length; i++) {
            var b = blocks[i]
            if(b.collide(ball)){
                // log(b.lives)
                b.kill()
                score += 100
                // log(b.alive)
                ball.collideActionY()
            }

        }
        if(killCount == blocks.length){
            currentLevel++
            blocks = s.dealBlocksDate()
            killCount = 0
        }
        // log('killCount, blocks.length,currentLevel', killCount, blocks.length,  currentLevel)
        // log('blocks', blocks)

        game.mouseAction(ball)


    }
    s.draw = function () {
        //背景颜色设置，只是颜色不当，挡住了分数显示
        // g.ctx.fillStyle = "#554"
        // g.ctx.fillRect(0, 0, canvas.width, canvas.height)
        game.drawImage(ball)
        game.drawImage(paddle)

        if(currentLevel > localStorage.length - 3){
            game.ctx.fillText("Your mission all clear", 100, 320)
        }

        for (var i = 0; i < blocks.length; i++) {
            // log(blocks)
            var block = blocks[i]
            if(block.alive){
                // log(block.alive)
                game.drawImage(block)

            }
                // log(block.score)
            game.ctx.fillText('Score: ' + score, 100, 290)
            game.ctx.fillText('第' + currentLevel + '关', 100, 320)

        }

    }

    var enableDrag = false
    game.mouseDown =  function (ball) {

        game.canvas.addEventListener('mousedown', function (event) {
            var x = event.offsetX
            var y = event.offsetY
            if(ball.hasPoint(x, y)){
                enableDrag = true
            }
        })
    }
    game.mouseMove = function (ball) {
        game.canvas.addEventListener('mousemove', function (event) {
            var x = event.offsetX
            var y = event.offsetY
            if(enableDrag){
                ball.x = x
                ball.y = y
            }
            // log(ball.x, ball.y)
        })
    }
    game.mouseUp = function () {
        game.canvas.addEventListener('mouseup', function (event) {
            enableDrag = false
        })
    }
    game.mouseAction = function (ball) {
        game.mouseDown(ball)
        game.mouseMove(ball)
        game.mouseUp()
    }

    return s
}
