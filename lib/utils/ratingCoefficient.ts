export const ratingCoefficient = (rating: number) => {
  switch (rating) {
    case 10:
      return 7
    case 9:
      return 2
    default:
      return 0
  }
}
