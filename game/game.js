//取得keydowns
class GuaGame {
    constructor(images) {
        window.fps = 60
        this.scene = null
        this.keydowns = []
        this.images = images
        this.img = []
        this.actions = []
        this.canvas = canvas
        this.ctx = ctx
        var self = this
        window.addEventListener('keydown', (event) => {
            this.keydowns[event.key] = true
        } )
        window.addEventListener('keyup', function (event) {
            self.keydowns[event.key] = false
            //这里为什么要用self 代替this
        })
        this.loadImage()
        // this.runLoop()
        // setup(...args)
    }

    imageByName(name){

        return this.img[name]

    }

    loadImage(){
        // var load = []
        var names = Object.keys(this.images)
        var self = this
        for (var i = 0; i < names.length; i++) {
            var name = names[i]
            var img = new Image()
            var imagePath = self.images[name]
            img.src = imagePath
            this.img[name] = img
            //
        }


    }

    static instance(...args){
        this.i = this.i || new this(...args)
        return this.i
    }

        drawImage(guaImage){
            this.ctx.drawImage(guaImage.image, guaImage.x, guaImage.y)
        }

        clearRect() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        }

        registerEvent(key, callback) {
            this.actions[key] = callback
        }

        update() {
             this.scene.update()
        }

        draw() {
            var g = this
            g.scene.draw()
        }
        // window.fps = 60
        //这里的fps传入里面之后就不再变化 是因为下面的loop不会终止？
        //所以再多一个loop 过程化
        runLoop() {
            var g = this
            var actions = Object.keys(this.actions)
            for (var i = 0; i < actions.length; i++) {
                // log('actions', actions.length)
                var key = actions[i]

                if(this.keydowns[key]){
                    this.actions[key]()
                }
            }
            this.clearRect()
            this.update()
            this.draw()
            // log('release', release)
            // release = !release
            // log(window.fps)
            setTimeout(function () {
                g.runLoop()
            }, 1000/window.fps)
        }

        replaceScene(scene) {
            this.scene = scene
        }

        //定时器 实际上下面只跑一次，里面的runLoop()才一直跑
        runWithScene(scene) {
            var g = this
            g.scene = scene
            // log(this.scene)
            setTimeout(function () {
                    g.runLoop()
            }

                //这里为什么报不是函数呢？
            , 1000/window.fps)
        }

}
