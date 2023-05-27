export const getTextSizeClass = (percentage: number, total: number, target: string): string => {
  const multiplier = 1 / Math.log10(total)
  switch (target) {
    case 'genre':
      switch (true) {
        case percentage > 50 * multiplier:
          return 'text4'
        case percentage > 35 * multiplier:
          return 'text3'
        case percentage > 25 * multiplier:
          return 'text2'
        case percentage > 15 * multiplier:
          return 'text1'
        default:
          return 'text0'
      }

    case 'developer':
      switch (true) {
        case percentage > 50 * multiplier * 4:
          return 'text4'
        case percentage > 35 * multiplier * 4:
          return 'text3'
        case percentage > 25 * multiplier * 4:
          return 'text2'
        case percentage > 15 * multiplier * 4:
          return 'text1'
        default:
          return 'text0'
      }
  }

  return ''
}
