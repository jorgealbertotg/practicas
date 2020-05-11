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
const getCV = () => {
  const cv = {
    Nombre: 'Tolentino Garcia, Jorge Alberto',
    'Informacion personal': {
      Calle: 'Orquidea',
      CP: 54065,
      Colonia: 'Jardines de Santa Cruz',
      Estado: 'México',
      Muncipio: 'Tultepec',
      'Numero interior': 8,
      'Numero axterior': ''
    },
    'Acerca de mi': 'Estudiante de Ingenieria en Sistemas Computacionales en ESCOM',
    Experiencia: [
      {
        Periodo: '2018 - 2019',
        Descripcion: 'Desarrollo de proyecto de titulacion'
      }
    ],
    'Carrera academica': [
      {
        Periodo: '2016 - 2020',
        'Nombre de la escuela': 'ESCOM',
        Certificado: 'Ninguno'
      },
      {
        Periodo: '2010 - 2014',
        'Nombre de la escuela': 'UPVM',
        Certificado: 'Certificado parcial'
      }
    ],
    Skills: {
      JavaScript: 'Medio',
      CSS: 'Medio',
      HTML: 'Medio',
      Ionic: 'Bajo'
    },
    Intereses: ['Musica', 'Bateria', 'Tecnologias'],
    Contacto: {
      Correo: 'jorgealbertotg@gmail.com',
      Telefono: '5524009443',
      Linkedin: 'jorgetg'
    }
  }
  return cv
}
const index = () => {
  const cv = getCV()
  body().appendChild(bulidSelector(Object.keys(cv)))
  body().appendChild(buildElements(cv, Object.keys(cv)))
}

const bulidSelector = options => {
  const select = createElement('select')
  select.setAttribute('multiple', true)
  select.addEventListener('change', filterHeaders)
  options.forEach(option => {
    const selectOption = createElementWithText('option', option)
    selectOption.setAttribute('value', option)
    select.appendChild(selectOption)
  })
  return select
}
const filterHeaders = (event) => {
  const headersFiltered = Array.from(event.target.options).map(option => {
    if (option.selected) {
      return option.getAttribute('value')
    }
  }).filter(option => option)
  addCV(buildElements(getCV(), headersFiltered))
}
const addCV = (cv) => {
  body().removeChild(document.querySelector('main'))
  body().appendChild(cv)
}
const buildElements = (cv, headers) => {
  const main = headers.reduce((container, header) => {
    const section = cv[header]
    container.appendChild(createElementWithText('h2', header))
    if (typeof section === 'string') {
      container.appendChild(createElementWithText('section', section))
    } else if (Array.isArray(section)) {
      container.appendChild(arrayToHTML(section))
    } else {
      container.appendChild(objectToHTML(section))
    }
    return container
  }, createElement('main'))
  main.appendChild(filterSections(headers))
  return main
}

const filterSections = (userHeaders) => {
  const headers = Object.keys(getCV())
  const headersFilter = headers.filter(header => !userHeaders.includes(header))
  const div = headersFilter.reduce((container, header) => {
    container.appendChild(createElementWithText('h3', header))
    return container
  }, createElement('div'))
  return div
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

const arrayToHTML = array => {
  const section = array.reduce((container, element) => {
    if (typeof element === 'string') {
      container.appendChild(createElementWithText('p', element))
    } else {
      container.appendChild(objectToHTML(element))
    }
    return container
  }, createElement('section'))
  return section
}
