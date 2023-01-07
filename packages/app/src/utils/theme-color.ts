const { head } = document
const meta = Object.assign(document.createElement('meta'), {
  name: 'theme-color',
})

export const themeColor = {
  set(color: string) {
    meta.setAttribute('content', color)
    head.appendChild(meta)
  },
  unset() {
    head.removeChild(meta)
  },
}
