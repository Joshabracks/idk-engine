function run() {
  const now = performance.now()
  fps = Math.round(1000 / (now - timestamp))
  timestamp = now
  gametime = now
  ctx.clearRect(0, 0, screen.width, screen.height)
  ctx.fillRect(0, 0, screen.width, screen.height)
  renderImage()
  requestAnimationFrame(run)
}

const image = document.getElementById('sprite_sheet')
let characterSprite
image.onload = () => {
  characterSprite = new SpriteSheet(
    image,
    64,
    64,
    screen.width / 2,
    screen.height / 2,
    32,
    32,
  )
  // const sequences = ['walk-down', 'walk-up', 'walk-left', 'walk-right']
  // sequences.forEach((sequence) => {
    // const y = parseInt(sequences.indexOf(sequence))
    characterSprite.addSequence(
      // sequence,
      'walk',
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(x => new Coord(x, 0)),
    )
    characterSprite.addSequence(
      'stand',
      [new Coord(0, 0)]
    )
  // })
}

function updateSeq() {
  setTimeout(() => {
    const seqNames = Object.keys(characterSprite.sequences)
    let seq = seqNames.indexOf(characterSprite.currentSequence) + 1
    if (seq > Object.keys(characterSprite.sequences).length - 1) {
      seq = 0
    }
    const sequence = Object.keys(characterSprite.sequences)[seq]
    characterSprite.setSequence(sequence)
    updateSeq()
  }, 10000)
}
updateSeq()
function renderImage() {
  if (characterSprite) {
    characterSprite.rotate(1)
    characterSprite.play(.2)
  }
}
