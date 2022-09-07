import { EChessBoardPieces, EFigureColors } from '../extends/enums'

export interface IChessPieces {
    chessPosition: string,
    chessPiece: EChessBoardPieces,
    chessPieceColor: EFigureColors
}

/**
 * Получаем шахматную доску с начальным расположением фигур
 */
export const getResultChessBoard = (reverse = false): IChessPieces[][] => {

    const result: IChessPieces[][] = []

    const columnChessPositions: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
    const rowChessPositions: number[] = Array.from(Array(8).keys())

    columnChessPositions.forEach((columnValue, columnIdx) => {
        result.push([])

        rowChessPositions.forEach(rowValue => {
            result[columnIdx].push({
                chessPosition: `${columnValue}${rowValue + 1}`,
                chessPiece: EChessBoardPieces.no,
                chessPieceColor: EFigureColors.no
            })
        })
    })

    reverse && result.reverse()

    return insertChessPieces(result, reverse)
}

/** Добавим фигуры на доску (начальная позиция) */
const insertChessPieces = (chessBoard: IChessPieces[][], reverse: boolean): IChessPieces[][] => {

    // Пешки для белых фигур
    chessBoard[1].map((_, idx) => {
        chessBoard[idx][1].chessPiece = EChessBoardPieces.pawn
        chessBoard[idx][1].chessPieceColor = EFigureColors.white
    })

    // Пешки для чёрных фигур
    chessBoard[6].map((_, idx) => {
        chessBoard[idx][6].chessPiece = EChessBoardPieces.pawn
        chessBoard[idx][6].chessPieceColor = EFigureColors.black
    });

    // Белые Ладьи
    [chessBoard[0][0], chessBoard[7][0]].map(rook => {
        rook.chessPiece = EChessBoardPieces.rook
        rook.chessPieceColor = EFigureColors.white
    });

    // Чёрные Ладьи
    [chessBoard[0][7], chessBoard[7][7]].map(rook => {
        rook.chessPiece = EChessBoardPieces.rook
        rook.chessPieceColor = EFigureColors.black
    });

    // Белые Кони
    [chessBoard[1][0], chessBoard[6][0]].map(knight => {
        knight.chessPiece = EChessBoardPieces.knight
        knight.chessPieceColor = EFigureColors.white
    });

    // Чёрные Кони
    [chessBoard[1][7], chessBoard[6][7]].map(knight => {
        knight.chessPiece = EChessBoardPieces.knight
        knight.chessPieceColor = EFigureColors.black
    });

    // Белые Слоны
    [chessBoard[2][0], chessBoard[5][0]].map(bishop => {
        bishop.chessPiece = EChessBoardPieces.bishop
        bishop.chessPieceColor = EFigureColors.white
    });

    // Чёрные Слоны
    [chessBoard[2][7], chessBoard[5][7]].map(bishop => {
        bishop.chessPiece = EChessBoardPieces.bishop
        bishop.chessPieceColor = EFigureColors.black
    })

    // Белый Король / Ферзь
    chessBoard[3][0].chessPiece = reverse ? EChessBoardPieces.king : EChessBoardPieces.queen
    chessBoard[3][0].chessPieceColor = EFigureColors.white

    // Чёрный Король / Ферзь
    chessBoard[3][7].chessPiece = reverse ? EChessBoardPieces.king : EChessBoardPieces.queen
    chessBoard[3][7].chessPieceColor = EFigureColors.black

    // Белый Король / Ферзь
    chessBoard[4][0].chessPiece = reverse ? EChessBoardPieces.queen : EChessBoardPieces.king
    chessBoard[4][0].chessPieceColor = EFigureColors.white

    // Чёрный Король / Ферзь
    chessBoard[4][7].chessPiece = reverse ? EChessBoardPieces.queen : EChessBoardPieces.king
    chessBoard[4][7].chessPieceColor = EFigureColors.black

    return chessBoard
}
