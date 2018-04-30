
class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        var self = this
        game.registerEvent('k', function () {
            if(localStorage.length > 3){
                editerBoolean = false
                sceneSequence = 2

                var s = Scene(game)
                game.replaceScene(s)
            }
            if(sceneSequence == 1){
                log('title editerBoolean', editerBoolean)
                sceneSequence = 2
                editerBoolean = false

                var s = Scene(game)
                game.replaceScene(s)
            }



        })
        game.registerEvent('m', function () {
            if(sceneSequence == 0){
                sceneSequence = 1
                editerBoolean = true
                // currentLevel = 1
                // log('m editerBoolean', editerBoolean)

                var s = SceneEditer.new(game)
                game.replaceScene(s)
            }
        })
    }

    // update() {
    //
    //
    // }
    draw() {
        this.game.ctx.fillText('Press K to start', 10, 350)
        this.game.ctx.fillText('Press M to edit level', 10, 370)
    }
}
