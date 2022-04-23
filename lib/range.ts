const range = (start: number, end: number): number[] => {
  return Array(end - start)
    .fill(0)
    .map((_d, i) => i + start)
}

export default range
