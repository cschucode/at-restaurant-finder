export const getPriceLevel = (level) => {
  const dollars = ['$', '$$', '$$$', '$$$$', '$$$$$'];
  return dollars[level];
}

export const truncateText = (text) => {
  if (!text) {
    return ''
  } else {
    return text.split(',')[0];
  }
}
