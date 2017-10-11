var Ball = function () {
    var ball = imageFromPath('img/ball.png')
    var image = {
        image: ball,
        x: 125,
        y: 230,
        speedX: 5,
        speedY: 5,
        fired: false
    }
    var o = image
    o.fire = function () {
        o.fired = true
    }
    o.ejection = function () {
        if (o.fired){
            if( o.x<0 || o.x>600-6 ){
                o.speedX *= -1
            }
            if( o.y<0 || o.y>400-6 ){
                o.speedY *= -1
            }
                o.x += o.speedX
                o.y -= o.speedY
        }
    }
    o.collideActionY = function () {
        o.speedY *= -1
    }
    o.collideActionX = function () {
        o.speedX *= -1
    }
    return o
}
