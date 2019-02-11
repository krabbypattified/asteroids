export const images = {
  cat: '/cat.jpg'
}

export const imagesLoaded = loadImages(images)

function loadImages(obj) {
  const promises = []

  for (const key in obj) {
    const img = new Image()

    promises.push(new Promise((resolve, reject) => {
      img.addEventListener('load', _ => resolve(img))
      img.addEventListener('error', _ => reject(new Error(`Failed to load image at ${obj[key]}`)))
      img.src = obj[key]
    }))

    obj[key] = img
  }

  return Promise.all(promises)
}