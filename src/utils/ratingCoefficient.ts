export const ratingCoefficient = (rating: number) => {
  switch (rating) {
    case 10:
      return 5
    case 9:
      return 2
    case 8:
      return 1
    default:
      return 1
  }
}
