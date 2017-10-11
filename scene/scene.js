//取得keydowns
var GuaGame = function () {
    var game = {
        keydowns: [],
        actions: [],
    }
    var canvas = document.querySelector('#canvas')
    var ctx = canvas.getContext('2d')
    game.ctx = ctx
    game.drawImage = function (guaImage) {
        game.ctx.drawImage(guaImage.image, guaImage.x, guaImage.y)
    }
    game.clearRect = function () {
        game.ctx.clearRect(0, 0, 600, 400)
    }
    window.addEventListener('keydown', (event) => {
        game.keydowns[event.key] = true
    } )
    window.addEventListener('keyup', function (event) {
        game.keydowns[event.key] = false
    })
    //按下的按键会被储存在key Array里，而函数会储存在key()方法里
    //所以放在actions Object
    game.registerEvent = function (key, callback) {
        game.actions[key] = callback
    }
    window.fps = 60
    //这里的fps传入里面之后就不再变化 是因为下面的loop不会终止？
    //所以再多一个loop 过程化
    var runLoop = function () {
        var actions = Object.keys(game.actions)
        for (var i = 0; i < actions.length; i++) {

            key = actions[i]

            if(game.keydowns[key]){
                game.actions[key]()
            }
        }
        game.clearRect()
        game.update()
        game.draw()
        // log(window.fps)
        setTimeout(function () {
            runLoop()
        }, 1000/window.fps)
    }
    //定时器 实际上下面只跑一次，里面的runLoop()才一直跑
    setTimeout(function () {
        runLoop()
    }, 1000/window.fps)


    //执行events
    return game
}
