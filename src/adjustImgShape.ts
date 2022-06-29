export default (container: string, ratio = 1) => {
  const elements = globalThis.document.querySelectorAll(container + ' .img-wrap img')
  elements.forEach((imgElem: HTMLImageElement) => {
    imgElem.onload = () => {
      const cssClass = imgElem.naturalWidth / imgElem.naturalHeight >= ratio ? 'img-w' : 'img-h';
      (imgElem.parentNode as HTMLElement).classList.add(cssClass)
    }
  })
}
