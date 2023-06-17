export const ratingCoefficient = (rating: number) => {
  switch (rating) {
    case 10:
      return 6
    case 9:
      return 1.5
    default:
      return 1
  }
}
