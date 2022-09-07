/**
 * Получаем шахматную доску с начальным расположением фигур
 */
export const getResultChessBoard = (reverse = false): string[][] => {

    const result: string[][] = []

    const columnChessPositions: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
    const rowChessPositions: number[] = Array.from(Array(8).keys())

    columnChessPositions.forEach((columnValue, columnIdx) => {
        result.push([])

        rowChessPositions.forEach(rowValue => {
            result[columnIdx].push(`${columnValue}${rowValue + 1}`)
        })
    })

    return reverse ? result.reverse() : result
}
