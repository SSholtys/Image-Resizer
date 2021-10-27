const fileInput = document.querySelector('#resizerFile')
const fileWidth = document.querySelector('#widthInput')
const fileHeight = document.querySelector('#heightInput')
const aspectCheckbox = document.querySelector('#aspectCheckbox')
const canvas = document.querySelector('#canvas')
const canvasCtx = canvas.getContext('2d')

let activeImage, originalWidthToHeightRatio;

fileInput.addEventListener('change', e => {
    const reader = new FileReader()

    reader.addEventListener('load', () => {
        openImage(reader.result)
    })

    reader.readAsDataURL(e.target.files[0])
})

fileWidth.addEventListener('change', () => {
    if (!activeImage) return

    const heightValue = aspectCheckbox.checked ? fileWidth.value / originalWidthToHeightRatio : fileHeight.value

    resize(fileWidth.value, heightValue)
})
fileHeight.addEventListener('change', () => {
    if (!activeImage) return

    const widthValue = aspectCheckbox.checked ? fileHeight.value * originalWidthToHeightRatio : fileWidth.value

    resize(widthValue, fileHeight.value)
})

function openImage(imageSrc) {
    activeImage = new Image()

    activeImage.addEventListener('load', () => {
        originalWidthToHeightRatio = activeImage.width / activeImage.height

        resize(activeImage.width, activeImage.height)
    })
    activeImage.src = imageSrc
}

function resize(width, height) {
    canvas.width = Math.floor(width)
    canvas.height = Math.floor(height)
    fileWidth.value = Math.floor(width)
    fileHeight.value = Math.floor(height)

    canvasCtx.drawImage(activeImage, 0, 0, Math.floor(width), Math.floor(height))
}