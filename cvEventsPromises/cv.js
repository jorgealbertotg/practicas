const body = () => {
  return document.querySelector('body')
}
const createElement = tag => {
  return document.createElement(tag)
}
const elementWithText = (elementTag, elementText) => {
  const element = createElement(elementTag)
  const text = document.createTextNode(elementText)
  element.appendChild(text)
  addClickEvent(element)
  return element
}

const index = () => {
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
  buildElements(cv)
}

const buildElements = (cv) => {
  const sections = Object.keys(cv)

  for (let i = 0; i < sections.length; i++) {
    const sectionName = sections[i]
    const sectionContent = cv[sectionName]
    let sectionContainer = createElement('article')

    body().appendChild(elementWithText('h2', sectionName))

    if (typeof sectionContent === 'string') {
      sectionContainer.appendChild(elementWithText('p', sectionContent))
    } else if (typeof sectionContent === 'object') {
      if (Array.isArray(sectionContent)) {
        sectionContainer.appendChild(toSubsection(sectionContent))
      } else {
        sectionContainer = toElementWithChildren(sectionContainer, sectionContent)
      }
    }
    body().appendChild(sectionContainer)
  }
}

const toElementWithChildren = (parent, object) => {
  Object.keys(object).forEach(property => {
    parent.appendChild(elementWithText('p', `${property} : ${object[property]}`))
  })
  return parent
}

const toSubsection = content => {
  let container
  content.forEach(element => {
    if (typeof element === 'string') {
      container = elementWithText('p', element)
    } else {
      container = toElementWithChildren(createElement('div'), element)
    }
  })
  return container
}
const addClickEvent = paragraph => {
  paragraph.addEventListener('click', async event => {
    showResult(event)
      .then(message => {
        /* global alert */
        alert(message)
      })
      .catch(() => {
        event.target.nextElementSibling.classList.toggle('hidden')
      })
  })
}

const showResult = (event) => {
  return new Promise((resolve, reject) => {
    if (event.target.localName === 'p') {
      resolve(event.target.firstChild.nodeValue)
    } else {
      reject(new Error())
    }
  })
}
