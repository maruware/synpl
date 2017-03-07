import * as types from './mutation-types'

FileList.prototype.every = Array.prototype.every
FileList.prototype.map = Array.prototype.map

const dummyVideo = document.createElement('video')

const {ipcRenderer} = require('electron')

const parseDuration = (mediaDuration) => {
  let m = mediaDuration.match(/^([0-9]+):([0-9]+):([0-9]+)$/)
  if (m) {
    return (parseInt(m[1]) * 60 + parseInt(m[2])) * 60 + parseInt(m[3])
  }
  m = mediaDuration.match(/^([0-9]+\.[0-9]+) s$/)
  if (m) {
    return parseFloat(m[1])
  }
}

const parseDate = (date) => {
  let m = date.match(/^([0-9]+:[0-9]+:[0-9]+) ([0-9]+:[0-9]+:[0-9]+(.[0-9]+)?)$/)
  if (m) {
    const date = m[1].replace(':', '-', 'g')
    const time = m[2]
    console.log('date', `${date} ${time}`)
    return new Date(`${date} ${time}`)
  } else {
    throw new Error('Bad date')
  }
}

const getFileExif = (file) => {
  const path = file.path
  return new Promise((resolve, reject) => {
    const fn = (event, metadata) => {
      ipcRenderer.removeListener(`receiveFileExif-${path}`, fn)

      // 消毒
      if (metadata.duration) {
        metadata.duration = parseDuration(metadata.duration)
      }
      metadata.date = parseDate(metadata.date)
      console.log('metadata', metadata)
      resolve(metadata)
    }
    ipcRenderer.on(`receiveFileExif-${path}`, fn)
    ipcRenderer.on(`errorFileExif-${path}`, (event, err) => {
      reject(err)
    })
    ipcRenderer.send('requestFileExif', path)
  })
}

const videoContentPromise = (file) => {
  return getFileExif(file)
  .then(metadata => {
    return {
      type: 'video',
      video: {
        src: URL.createObjectURL(file),
        metadata: metadata
      }
    }
  })
}

const photoContentPromise = (files) => {
  const promises = files.map(file => getFileExif(file))
  return Promise.all(promises)
  .then(metadatas => {
    const photos = files.map((f, idx) => {
      return {
        src: URL.createObjectURL(f),
        metadata: metadatas[idx]
      }
    }).sort((a, b) => {
      return a.metadata.date - b.metadata.date
    })
    return {
      type: 'photo',
      photos: photos
    }
  })
}

export const setContent = ({ commit }, files) => {
  console.log('setContent files', files)
  let contentPromise = null
  // video
  if (files.length === 1 && dummyVideo.canPlayType(files[0].type)) {
    const file = files[0]
    contentPromise = videoContentPromise(file)
  } else if (files.every(f => f.type === 'image/jpeg')) {
    contentPromise = photoContentPromise(files)
  } else {
    window.alert('Bad File')
    return
  }
  contentPromise
  .then(content => {
    commit(types.SET_CONTENT, {content: content})
  })
}

export const removeContent = ({ commit }) => {
  commit(types.REMOVE_CONTENT)
}

var intervalId = null

export const play = ({ commit, state }) => {
  if (state.contents.duration <= 0) {
    window.alert('No item')
    return
  }
  commit(types.CHANGE_PLAYING, {playing: true})
  intervalId = setInterval(() => {
    if (state.contents.currentTime >= state.contents.duration) {
      pause({commit})
    }
    commit(types.SEEK, {time: state.contents.currentTime + 0.1})
  }, 100)
}

export const pause = ({ commit }) => {
  if (intervalId) {
    clearInterval(intervalId)
    commit(types.CHANGE_PLAYING, {playing: false})
  }
}

export const stop = ({ commit }) => {
  if (intervalId) {
    clearInterval(intervalId)
    commit(types.CHANGE_PLAYING, {playing: false})
  }
  commit(types.SEEK, {time: 0})
}

export const seek = ({ commit }, time) => {
  commit(types.SEEK, {time: time})
}
