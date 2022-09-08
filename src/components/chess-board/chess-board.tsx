/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { EChessBoardPieces, EFigureColors } from '../../extends/enums'
import { RootState } from '../../redux/store'
import ChessBoardFields from '../chess-board-fields/chess-board-fields'
import ChessBoardItem from '../chess-board-item/chess-board-item'
import { ChessBoardClass, IChessPieces } from '../../models/chessBoard'

/** Шахматная доска */
const ChessBoard: FC = () => {

    const selectedColor = useSelector((state: RootState) => state.colorSlice.color)
    const [reverse] = useState<boolean>(selectedColor === EFigureColors.black)
    const [chessBoard, setChessBoard] = useState <IChessPieces[][]>()

    useEffect(() => {
        (() => new ChessBoardClass(reverse))()

        setChessBoard(ChessBoardClass.chessBoard)
    }, [])

    // Стили
    const chessBoardClasses = `chess-board__list ${reverse ? classes.reverse : ''}`

    return (
        <div className="chess-board">
            <ul className={chessBoardClasses}>
                {chessBoard?.map(column => {
                    return column.map(field => (
                        <ChessBoardItem
                            key={field.chessPosition}
                            chessPosition={field.chessPiece?.position || field.chessPosition}
                            chessPiece={field.chessPiece?.type || EChessBoardPieces.no}
                            chessPieceColor={field.chessPiece?.color || EFigureColors.no}
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
