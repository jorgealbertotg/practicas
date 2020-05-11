function body() {
  return document.querySelector('body');
}
function element(tag) {
  return document.createElement(tag);
}
function texto(text) {
  return document.createTextNode(text);
}

function index() {

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
        Certificado: 'Ninguno',
      },
      {
        Periodo: '2010 - 2014',
        'Nombre de la escuela': 'UPVM',
        Certificado: 'Certificado parcial',
      },
    ],
    Skills: {
      JavaScript: 'Medio',
      CSS: 'Medio',
      HTML: 'Medio',
      Ionic: 'Bajo'
    }
    ,
    Intereses: ['Musica', 'Bateria', 'Tecnologias'],
    Contacto: {
      Correo: 'jorgealbertotg@gmail.com',
      Telefono: '5524009443',
      Linkedin: 'jorgetg'
    }
  };

  const sections = Object.keys(cv);

  sections.forEach(key => {

    let h2 = element('h2');
    let h2Text = texto(key);
    h2.appendChild(h2Text);
    body().appendChild(h2);

    let article = element('article');

    if (typeof cv[key] == 'string') {
      let articleText = texto(cv[key]);
      article.appendChild(articleText);
    }
    else if (typeof cv[key] == 'object') {
      if (Array.isArray(cv[key])) {
        cv[key].forEach(object => {
          if (typeof object == 'string') {
            let paragraph = element('p');
            let paragraphText = texto(object);
            paragraph.appendChild(paragraphText);
            article.appendChild(paragraph);
          }
          else {
            let div = element('div');
            let props = Object.keys(object);
            props.forEach(prop => {
              let paragraph = element('p');
              let paragraphText = texto(prop + ' : ' + object[prop]);
              paragraph.appendChild(paragraphText);
              div.appendChild(paragraph);
            });
            article.appendChild(div);
          }
        });
      }
      else {
        let props = Object.keys(cv[key]);
        props.forEach(prop => {
          let paragraph = element('p');
          let paragraphText = texto(prop + ' : ' + cv[key][prop]);
          paragraph.appendChild(paragraphText);
          article.appendChild(paragraph);
        });
      }
    }

    body().appendChild(article);
  });
}