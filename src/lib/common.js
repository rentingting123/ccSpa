export const isEmpty = (argEl, obj) => {
  for (let el in obj) {
    if (el === argEl) {
      return true
    }
  }

  return false
}
