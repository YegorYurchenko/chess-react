import { FC, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { EFigureColors } from '../../extends/enums'
import { RootState } from '../../redux/store'
import { getResultChessBoard, IChessPieces } from '../../utils/getChessBoard'
import ChessBoardFields from '../chess-board-fields/chess-board-fields'
import ChessBoardItem from '../chess-board-item/chess-board-item'

/** Шахматная доска */
const ChessBoard: FC = () => {

    const selectedColor = useSelector((state: RootState) => state.colorSlice.color)
    const [reverse] = useState<boolean>(selectedColor === EFigureColors.black)
    const chessBoard = useRef<IChessPieces[][]>(getResultChessBoard(reverse))

    // Стили
    const chessBoardClasses = `chess-board__list ${reverse ? classes.reverse : ''}`

    return (
        <div className="chess-board">
            <ul className={chessBoardClasses}>
                {chessBoard.current.map(column => {
                    return column.map(field => (
                        <ChessBoardItem
                            key={field.chessPosition}
                            chessPosition={field.chessPosition}
                            chessPiece={field.chessPiece}
                            chessPieceColor={field.chessPieceColor}
                        />
                    ))
                })}
            </ul>

            <ChessBoardFields reverse={reverse} />
        </div>
    )
}

const classes = {
    active: 'active',
    reverse: 'reverse'
}

export default ChessBoard
