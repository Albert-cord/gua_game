var log = console.log.bind()
var levelNumber = 1
var localStorageLevel
var localStorageBlocksPosition = []
var localStorageBlocksPositionList = []
var currentLevel = 1
var currentLevelBlocks = []
var killCount = 0
var clearLevelDate = function (boolean) {
    if(boolean){
        for (var i = 1; i < localStorage.length - 2; i++) {
            localStorage.removeItem('level-' + i)
        }
    }

}
// for (var i = 1; i < 140; i++) {
//     // array[i]
//     localStorage.removeItem('level-' + i)
// }
// var imageFromPath = function (path) {
//     var img = new Image()
//     img.src = path
//     return img
// }
// var age = localStorage.getItem('age')
// localStorage.removeItem('level-1')
// log('localStorage', localStorage)
var imageByName = function (name) {
    var img = new Image()
    img.src = images[name]
    return img

}

document.querySelector('#input-fps-speed').addEventListener('input', function (event) {
    var input = event.target
    window.fps = Number (input.value)
})

var canvas = document.querySelector('#canvas')
var ctx = canvas.getContext('2d')

var levelLoad = function (game, n) {
    var n = n - 1
    var level = levels[n]
    // log(level.length)
    var blocks = []
    for (var i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block(game, p)
        blocks.push(b)
    }

    return blocks
}
var release = true
var blocks = []
var editerBlocks = []
var sceneSequence = 0
var editerBoolean = true
//
var enableDebugMode = function (game, enable) {
    // log(enable)
    if(!enable){
        return
    }
    window.paused = false
    window.addEventListener('keydown', function (event) {
    var k = event.key
    if( k == 'p'){
        window.paused = !window.paused
    } else if( '0123456789'.includes(k)){
        //已经debug
        blocks = levelLoad(game, Number(k))
    }
})
}
