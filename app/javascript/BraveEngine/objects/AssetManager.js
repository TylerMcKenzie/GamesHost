class AssetManager {
  static get IMAGEREGEX() {
    return /(jpeg|jpg|gif|png)$/
  }

  static get AUDIOREGEX() {
    return /(wav|mp3|ogg|agg)$/
  }

  static get NOREGEX() {
    return /^no$/
  }

  static get audioTypes () {
    const audio = new Audio()

    return {
      wav: audio.canPlayType('audio/wav;').replace(AssetManager.NOREGEX, ''),
      mp3: audio.canPlayType('audio/mpeg;').replace(AssetManager.NOREGEX, ''),
      ogg: audio.canPlayType('audio/ogg; codecs="vorbis"').replace(AssetManager.NOREGEX, ''),
      aac: audio.canPlayType('audio/aac;').replace(AssetManager.NOREGEX, '')
    }
  }

  static canUseAudio(source) {
    let extension = AssetManager.getExtension(source)

    if(AssetManager.audioTypes[extension]) {
      return true
    }
    return false
  }

  static joinPath(...urls) {
    let path = []

    for(let url of urls) {
      path.push( url.trim().replace(new RegExp('(^[\/]{' + (path[0] ? 1 : 2) + ',}|[\/]*$)', 'g'), '') )
    }

    return path.join('/')
  }

  static getExtension(url) {
    return url.split('.').pop()
  }

  static getName(url) {
    let name = url.replace(`.${AssetManager.getExtension(url)}`, '')

    return name.indexOf('/') == 0 && name.lastIndexOf('/') == 0 ? name.substr(1) : name
  }

  constructor({basePath = '', imagePath = '', audioPath = '', dataPath = ''}) {
    this.images = {}
    this.audio = {}
    this.data = {}

    this.basePath = basePath

    this.imagePath = imagePath
    this.audioPath = audioPath
    this.dataPath = dataPath

    this.loadPromises = []
  }



  loadImage(key, url) {
    let name = (key !== '' && key !== undefined) ? key : AssetManager.getName(url)
    let image  = new Image()

    let joinedUrl = AssetManager.joinPath(this.imagePath, url)

    return new Promise((resolve, reject) => {
      image.onload = () => {
        this.images[name] = image
        resolve(image)
      }

      image.onerror = () => {
        reject(`Unable to load image '${joinedUrl}'`)
      }

      image.src = joinedUrl
    })
  }

  loadAudio(key, urls) {
    if(!Array.isArray(urls)) {
      urls = [urls]
    }

    return new Promise((resolve, reject) => {
      let playableSource

      for(let url of urls) {
        if(AssetManager.canUseAudio(url)) {
          playableSource = url
          break
        }
      }

      if(!playableSource) {
        reject('Cannot play any of the audio formats provided.')
      }
      else {
        let name = (key !== '' && key !== undefined) ? key : AssetManager.getName(url)
        let audio = new Audio()
        let joinedUrl = AssetManager.joinPath(this.audioPath, playableSource)

        audio.addEventListener('canplay', () => {
          this.audio[name] = audio
          resolve(audio)
        })

        audio.onerror = () => {
          reject(`Unable to load audio ${joinedUrl}`)
        }

        audio.src = joinedUrl
        audio.load()
      }
    })
  }

  loadData(key, url) {
    let name = (key !== '' && key !== undefined) ? key : AssetManager.getName(url)
    let request = new XMLHttpRequest()

    let joinedUrl = AssetManager.joinPath(this.dataPath, url)

    return new Promise((resolve, reject) => {
      request.addEventListener('load', () => {
        let data = request.responseText

        if(request.status !== 200) {
          reject(data)
        }

        try {
          data = JSON.parse(data)
        } catch(e) {
          reject(e)
        }

        this.data[name] = data
        resolve(data)
      })

      request.open('GET', joinedUrl, true)
      request.send()
    })


  }

  load(key, url) {
    let promise, extension = AssetManager.getExtension(url)

    if(extension.match(AssetManager.IMAGEREGEX)) {
      promise = this.loadImage(key, url)
    }
    else if(extension.match(AssetManager.AUDIOREGEX)) {
      promise = this.loadAudio(key, url)
    }
    else {
      promise = this.loadData(key, url)
    }

    this.loadPromises.push(promise)
  }

  startLoad() {
    let promises = this.loadPromises
    this.loadPromises = []

    return Promise.all(promises)
  }
}

export default AssetManager
