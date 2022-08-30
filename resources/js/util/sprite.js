const sprites = document.getElementById('sprites')

// class Sprite {
//   constructor(width, height, center) {
//     this.width = width
//     this.height = height
//     this.center = center
//   }
// }

// class SpriteReel extends Sprite {
//   constructor(width, height, center, images) {
//     super(width, height, center)
//     this.images = images
//     this.frame = 0
//   }
//   drawOne(x, y, f) {
//     if (images[f]) {
//       ctx.drawImage(
//         images[f],
//         x - this.center.x,
//         y - this.center.y,
//         this.width,
//         this.height,
//       )
//     }
//   }
//     /**
//    * 
//    * @param {number} x horizontal draw location
//    * @param {number} y vertical draw location
//    * @param {number} direction number of frames to skip.  Normally 1 (forward) or -1 (reverse) greater numbers "increase" animation speed by skipping frames. 0 "pauses" animation
//    */
//   play(x, y, direction) {
//     if (this.frame >= this.images.length) {
//       this.frame = this.frame % this.images.length
//     }
//     if (this.frame < 0) {
//       this.frame - (this.images.length - 1) + this.frame % this.images.length
//     }
//     this.drawOne(x, y, this.frame)
//     this.frame += this.direction
//   }
// }

// class SpriteSheet extends Sprite {
//   constructor(width, height, center, sheet, rows, columns) {
//     super(width, height, center)
//     this.sheet = sheet
//     this.rows = rows
//     this.columns = columns
//     this.sWidth = width / columns
//     this.sHeight = height / rows
//     this.sequences = {}
//     this.frame = 0
//     this.sequence = null
//   }
//   drawOne(x, y, frame) {
//     const row = (frame - (frame % rows)) / 4
//     const column = frame % rows
//     ctx.drawImage(
//       this.sheet,
//       this.width * row,
//       this.height * column,
//       this.sWidth,
//       this.sHeight,
//       x - this.center.x,
//       y - this.center.y,
//       this.width,
//       this.height,
//     )
//   }
//   /**
//    * 
//    * @param {number} x horizontal draw location
//    * @param {number} y vertical draw location
//    * @param {number} direction number of frames to skip.  Normally 1 (forward) or -1 (reverse) greater numbers "increase" animation speed by skipping frames. 0 "pauses" animation
//    */
//   play(x, y, direction) {
//     if (this.sequence && this.sequences[this.sequence]) {
//       const seq = this.sequences[this.sequence]
//       if (this.frame >= seq.length) {
//         this.frame = this.frame % (seq.length - 1)
//       }
//       while (this.frame < 0) {
//         this.frame = (seq.length - 1) + (this.frame % seq.length)
//       }
//       this.drawOne(x, y, seq[this.frame])
//       this.frame += direction
//     }
//   }
//   /**
//    * 
//    * @param {string} name Name of sequence to be played
//    */
//   setSequence(name) {
//     if (this.sequences[name]) {
//       this.sequence = name
//     } else {
//       this.sequence = null
//     }
//   }
// }

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
  play(speed = .1) {
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
    ctx.drawImage(
      this.image, 
      frameX, 
      frameY, 
      this.width, 
      this.height,
      this.X(),
      this.Y(),
      this.width,
      this.height
      )
    this.currentFrame += speed
  } 
}