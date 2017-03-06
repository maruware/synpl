import * as types from './mutation-types'

FileList.prototype.every = Array.prototype.every
FileList.prototype.map = Array.prototype.map

const dummyVideo = document.createElement('video')

const {ipcRenderer} = require('electron')

const getFileExif = (file) => {
  const path = file.path
  return new Promise((resolve, reject) => {
    const fn = (event, metadata) => {
      ipcRenderer.removeListener(`receiveFileExif-${path}`, fn)
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
    return {
      type: 'photo',
      photos: files.map((f, idx) => {
        return {
          src: URL.createObjectURL(f),
          metadata: metadatas[idx]
        }
      })
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
