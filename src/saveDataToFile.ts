export default (data: string, filename: string) => {
  const ext = filename.split('.').pop()
  const link = globalThis.document.createElement('a')
  link.setAttribute('href', `data:text/${ext};charset=utf-8,\ufeff` + encodeURIComponent(data))
  link.setAttribute('download', filename)

  globalThis.document.body.appendChild(link)
  link.click()
  globalThis.document.body.removeChild(link)
}
