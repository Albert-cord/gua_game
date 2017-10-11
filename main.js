var  _main = function () {
    enableDebugMode(true)
    var g = GuaGame()
    var paddle = Paddle()
    var ball = Ball()
    var blocks = levelLoad(enableDebugMode(true) || 3)
    log(blocks)
    g.registerEvent('f', function () {
        ball.fire()
    })
    g.registerEvent('a', function () {
        paddle.moveLeft()
    })
    g.registerEvent('d', function () {
        paddle.moveRight()
    })
    g.registerEvent('w', function () {
        paddle.moveUp()
    })
    g.registerEvent('s', function () {
        paddle.moveDown()
    })
    g.update = function () {
        // log(window.paused)
        if(window.paused){
            return
        }
        ball.ejection()
        if( paddle.collideY(ball)){
            ball.collideActionY()
        } else if(paddle.collideX(ball)){
            ball.collideActionX()
        }
        for (var i = 0; i < blocks.length; i++) {
            var b = blocks[i]
            if(b.collide(ball)){
                log(b.lives)
                b.kill()
                log(b.alive)
                ball.collideActionY()
            }
        }
        // if(ball.collideY( ball, paddle )){
        //     ball.speedY *= -1
        // }
        // else if(ball.collideX( ball, paddle )){
        //     ball.speedX *= -1
        // }
    }
    g.draw = function () {

        g.drawImage(paddle)
        g.drawImage(ball)
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            // log(block.lives)
            if(block.alive){
                // log(block.alive)
                g.drawImage(block)

            }
        }
    }
    }
_main()
