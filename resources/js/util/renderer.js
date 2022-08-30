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
let characterSprite;
image.onload = () => {
  characterSprite = new SpriteSheet(image, 32, 32, 500, 500, 16, 16)
  characterSprite.addSequence('01-walk-forward', [
    new Coord(0, 0),
    new Coord(1, 0),
    new Coord(2, 0),
    new Coord(1, 0)
  ])
}

function renderImage() {
  if (characterSprite) {
    characterSprite.play()
  }
}
