import { FC, memo } from 'react'
import { EChessBoardPieces, EFigureColors } from '../../extends/enums'

interface IChessPiece {
    chessPosition: string,
    chessPiece: EChessBoardPieces,
    chessPieceColor: EFigureColors
}

/** Поле шахматной доски */
const ChessBoardItem: FC<IChessPiece> = ({ chessPosition, chessPiece, chessPieceColor }) => {
    return (
        <li className="chess-board__item" data-position={chessPosition}>

            {chessPiece &&
                <img src={`/images/${chessPieceColor}/${chessPiece}.png`}
                    alt={chessPiece}
                    data-piece-name={chessPiece}
                    data-position={chessPosition}
                    className="chess-board__item-piece-img"
                />
            }

        </li>
    )
}

export default memo(ChessBoardItem)
