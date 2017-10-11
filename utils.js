var log = console.log.bind()

var imageFromPath = function (path) {
    var img = new Image()
    img.src = path
    return img
}
