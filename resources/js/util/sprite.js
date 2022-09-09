const sprites = document.getElementById('sprites')

class Coord {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

class SpriteSheet{
  constructor(image, width, height, coordX = 0, coordY = 0, centerX = 0, centerY = 0) {
    if (image.tagName !== 'IMG') {
      throw new Error(`image not found`)
    }
    this.coord = new Coord(coordX, coordY)
    this.center = new Coord(centerX, centerY)
    this.image = image
    this.sequences = {}
    this.width = width
    this.height = height
    this.currentSequence
    this.currentFrame = 0
    this.rotation = 0
  }
  addSequence(name, sequence) {
    if (!Array.isArray(sequence)) {
      throw new Error(`Sequence for ${name} must be an array`);
    }
    sequence.forEach(c => {
      if (c.constructor.name !== 'Coord') {
        throw new Error(`Sprite sheet sequence must be comprites of type Coord only`)
      }
      if (c.x < 0 || c.y < 0) {
        throw new Error(`Sprite coordinates for ${name} must be positive values`)
      }
      if (c.x * this.width > this.image.width || c.y * this.height > this.image.height) {
        console.log(c.x * this.width, this.image.width)
        throw new Error(`Coordinate ${c.x},${c.y} is outside image bounds`)
      }
    })
    this.sequences[name] = sequence
    if (!this.currentSequence) {
      this.currentSequence = name
    }
  }
  setSequence(name) {
    if (!this.sequences[name]) {
      throw new Error(`Sprite does not have sequence: ${name}`)
    }
    this.currentSequence = name
  }
  CurrentSequence() {
    return this.sequences[this.currentSequence]
  }
  X() {
    return this.coord.x - this.center.x
  }
  Y() {
    return this.coord.y - this.center.y
  }
  CurrentFrame() {
    return Math.floor(this.currentFrame)
  }
  rotate(value) {
    this.rotation += value
  }
  play(speed = 0.001) {
    const thisCurrentFrame = this.CurrentFrame()
    if (thisCurrentFrame >= this.CurrentSequence().length) {
      this.currentFrame = 0
    }
    if (thisCurrentFrame < 0) {
      this.currentFrame = this.currentSequence().length -1
    }
    const frame = this.CurrentSequence()[this.CurrentFrame()]
    const frameX = frame.x * this.width
    const frameY = frame.y * this.height
    ctx.save()
    ctx.translate(this.X(), this.Y())
    ctx.rotate(this.rotation * Math.PI / 180)
    ctx.drawImage(
      this.image, 
      frameX, 
      frameY, 
      this.width - 1, 
      this.height - 1,
      -this.center.x,
      -this.center.y,
      this.width - 1,
      this.height - 1
      )
    ctx.restore()
    this.currentFrame += speed
  } 
}