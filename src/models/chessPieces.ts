import { EChessBoardPieces, EChessPieceFields, EPieceColors } from '../extends/enums'
import { ChessBoardClass } from './chessBoard'

interface IChessPiece {
    getAvailableSpace(reverse: boolean): string[]
}

/** Общий класс фигур */
export abstract class ChessPiece implements IChessPiece {

    protected _type: EChessBoardPieces
    protected _color: EPieceColors
    protected _position: string

    /** @constructor */
    constructor(type: EChessBoardPieces, color: EPieceColors, position: string) {
        this._type = type
        this._color = color
        this._position = position
    }

    /** Type getter */
    get type(): EChessBoardPieces {
        return this._type
    }

    /** Color getter */
    get color(): EPieceColors {
        return this._color
    }

    /** Position getter */
    get position(): string {
        return this._position
    }

    /** Position setter */
    set position(position) {
        this._position = position
    }

    /** Получить данные поля */
    getNewField(column: string, row: string, addColumn: number, addRow: number): [ChessPiece, string] {
        const newColumn = EChessPieceFields[EChessPieceFields[column] + addColumn]
        const newRow = Number(row) + addRow

        const newPiecePosition = `${newColumn}${newRow}`
        const newPiece = ChessBoardClass.chessBoardObject[newPiecePosition]

        return [newPiece, newPiecePosition]
    }

    /** Делаем ход */
    move(newPosition: string): void {

        ChessBoardClass.chessBoardArray.forEach(column => {
            column.forEach(row => {
                switch (row.chessPosition) {
                    case newPosition:
                        row.chessPiece = this
                        break
                    case this.position:
                        row.chessPiece = null
                }
            })
        })

        ChessBoardClass.chessBoardObject[newPosition] = this
        ChessBoardClass.chessBoardObject[this.position] = null

        this.position = newPosition
    }

    /** Получить доступные поля для хода */
    abstract getAvailableSpace(reverse: boolean): string[]
}

/** Пешка */
export class Pawn extends ChessPiece {

    protected _hasMoved = false

    /** */
    getAvailableSpace(reverse: boolean): string[] {

        const result: string[] = []

        const [column, row] = this.position.split('');

        // Свободное поле
        [[0, 2], [0, 1]].forEach(([addColumn, addRow], idx) => {
            if (this._hasMoved && ! idx) return

            const [piece, newPiecePosition] = this.getNewField(column, row, reverse ? -addColumn : addColumn, reverse ? -addRow : addRow)

            if (piece !== undefined && ! piece) result.push(newPiecePosition)
        });

        // Атака противника
        [[-1, 1], [1, 1]].forEach(([addColumn, addRow]) => {

            const [piece, newPiecePosition] = this.getNewField(column, row, reverse ? -addColumn : addColumn, reverse ? -addRow : addRow)

            if (piece && piece.color !== this.color) result.push(newPiecePosition)
        })

        return result
    }

    /** Делаем ход */
    move(newPosition: string): void {
        super.move(newPosition)

        this._hasMoved = true
    }
}

/** Конь */
export class Knight extends ChessPiece {

    /** */
    getAvailableSpace(): string[] {
        return ['']
    }
}

/** Офицер */
export class Bishop extends ChessPiece {

    /** */
    getAvailableSpace(): string[] {
        return ['']
    }
}

/** Пушка */
export class Rook extends ChessPiece {

    /** */
    getAvailableSpace(): string[] {
        return ['']
    }
}

/** Королева */
export class Queen extends ChessPiece {

    /** */
    getAvailableSpace(): string[] {
        return ['']
    }
}

/** Король */
export class King extends ChessPiece {

    /** */
    getAvailableSpace(): string[] {
        return ['']
    }
}
