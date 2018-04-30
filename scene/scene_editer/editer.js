class SceneEditer extends GuaScene {
    constructor(game) {
        super(game)
        var selfSceneEditer = this
        this.game = game
        game.registerEvent('k', function () {
            if(sceneSequence == 1){
                currentLevel = 1
                killCount = 0
                sceneSequence = 2
                var s = Scene(game)
                game.replaceScene(s)
            }
        })
        this.blockImage = game.imageByName('block')
        this.blockImageWidth = this.blockImage.width
        this.blockImageHeight = this.blockImage.height

        this.canvas = canvas
        this.ctx = ctx
        this.lifeCount = 0
        this.release = true
        this.loadLevelBoolean  = false
        this.clearAllBlocks = false
        this.mouseDown()
        this.mouseUp()
        this.mouseDbclick()
        this.setup()
        // this.loadNextLevel()

    }


    setup(){

        // this.editerLevelLoad()
        this.loadNextLevel()



    }

    editerLevelLoad(){
        // <!-- <button class="level-sequence" id="level-1" class="level">关卡1</button> -->
        let levelButtonDiv = document.getElementById("level-button")
        // log('levelButton', levelButton)
        // this.levelNumberId = levelNumber
        let insertHtml = "<button class=\"level-sequence\" id=\"level-" + levelNumber + "\"" + " name=\"level\">" + "关卡" + levelNumber +"已保存"+ "</button>"
        levelButtonDiv.innerHTML += insertHtml
        this.loadNextLevel()
    }

    loadNextLevel(){

        let self = this
        let levelButton = document.getElementById('level-save')
        // log('levelButton', levelButton)

        levelButton.addEventListener('click', function () {
            self.levelDate()
            // localStorageBlocksPositionList.push(localStorageBlocksPosition)
            let obj = Object.assign({}, localStorageBlocksPosition)
            let blocksPositon =  JSON.stringify(obj)
            localStorage.setItem('level-' + levelNumber, blocksPositon)
            log('localStorage', localStorage)
            localStorageBlocksPosition = []
            // let blocksArrayPositon = JSON.parse(localStorage.getItem("level-" + levelNumber))
            self.editerLevelLoad()
            levelNumber++

            blocks = []
            // log('blocksArrayPositon', blocksArrayPositon)
        })
    }

    levelDate(){
        for (var i = 0; i < blocks.length; i++) {
            let b = blocks[i]
            if(b.alive){
                let storageBlocks = [b.x, b.y, b.lives]
                localStorageBlocksPosition.push(storageBlocks)
            }
        }
    }

    update(){
        // log('levelNumber', levelNumber)

    }

    draw() {
        var self = this
            for (var i = 0; i < blocks.length; i++) {
                // log('length', blocks.length)
                var block = blocks[i]
                if(block.alive){
                    self.game.drawImage(block)
                }

            }

        if(!this.loadLevelBoolean){
            this.ctx.fillText('click canvas to edit level', 15, 350)
            this.ctx.fillText('double click block to delete this block', 15, 370)
            this.ctx.fillText('Press K to start', 15, 390)
        }else{
            this.ctx.fillText('Press K to start', 15, 350)
        }
    }

    mouseDbclick(){
        var self = this
            self.canvas.addEventListener('dblclick', function (event) {
                if(editerBoolean){
                    var x = event.offsetX
                    var y = event.offsetY
                    // var tmp = 0
                    for (var i = 0; i < blocks.length; i++) {
                        var block = blocks[i]
                        if(block.dblclickHasBlock(x, y)){
                            blocks[i].alive = false
                            blocks.pop(blocks[i])
                        }
                        }

                    }
                })
    }

    mouseDown(){
        var self = this
            self.canvas.addEventListener('mousedown', function (event) {
                if(editerBoolean){
                    // log('editer editerBoolean', editerBoolean)
                    self.loadLevelBoolean = true
                    var x = event.offsetX - (event.offsetX % self.blockImageWidth)
                    var y = event.offsetY - event.offsetY % self.blockImageHeight
                    self.lifeCount++
                    var singleBlock = [x, y, self.lifeCount]
                    // log('singleBlock', singleBlock)
                    // localStorage.setItem('singleBlock-1' ,singleBlock)
                    // localStorage.removeItem('')
                    // localStorage.removeItem('singleBlock-1')

                    // log('singleBlock-1', localStorage.length)
                    for (var i = 0; i < blocks.length; i++) {
                        if(blocks[i].x == singleBlock[0] && blocks[i].y == singleBlock[1]){
                            blocks[i].lives++
                        }
                    }
                    var position = singleBlock
                    var b = Block(self.game, position)
                    blocks.push(b)

                    editerBlocks = blocks


                    }

                })
            }

    mouseUp(){
        var self = this
            self.canvas.addEventListener('mouseup', function (event) {

                self.lifeCount = 0

            })
        }

}
