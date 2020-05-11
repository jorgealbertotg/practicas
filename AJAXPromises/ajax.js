document.getElementById('ajaxButton').addEventListener('click', event => {
  addLoader()
  removeElement('table')
  removeElement('article')
  removeElement('div')
  makeRequest('GET', 'http://demo6292426.mockable.io/persons').then(response => {
    body().appendChild(buildMenu())
    buildData(response)
    body().appendChild(buildStatistics(response))
  }).catch(error => {
    console.error(error)
  }).finally(() => {
    removeLoader()
  })
})

const buildMenu = () => {
  const menu = createElement('div')
  const boton = createElementWithText('button', 'ESTADISTICAS')
  boton.addEventListener('click', event => {
    event.target.innerText = event.target.innerText === 'ESTADISTICAS' ? 'DATOS' : 'ESTADISTICAS'
    document.querySelector('table').classList.toggle('hidden')
    document.querySelector('article').classList.toggle('hidden')
  })
  menu.appendChild(boton)
  return menu
}

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

const removeElement = element => {
  if (document.querySelector(element)) {
    document.querySelector(element).remove()
  }
}

const addLoader = () => {
  const loader = createElement('p')
  loader.className = 'loader'
  body().appendChild(loader)
}

const removeLoader = () => {
  removeElement('p.loader')
}

const buildData = data => {
  const table = createElement('table')
  const headerRow = createElement('tr')
  const headers = ['#', 'Nombre', 'Email', 'Balance']
  headers.forEach(header => {
    headerRow.appendChild(createElementWithText('th', header))
  })
  table.appendChild(headerRow)
  data.forEach((element, index) => {
    const row = createElement('tr')
    const cells = [index, `${element.name.first} ${element.name.last}`, element.email, element.balance]
    cells.forEach(cell => {
      row.appendChild(createElementWithText('td', cell))
    })
    table.appendChild(row)
  })
  body().appendChild(table)
}

const makeRequest = (method, url) => {
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

const buildStatistics = (data) => {
  const main = createElement('article')
  main.classList.add('statistics')
  main.classList.add('hidden')
  const statistics = {
    Edad: getAgeStatistics(data),
    'Color de ojos': getPropertyStatistics(data, 'eyeColor'),
    'Fruta favorita': getPropertyStatistics(data, 'favoriteFruit'),
    'Estado de usuarios': getStatusStatistics(data),
    Balance: getBalanceStatistics(data),
    Tags: getTagsStatistics(data),
    Dominios: getEmailStatistics(data)
  }
  Object.keys(statistics).forEach(statistic => {
    const section = createElement('section')
    section.appendChild(createElementWithText('h2', statistic))
    section.appendChild(objectToHTML(statistics[statistic]))
    main.appendChild(section)
  })
  return main
}

const objectToHTML = object => {
  const properties = Object.keys(object)
  const div = properties.reduce((container, property) => {
    const paragraph = createElementWithText('p', `${property}: ${object[property]}`)
    container.appendChild(paragraph)
    return container
  }, createElement('section'))
  return div
}

const getAgeStatistics = (data) => {
  const age = data.reduce((container, element) => {
    if (element.age < container.lower) {
      container.lower = element.age
    }
    if (element.age > container.higher) {
      container.higher = element.age
    }
    container.average += element.age
    return container
  }, { lower: data[0].age, average: 0, higher: data[0].age })
  age.average = age.average / data.length
  return age
}

const getPropertyStatistics = (data, property) => {
  return data.reduce((container, element) => {
    if (container[element[property]]) {
      container[element[property]] += 1
    } else {
      container[element[property]] = 1
    }
    return container
  }, { })
}

const getStatusStatistics = data => {
  return data.reduce((container, element) => {
    if (element.isActive) {
      container.active += 1
    } else {
      container.inactive += 1
    }
    return container
  }, { active: 0, inactive: 0 })
}

const getBalanceStatistics = data => {
  const balance1 = data.reduce((container, element) => {
    element.balance.slice(2, element.balance.length)
    const balance = parseFloat(element.balance.slice(1).replace(',', ''))
    if (container.lower === 0) {
      container.lower = balance
    } else {
      if (balance < container.lower) {
        container.lower = balance
      }
    }
    if (container.higher === 0) {
      container.higher = balance
    } else {
      if (balance > container.higher) {
        container.higher = balance
      }
    }
    if (container.average === 0) {
      container.average = balance
    } else {
      container.average += balance
    }
    return container
  }, { lower: 0.0, average: 0.0, higher: 0.0 })
  balance1.average = balance1.average / data.length
  return balance1
}

const getTagsStatistics = (data) => {
  return data.reduce((container, element) => {
    element.tags.forEach(tag => {
      if (container[tag]) {
        container[tag] += 1
      } else {
        container[tag] = 1
      }
    })
    return container
  }, { })
}

const getEmailStatistics = data => {
  return data.reduce((container, element) => {
    const atPos = element.email.indexOf('@') + 1
    const email = element.email.slice(atPos, element.email.indexOf('.', atPos))
    if (container[email]) {
      container[email] += 1
    } else {
      container[email] = 1
    }
    return container
  }, {})
}
