var Paddle = function () {
    var paddle = imageFromPath('img/paddle.png')
    var image = {
        image: paddle,
        x: 100,
        y: 250,
        speed: 5,
    }
    var o = image
    o.moveRight = function () {
        o.x += o.speed
    }
    o.moveLeft = function () {
        o.x -= o.speed
    }
    o.moveUp = function () {
        o.y -= o.speed
    }
    o.moveDown = function () {
        o.y += o.speed
    }

    var aInb = function ( x1, x2, x3) {
        return (x1 >= x2 && x1 <= x3)
    }
    o.collideY = function (b) {
        var a = o
        if( aInb( a.x, b.x, b.x + b.image.width ) || aInb( b.x, a.x, a.x + a.image.width ) ){
            if( aInb( b.y, a.y, a.y + a.image.height) || ( aInb( a.y, b.y, b.y + b.image.height))){
                    return true
            }

        }
        return false
    }
    o.collideX = function (b) {
        var a = o
        if( aInb( b.y, a.y, a.y + a.image.height) || ( aInb( a.y, b.y, b.y + b.image.height)) ){
            if(aInb( a.x, b.x, b.x + b.image.width ) || aInb( b.x, a.x, a.x + a.image.width ) ){
                    return true
            }
        }
        return false
    }
    return o
}
