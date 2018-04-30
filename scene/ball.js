var Ball = function (game) {

    var ball = game.imageByName('ball')

    var image = {
        image: ball,
        x: 125,
        y: 230,
        speedX: 5,
        speedY: 5,
        fired: false,
    }
    var o = image
    o.fire = function () {
        o.fired = true
    }
    o.ejection = function () {
        if (o.fired){
            if( o.x<0 || o.x>600-o.image.width ){
                o.speedX *= -1
            }
            if( o.y<0 || o.y>400-o.image.height ){
                o.speedY *= -1
            }
                o.x += o.speedX
                o.y += o.speedY
        }
    }
    o.collideActionY = function () {
        o.speedY *= -1
    }
    o.collideActionX = function () {
        o.speedX *= -1
    }
    o.hasPoint = function (x, y) {
        var xIn = x >= o.x && x<= o.x + o.image.width
        var yIn = y >= o.y && y<= o.y + o.image.height
        return xIn && yIn
    }
    o.survival = function () {
        if(o.y >= 400 - o.image.height){
            return false
        }
        return true
    }
    return o
}
