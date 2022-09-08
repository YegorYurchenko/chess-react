import { EChessBoardPieces, EPieceColors } from '../extends/enums'
import { Bishop, ChessPiece, King, Knight, Pawn, Queen, Rook } from './chessPieces'

export interface IChessPieces {
    chessPosition: string,
    chessPiece: ChessPiece | null
}

/** Общий класс доски */
export class ChessBoardClass {

    static chessBoardArray: IChessPieces[][]
    static chessBoardObject = {} // { 'A1': Rook, ... }

    /** @constructor */
    constructor(reverse = false) {
        ChessBoardClass.chessBoardArray = getResultChessBoard(reverse)

        const chessBoardObjectTemporary = ChessBoardClass.chessBoardArray.reduce((curr, next) => curr.concat(next))
        chessBoardObjectTemporary.forEach(field => ChessBoardClass.chessBoardObject[field.chessPosition] = field.chessPiece)

    }
}

/**
 * Получаем шахматную доску с начальным расположением фигур
 */
const getResultChessBoard = (reverse = false): IChessPieces[][] => {

    const result: IChessPieces[][] = []

    const columnChessPositions: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
    const rowChessPositions: number[] = Array.from(Array(8).keys())

    columnChessPositions.forEach((columnValue, columnIdx) => {
        result.push([])

        rowChessPositions.forEach(rowValue => {
            result[columnIdx].push({
                chessPosition: `${columnValue}${rowValue + 1}`,
                chessPiece: null
            })
        })
    })

    reverse && result.reverse()

    return insertChessPieces(result, reverse)
}

/** Добавим фигуры на доску (начальная позиция) */
const insertChessPieces = (chessBoard: IChessPieces[][], reverse: boolean): IChessPieces[][] => {

    // Белые пешки
    chessBoard[1].map((_, idx) => {
        chessBoard[idx][1].chessPiece = new Pawn(EChessBoardPieces.pawn, EPieceColors.white, chessBoard[idx][1].chessPosition)
    })

    // Чёрные пешки
    chessBoard[6].map((_, idx) => {
        chessBoard[idx][6].chessPiece = new Pawn(EChessBoardPieces.pawn, EPieceColors.black, chessBoard[idx][6].chessPosition)
    });

    // Белые Кони
    [1, 6].map(knightIdx => {
        chessBoard[knightIdx][0].chessPiece = new Knight(EChessBoardPieces.knight, EPieceColors.white, chessBoard[knightIdx][0].chessPosition)
    });

    // Чёрные Кони
    [1, 6].map(knightIdx => {
        chessBoard[knightIdx][7].chessPiece = new Knight(EChessBoardPieces.knight, EPieceColors.black, chessBoard[knightIdx][7].chessPosition)
    });

    // Белые Офицеры
    [2, 5].map(bishopIdx => {
        chessBoard[bishopIdx][0].chessPiece = new Bishop(EChessBoardPieces.bishop, EPieceColors.white, chessBoard[bishopIdx][0].chessPosition)
    });

    // Чёрные Офицеры
    [2, 5].map(bishopIdx => {
        chessBoard[bishopIdx][7].chessPiece = new Bishop(EChessBoardPieces.bishop, EPieceColors.black, chessBoard[bishopIdx][7].chessPosition)
    });

    // Белые Ладьи
    [0, 7].map(rookIdx => {
        chessBoard[rookIdx][0].chessPiece = new Rook(EChessBoardPieces.rook, EPieceColors.white, chessBoard[rookIdx][0].chessPosition)
    });

    // Чёрные Ладьи
    [0, 7].map(rookIdx => {
        chessBoard[rookIdx][7].chessPiece = new Rook(EChessBoardPieces.rook, EPieceColors.black, chessBoard[rookIdx][7].chessPosition)
    })

    // Белый Король / Ферзь
    chessBoard[3][0].chessPiece = reverse
        ? new King(EChessBoardPieces.king, EPieceColors.white, chessBoard[3][0].chessPosition)
        : new Queen(EChessBoardPieces.queen, EPieceColors.white, chessBoard[3][0].chessPosition)

    // Чёрный Король / Ферзь
    chessBoard[3][7].chessPiece = reverse
        ? new King(EChessBoardPieces.king, EPieceColors.black, chessBoard[3][7].chessPosition)
        : new Queen(EChessBoardPieces.queen, EPieceColors.black, chessBoard[3][7].chessPosition)

    // Белый Ферзь / Король
    chessBoard[4][0].chessPiece = reverse
        ? new Queen(EChessBoardPieces.queen, EPieceColors.white, chessBoard[4][0].chessPosition)
        : new King(EChessBoardPieces.king, EPieceColors.white, chessBoard[4][0].chessPosition)

    // Чёрный Ферзь / Король
    chessBoard[4][7].chessPiece = reverse
        ? new Queen(EChessBoardPieces.queen, EPieceColors.black, chessBoard[4][7].chessPosition)
        : new King(EChessBoardPieces.king, EPieceColors.black, chessBoard[4][7].chessPosition)

    return chessBoard
}
