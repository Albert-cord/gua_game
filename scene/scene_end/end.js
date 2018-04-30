
class SceneEnd extends GuaScene {
    constructor(game) {
        super(game)
        var self = this
        game.registerEvent('r', function () {
            if(sceneSequence == 3){
                sceneSequence = 0
                editerBoolean = false
                log('end editerBoolean', editerBoolean)

                var title = SceneTitle.new(game)
                game.replaceScene(title)
            }


        })

    }
    draw() {
        this.game.ctx.fillText('Press R to continue', 10, 350)
    }
    update(){

    }
}
