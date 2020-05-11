const body = () => {
  return document.querySelector('body')
}

const createElement = tag => {
  return document.createElement(tag)
}

const createElementWithText = (elementTag, elementText) => {
  const element = createElement(elementTag)
  const text = document.createTextNode(elementText)
  element.appendChild(text)
  return element
}

const buildMenu = () => {
  const menu = createElement('nav')
  const list = createElement('ul')
  const menuItems = ['RAM', 'HDD', 'PROCESADOR']

  menuItems.forEach(item => {
    const listItem = createElement('li')
    const buttonItem = createElementWithText('button', item)
    buttonItem.addEventListener('click', makeRequest)
    listItem.appendChild(buttonItem)
    list.appendChild(listItem)
  })
  menu.appendChild(list)
  body().appendChild(menu)
}

const resolveMakeRequest = event => {
  return new Promise((resolve, reject) => {
    if (event.target.innerText === 'RAM' ||
        event.target.innerText === 'HDD' ||
        event.target.innerText === 'PROCESADOR') {
      resolve(event.target.innerText)
    } else {
      reject(new Error('Invalid type of request'))
    }
  })
}

const makeRequest = event => {
  resolveMakeRequest(event).then(requestType => {
    switch (requestType) {
      case 'RAM':
        getRAMData()
        break
      case 'HDD':
        getHDDData()
        break
      case 'PROCESADOR':
        getProcessorData()
        break
    }
  }).catch(error => {
    /* global alert */
    alert(error)
  })
}

const getRAMData = () => {
  ajax('GET', 'https://demo6292426.mockable.io/ramMemory').then(response => {
    const m = Array.from(response.data).reduce((main, elemento) => {
      main.push(`${elemento.ramMemory} ${elemento.architecture} ${elemento.speed}`)
      return main
    }, [])
    showModal(arrayToHTML('RAM', m), 'Agregar RAM')
  }).catch(error => {
    console.error(error)
  })
}

const getHDDData = () => {
  ajax('GET', 'http://demo6292426.mockable.io/hddList').then(response => {
    const m = Array.from(response.data).reduce((main, elemento) => {
      main.push(`${elemento.size} ${elemento.provider} ${elemento.speed}`)
      return main
    }, [])
    showModal(arrayToHTML('HDD', m), 'Agregar HDD')
  }).catch(error => {
    console.error(error)
  })
}

const getProcessorData = () => {
  ajax('GET', 'http://demo6292426.mockable.io/processors').then(response => {
    const m = Array.from(response.data).reduce((main, elemento) => {
      main.push(`${elemento.architecture} ${elemento.provider} ${elemento.cores} núcleos`)
      return main
    }, [])
    showModal(arrayToHTML('PROCESSOR', m), 'Agregar PROCESSOR')
  }).catch(error => {
    console.error(error)
  })
}

const showModal = (contentText, titleText) => {
  const modalContent = createElement('div')
  modalContent.className = 'theater'
  const modal = createElement('section')
  modal.className = 'modal'
  const title = createElementWithText('header', titleText)
  const value = createElement('span')
  const content = createElement('div')
  const footer = createElement('footer')
  const cancelButton = createElementWithText('button', 'Cancelar')
  const acceptButton = createElementWithText('button', 'Aceptar')
  footer.appendChild(cancelButton)
  footer.appendChild(acceptButton)
  modalContent.appendChild(title)
  modal.appendChild(value)
  modal.appendChild(content)
  modalContent.appendChild(modal)
  modalContent.appendChild(footer)
  body().appendChild(modalContent)
  content.appendChild(contentText)
  cancelButton.className = 'cancel'
  acceptButton.className = 'accept'
  cancelButton.addEventListener('click', resolveCloseModal)
  acceptButton.addEventListener('click', resolveAcceptModal)
}

const resolveCloseModal = () => {
  closeModal().then(modal => {
    modal.remove()
  }).catch(error => {
    alert(error)
  })
}
const resolveAcceptModal = () => {
  acceptModal().then(value => {
    body().appendChild(createElementWithText('p', value))
    resolveCloseModal()
  }).catch(error => {
    alert(error)
  })
}
const arrayToHTML = (type, array) => {
  const div = array.reduce((container, property, index) => {
    const paragraph = createElement('p')
    const radio = createElement('input')
    const label = createElementWithText('label', property)
    radio.setAttribute('type', 'radio')
    radio.setAttribute('name', 'modal-select')
    radio.setAttribute('id', `item${index}`)
    radio.setAttribute('value', property)
    radio.addEventListener('click', () => { setLabelValue(type) })
    label.setAttribute('for', `item${index}`)
    paragraph.appendChild(radio)
    paragraph.appendChild(label)
    container.appendChild(paragraph)
    return container
  }, createElement('section'))
  div.className = 'modalContainer'
  return div
}
const setLabelValue = (type) => {
  resolveValueLabel(type).then(text => {
    document.querySelector('section.modal span').innerText = text
  }).catch(error => {
    alert(error)
  })
}
const resolveValueLabel = type => {
  return new Promise((resolve, reject) => {
    if (type === 'RAM' || type === 'HDD' || type === 'PROCESSOR') {
      const value = document.querySelector('input[name="modal-select"]:checked').value
      let valueType = ''
      switch (type) {
        case 'RAM':
          valueType = `RAM seleccionada: ${value}`
          break
        case 'HDD':
          valueType = `HDD seleccionada: ${value}`
          break
        case 'PROCESSOR':
          valueType = `PROCESADOR seleccionada: ${value}`
          break
      }
      resolve(valueType)
    } else {
      reject(new Error('No valid label found'))
    }
  })
}
const closeModal = () => {
  return new Promise((resolve, reject) => {
    const modal = document.querySelector('div.theater')
    if (modal) {
      resolve(modal)
    } else {
      reject(new Error('No ".theater" element found'))
    }
  })
}
const acceptModal = () => {
  return new Promise((resolve, reject) => {
    const value = document.querySelector('section.modal span').innerText
    if (value) {
      resolve(value)
    } else {
      reject(new Error('There is not a selected value'))
    }
  })
}
const ajax = (method, url) => {
  return new Promise((resolve, reject) => {
    const httpRequest = new XMLHttpRequest()
    if (!httpRequest) {
      reject(new Error('Error al instanciar el objeto XMLHttpRequest'))
    }
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
          resolve(JSON.parse(httpRequest.responseText))
        } else {
          reject(new Error(`Error, codigo de estado recibido: ${httpRequest.status}`))
        }
      }
    }
    httpRequest.open(method, url)
    httpRequest.send()
  })
}
