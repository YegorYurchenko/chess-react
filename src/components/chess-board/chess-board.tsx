import { FC, useRef } from 'react'
import { useSelector } from 'react-redux'
import { EFigureColors } from '../../extends/enums'
import { RootState } from '../../redux/store'
import { getResultChessBoard } from '../../utils/getChessBoard'
import ChessBoardFields from '../chess-board-fields/chess-board-fields'
import ChessBoardItem from '../chess-board-item/chess-board-item'

/** Шахматная доска */
const ChessBoard: FC = () => {

    const selectedColor = useSelector((state: RootState) => state.colorSlice.color)
    const reverse = selectedColor === EFigureColors.black
    const chessBoard = useRef<string[][]>(getResultChessBoard(reverse))

    // Классы
    const chessBoardClasses = `chess-board__list ${reverse ? classes.reverse : ''}`

    return (
        <div className="chess-board">
            <ul className={chessBoardClasses}>
                {chessBoard.current.map(column => {
                    return column.map(field => <ChessBoardItem key={field} field={field} />)
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
