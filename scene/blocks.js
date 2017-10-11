var Block = function (position) {
    var p = position
    var image = imageFromPath('img/block.png')
    var block = {
        image: image,
        x: p[0],
        y: p[1],
        alive: true,
        lives: p[2] || 1,
    }
    var o = block
    var aInb = function ( x1, x2, x3) {
        return (x1 >= x2 && x1 <= x3)
    }
    o.collide = function (b) {
        var a = o
        if( aInb( a.x, b.x, b.x + b.image.width ) || aInb( b.x, a.x, a.x + a.image.width ) ){
            if( aInb( b.y, a.y, a.y + a.image.height) || ( aInb( a.y, b.y, b.y + b.image.height))){
                //这里的a.alive 及其关键 不然的话这里会判true以致于继续blocks[i].lives继续--不会为零 会成为负数！
                //不能在main.js里判<0 这样实际上就敲多了一次
                return true && a.alive

            }

        }
        return false
    }
    o.kill = function () {
        o.lives --
        if(o.lives < 1)
        {
            o.alive = false
        }
    }
    return o
}
