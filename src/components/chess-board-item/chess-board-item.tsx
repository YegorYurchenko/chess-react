import { FC, memo } from 'react'
import { EChessBoardPieces, EPieceColors } from '../../extends/enums'

interface IChessPiece {
    chessPosition: string,
    chessPiece: EChessBoardPieces,
    chessPieceColor: EPieceColors,
    active: boolean,
    availableSpace: boolean
}

/** Поле шахматной доски */
const ChessBoardItem: FC<IChessPiece> = ({ chessPosition, chessPiece, chessPieceColor, active, availableSpace }) => {
    return (
        <li className={`chess-board__item ${active ? classes.active : ''}`} data-position={chessPosition}>

            {chessPiece &&
                <img src={`/images/${chessPieceColor}/${chessPiece}.png`}
                    alt={chessPiece}
                    data-position={chessPosition}
                    className="chess-board__item-piece-img"
                />
            }

            {
                availableSpace &&
                <span className="chess-board__item-possible"></span>
            }

        </li>
    )
}

const classes = {
    active: 'active'
}

export default memo(ChessBoardItem)
