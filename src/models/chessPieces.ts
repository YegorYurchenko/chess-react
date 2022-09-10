import { EChessBoardPieces, EPieceColors } from '../extends/enums'
import { ChessBoardClass } from './chessBoard'

interface IChessPiece {
    move(newPosition: string): void,
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

    /** Делаем ход */
    move(newPosition: string): void {

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

        const result: string[] = [];

        // Свободное поле
        [[0, 2], [0, 1]].forEach(([addColumn, addRow], idx) => {
            if (this._hasMoved && ! idx) return

            const [piece, newPiecePosition] = ChessBoardClass.getNewField(this.position, reverse ? -addColumn : addColumn, reverse ? -addRow : addRow)

            if (piece !== undefined && ! piece) result.push(newPiecePosition)
        });

        // Атака противника
        [[-1, 1], [1, 1]].forEach(([addColumn, addRow]) => {

            const [piece, newPiecePosition] = ChessBoardClass.getNewField(this.position, reverse ? -addColumn : addColumn, reverse ? -addRow : addRow)

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
    getAvailableSpace(reverse: boolean): string[] {

        const result: string[] = [];

        // Свободное поле или атака
        [[-1, -2], [-1, 2], [-2, -1], [-2, 1], [1, -2], [1, 2], [2, -1], [2, 1]].forEach(([addColumn, addRow]) => {

            const [piece, newPiecePosition] = ChessBoardClass.getNewField(this.position, reverse ? -addColumn : addColumn, reverse ? -addRow : addRow)

            if ((piece !== undefined && ! piece) || (piece && piece.color !== this.color)) result.push(newPiecePosition)
        })

        return result
    }
}

/** Офицер */
export class Bishop extends ChessPiece {

    /** */
    getAvailableSpace(): string[] {

        // Свободное поле или атака
        return ChessBoardClass.getNewFields(this.position, this.color, [[-1, -1], [-1, 1], [1, -1], [1, 1]])

    }
}

/** Пушка */
export class Rook extends ChessPiece {

    /** */
    getAvailableSpace(): string[] {

        // Свободное поле или атака
        return ChessBoardClass.getNewFields(this.position, this.color, [[-1, 0], [1, 0], [0, -1], [0, 1]])
    }
}

/** Королева */
export class Queen extends ChessPiece {

    /** */
    getAvailableSpace(): string[] {

        const result: string[] = []

        result.push(...ChessBoardClass.getNewFields(this.position, this.color, [[-1, -1], [-1, 1], [1, -1], [1, 1]]))
        result.push(...ChessBoardClass.getNewFields(this.position, this.color, [[-1, 0], [1, 0], [0, -1], [0, 1]]))

        return result
    }
}

/** Король */
export class King extends ChessPiece {

    /** */
    getAvailableSpace(): string[] {

        const result: string[] = [];

        [[-1, -1], [-1, 1], [1, -1], [1, 1], [-1, 0], [1, 0], [0, -1], [0, 1]].forEach(([addColumn, addRow]) => {

            const [piece, newPiecePosition] = ChessBoardClass.getNewField(this.position, addColumn, addRow)

            if ((piece !== undefined && ! piece) || (piece && piece.color !== this.color)) {
                result.push(newPiecePosition)
            }
        })

        return result
    }
}
