export const computeItemsQuery = ({
  status,
  routeQuery,
  queryFilters,
  filters,
  sort,
}: {
  status: string
  routeQuery: any
  queryFilters: any
  filters: any
  sort: any
}) => ({
  userId: queryFilters.userId,
  status,
  ...(filters.status.length && { 'parts.status': { $in: filters.status } }),
  ...(routeQuery.type && { type: routeQuery.type }),
  ...((queryFilters.search ||
    queryFilters.selectedRatings.length ||
    queryFilters.selectedDevelopers.length) && {
    $and: [
      ...(queryFilters.search && [
        {
          $or: [
            { name: { $regex: queryFilters.search, $options: 'i' } },
            {
              'parts.name': {
                $regex: queryFilters.search,
                $options: 'i',
              },
            },
          ],
        },
      ]),
      ...(queryFilters.selectedRatings.length
        ? [
            {
              $or: [
                { rating: { $in: queryFilters.selectedRatings } },
                { 'parts.rating': { $in: queryFilters.selectedRatings } },
              ],
            },
          ]
        : []),
      ...(queryFilters.selectedDevelopers.length
        ? [
            {
              $or: [
                {
                  developers: {
                    [queryFilters.selectors.developers]:
                      queryFilters.selectedDevelopers,
                  },
                },
                {
                  'parts.developers': {
                    [queryFilters.selectors.developers]:
                      queryFilters.selectedDevelopers,
                  },
                },
              ],
            },
          ]
        : []),
    ],
  }),
  ...(queryFilters.selectedRestrictions.length && {
    restriction: { $in: queryFilters.selectedRestrictions },
  }),
  ...(queryFilters.selectedGenres.length && {
    genres: {
      [queryFilters.selectors.genres]: queryFilters.selectedGenres,
    },
  }),
  ...(queryFilters.selectedCategories.length && {
    categories: {
      $in: queryFilters.selectedCategories, // selector?
    },
  }),
  ...(queryFilters.selectedFranchises.length && {
    franchise: { $in: queryFilters.selectedFranchises },
  }),
  $sort: sort,
  $limit: 20,
})
