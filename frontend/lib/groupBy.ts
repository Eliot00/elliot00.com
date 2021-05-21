function groupBy<T>(arr: Array<T>, func: (x: T) => (string | number)): any {
    const groups = {};
    arr.forEach(item => {
        const group = func(item)
        groups[group] = groups[group] || []
        groups[group].push(item)
    })
    return groups
}

export default groupBy