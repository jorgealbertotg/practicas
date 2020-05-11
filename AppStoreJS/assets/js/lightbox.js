import { HTML } from './html.js'

export const Lightbox = ((html) => {
  let lightBoxHTML

  const lightBoxObject = (headerContent, content, footerContent) => {
    return {
      tag: 'div',
      classList: ['lightbox-theater'],
      child: {
        tag: 'section',
        classList: ['lightbox-container'],
        children: [
          {
            tag: 'header',
            classList: ['lightbox-header'],
            child: headerContent
          },
          {
            tag: 'div',
            classList: ['lightbox-content'],
            child: content
          },
          {
            tag: 'footer',
            classList: ['lightbox-footer'],
            child: footerContent
          }
        ]
      }
    }
  }

  const show = (header, content, footer) => {
    lightBoxHTML = html.JSONToHTML(lightBoxObject(header, content, footer))
    lightBoxHTML.style.top = `${window.scrollY}px`
    html.addToRoot(lightBoxHTML)
    document.querySelector('body').style.overflow = 'hidden'
  }

  const close = () => {
    lightBoxHTML.remove()
    document.querySelector('body').style.overflow = 'auto'
  }

  return {
    show: show,
    close: close
  }
})(HTML)
