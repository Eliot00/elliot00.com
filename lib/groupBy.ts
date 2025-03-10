const groupBy = <T, K extends PropertyKey>(list: T[], getKey: (item: T) => K) =>
  list.reduce(
    (previous, currentItem) => {
      const group = getKey(currentItem)
      if (!previous[group]) previous[group] = []
      previous[group].push(currentItem)
      return previous
    },
    {} as Record<K, T[]>
  )

export default groupBy
