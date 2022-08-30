const screen = {
    width: window.innerWidth,
    height: window.innerHeight
}

function setScreenSize() {
    screen.width = window.innerWidth
    screen.height = window.innerHeight
    if (setUi) setUi()
    if (setCanvas) setCanvas()
}