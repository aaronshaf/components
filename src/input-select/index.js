class InputSelect extends Tonic { /* global Tonic */
  defaults () {
    return {
      disabled: false,
      iconArrow: InputSelect.svg.default(),
      width: '250px',
      radius: '2px'
    }
  }

  style () {
    return `%style%`
  }

  renderLabel () {
    if (!this.props.label) return ''
    return `<label>${this.props.label}</label>`
  }

  render () {
    const {
      id,
      name,
      disabled,
      required,
      width,
      height,
      padding,
      theme,
      radius
    } = this.props

    const idAttr = id ? `id="${id}"` : ''
    const nameAttr = name ? `name="${name}"` : ''

    if (id) this.root.removeAttribute('id')
    if (theme) this.root.classList.add(`theme-${theme}`)

    this.root.style.width = width

    let style = []
    if (width) style.push(`width: ${width}`)
    if (height) style.push(`height: ${height}`)
    if (radius) style.push(`border-radius: ${radius}`)
    if (padding) style.push(`padding: ${padding}`)

    style.push(`background-image: url('${this.props.iconArrow}')`)
    style = style.join('; ')

    const options = this.root.innerHTML

    return `
      <div class="wrapper">
        ${this.renderLabel()}

        <select
          ${idAttr}
          ${nameAttr}
          ${disabled ? 'disabled' : ''}
          ${required ? 'required' : ''}
          style="${style}">
            ${options}
        </select>
      </div>
    `
  }
}

InputSelect.svg = {}
InputSelect.svg.toURL = s => `data:image/svg+xml;base64,${window.btoa(s)}`
InputSelect.svg.default = () => InputSelect.svg.toURL(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path fill="#D7DBDD" d="M61.4,45.8l-11,13.4c-0.2,0.3-0.5,0.3-0.7,0l-11-13.4c-0.3-0.3-0.1-0.8,0.4-0.8h22C61.4,45,61.7,45.5,61.4,45.8z"/>
  </svg>
`)

Tonic.add(InputSelect)
