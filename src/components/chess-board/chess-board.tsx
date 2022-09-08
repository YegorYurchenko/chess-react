/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState, MouseEvent } from 'react'
import { useSelector } from 'react-redux'
import { EChessBoardPieces, EPieceColors } from '../../extends/enums'
import { RootState } from '../../redux/store'
import ChessBoardFields from '../chess-board-fields/chess-board-fields'
import ChessBoardItem from '../chess-board-item/chess-board-item'
import { ChessBoardClass, IChessPieces } from '../../models/chessBoard'

/** Шахматная доска */
const ChessBoard: FC = () => {

    const selectedMainColor = useSelector((state: RootState) => state.colorSlice.color)
    const [reverse] = useState<boolean>(selectedMainColor === EPieceColors.black)

    const [chessBoard, setChessBoard] = useState<IChessPieces[][]>()
    const [selectedPiecePosition, setSelectedPiecePosition] = useState<string>('')
    const [selectedColor] = useState<EPieceColors>(selectedMainColor)

    useEffect(() => {
        (() => new ChessBoardClass(reverse))()

        setChessBoard(ChessBoardClass.chessBoardArray)
    }, [])

    /** Обрабатываем нажатие на шахматную доску */
    const onChessPieceListClick = (e: MouseEvent): void => {
        const selectedChessPiece = e.target as Element

        // Позиция выбранной фигуры
        const selectedChessPiecePosition = selectedChessPiece.getAttribute('data-position')

        if (! selectedChessPiecePosition) return

        // Выбранная фигура
        const currentSelectedPiece = ChessBoardClass.chessBoardObject[selectedChessPiecePosition]
        if (currentSelectedPiece && selectedColor === currentSelectedPiece.color) {
            selectedPiecePosition === currentSelectedPiece.position
                ? setSelectedPiecePosition('')
                : setSelectedPiecePosition(currentSelectedPiece.position)
        }
    }

    // Стили
    const chessBoardClasses = `chess-board__list ${reverse ? classes.reverse : ''}`

    return (
        <div className="chess-board">
            <ul className={chessBoardClasses} onClick={onChessPieceListClick}>
                {chessBoard?.map(column => {
                    return column.map(field => (
                        <ChessBoardItem
                            key={field.chessPosition}
                            chessPosition={field.chessPiece?.position || field.chessPosition}
                            chessPiece={field.chessPiece?.type || EChessBoardPieces.no}
                            chessPieceColor={field.chessPiece?.color || EPieceColors.no}
                            active={selectedPiecePosition === field.chessPosition && selectedColor === field.chessPiece?.color}
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
