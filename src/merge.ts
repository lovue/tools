function merge (target: Record<string, unknown>, source: Record<string, unknown>) {
  for (const sourceKey in source) {
    if (typeof source[sourceKey] === 'object') {
      if (target[sourceKey] === undefined) {
        target[sourceKey] = structuredClone(source[sourceKey])
      } else {
        merge((target[sourceKey] as Record<string, unknown>), (source[sourceKey] as Record<string, unknown>))
      }
    } else {
      target[sourceKey] = source[sourceKey]
    }
  }
}

export default merge
