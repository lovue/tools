export default (data: string, filename: string) => {
  const ext = filename.split('.').pop()
  const link = document.createElement('a')
  link.setAttribute('href', `data:text/${ext};charset=utf-8,\ufeff` + encodeURIComponent(data))
  link.setAttribute('download', filename)

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
