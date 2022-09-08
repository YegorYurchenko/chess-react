import { EChessBoardPieces, EPieceColors } from '../extends/enums'

interface IChessPiece {
    getAvailableSpace(): string[]
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

    abstract getAvailableSpace(): string[]
}

/** Пешка */
export class Pawn extends ChessPiece {

    /** */
    getAvailableSpace(): string[] {
        return ['']
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
