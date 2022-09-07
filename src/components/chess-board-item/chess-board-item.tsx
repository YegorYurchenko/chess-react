import { FC, memo } from 'react'
import { IChessPieces } from '../../utils/getChessBoard'

/** Поле шахматной доски */
const ChessBoardItem: FC<IChessPieces> = ({ chessPosition, chessPiece, chessPieceColor }) => {
    return (
        <li className="chess-board__item"
            data-position={chessPosition}
            data-color={chessPieceColor}
            data-piece={chessPiece}>

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
