var Paddle = function (game) {
    var paddle = game.imageByName('paddle')
    // log('paddle image', paddle)
    var image = {
        image: paddle,
        x: 160,
        y: 300,
        speed: 5,
        canUpDown: true,
    }
    var o = image
    o.moveRight = function () {

        o.x += o.speed
        if(o.x + o.image.width >= canvas.width ){
            o.x = canvas.width - o.image.width
        }
    }
    o.moveLeft = function () {
        o.x -= o.speed
        if(o.x <= 0 ){
            o.x = 0
        }
    }
    o.moveUp = function () {
        log('canUpDown', o.canUpDown)
        if(!o.canUpDown){
            o.y -= o.speed * 0.8
            if(o.y <= 0){
                o.y = 0
            }
        }

    }
    o.moveDown = function () {
        if(!o.canUpDown){
            o.y += o.speed * 0.8
            if(o.y + o.image.height >= canvas.height){
                o.y = canvas.height - o.image.height
            }
        }

    }
    var aInb = function ( x1, x2, x3) {
        return (x1 >= x2 && x1 <= x3)
    }
    o.collideY = function (b) {
        var a = o
        if( aInb( a.x, b.x, b.x + b.image.width ) || aInb( b.x, a.x, a.x + a.image.width ) ){
            if( aInb( b.y, a.y, a.y + a.image.height) || ( aInb( a.y, b.y, b.y + b.image.height))){
                o.y = o.y
                o.canUpDown = true
                return true
            }

        }
        o.canUpDown = false

        return false
    }
    o.collideX = function (b) {
        var a = o
        if( aInb( b.y, a.y, a.y + a.image.height) || ( aInb( a.y, b.y, b.y + b.image.height)) ){
            if(aInb( a.x, b.x, b.x + b.image.width ) || aInb( b.x, a.x, a.x + a.image.width ) ){
                o.x = o.x
                return true
                o.canUpDown = true

            }
        }
        o.canUpDown = false

        return false
    }
    return o
}
