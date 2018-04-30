
var  _main = function () {
        //这里显式的初始化游戏
        /*先初始化游戏得到game
        **中间把game传给scene让游戏场景加载
        **加载后的scene传给g.run，在run中持续与scene数据交互
        */
        var images = {
            ball : 'img/ball.png',
            block : 'img/block.png',
            paddle : 'img/paddle.png',
        }


        var g = GuaGame.instance(images)
        var s = SceneTitle.new(g)
        //手动挂上run
        g.runWithScene(s)

        enableDebugMode(g , true)
        clearLevelDate(false)
}

_main()
