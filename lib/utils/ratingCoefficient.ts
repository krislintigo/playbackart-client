export const ratingCoefficient = (ratings: number[]) => {
  const multiplier = (rating: number) => {
    switch (rating) {
      case 10:
        return 7
      case 9:
        return 2
      default:
        return 0
    }
  }
  return ratings.reduce((acc, cur) => acc + multiplier(cur), 1)
}
