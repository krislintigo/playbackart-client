export const getTextSizeClass = (
  percentage: number,
  target: 'genre' | 'developer' | 'franchise'
): string => {
  switch (target) {
    case 'genre':
      switch (true) {
        case percentage > 50:
          return 'text4'
        case percentage > 35:
          return 'text3'
        case percentage > 25:
          return 'text2'
        case percentage > 15:
          return 'text1'
        default:
          return 'text0'
      }

    case 'developer':
      switch (true) {
        case percentage > 50:
          return 'text4'
        case percentage > 35:
          return 'text3'
        case percentage > 25:
          return 'text2'
        case percentage > 15:
          return 'text1'
        default:
          return 'text0'
      }
  }

  return ''
}
