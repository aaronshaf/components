const Tonic = typeof require === 'function'
  ? require('tonic') : window.Tonic

class ContentTooltip extends Tonic {
  constructor () {
    super()
    this.stylesheet = `
      :host {
        position: relative;
        display: inline-block;
      }
      :host span {
        all: inherit;
      }
      :host span #tooltip {
        background: #fff;
        opacity: 0;
        position: absolute;
        z-index: -1;
        transition: all 0.3s;
        border-radius: 2px;
        box-shadow: 0px 0px 10px rgba(0,0,0,0.4);
      }
      :host span #tooltip.show {
        opacity: 1;
        z-index: 1;
      }
      `

    this.defaults = {
      width: '250px',
      height: '150px'
    }
  }

  mouseenter (e) {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      const tooltip = this.root.getElementById('tooltip')
      tooltip.classList.add('show')
    }, 128)
  }

  mouseleave (e) {
    clearTimeout(this.timer)
    const tooltip = this.root.getElementById('tooltip')
    tooltip.classList.remove('show')
  }

  willConnect () {
    const {
      width,
      height
    } = { ...this.defaults, ...this.props }

    const id = this.getAttribute('id')
    this.text = this.getAttribute('text')

    const style = []
    if (width) style.push(`width: ${width};`)
    if (height) style.push(`height: ${height};`)

    const span = document.createElement('span')
    span.textContent = this.innerHTML
    span.id = 'text'

    while (this.firstChild) this.firstChild.remove()

    const tooltip = document.createElement('div')
    tooltip.id = 'tooltip'
    tooltip.className = 'tooltip'
    tooltip.setAttribute('style', style.join(''))
    const template = document.querySelector(`template[for="${id}"]`)
    const clone = document.importNode(template.content, true)
    tooltip.appendChild(clone)
    span.appendChild(tooltip)
    this.root.appendChild(span)
    this.structure = span
  }

  render () {
    return this.structure
  }
}

Tonic.add(ContentTooltip, { shadow: true })