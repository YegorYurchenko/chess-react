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
    const [reverse, setReverse] = useState<boolean>(selectedMainColor === EPieceColors.black)

    const [chessBoard, setChessBoard] = useState<IChessPieces[][]>()
    const [selectedPiecePosition, setSelectedPiecePosition] = useState<string>('') // Позиция выбранной фигуры
    const [currentColor, setCurrentColor] = useState<EPieceColors>(selectedMainColor) // Цвет активных фигур в текущем ходе
    const [availableSpaces, setAvailableSpaces] = useState<string[]>([]) // Список доступных ходов для выбранной фигуры

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

        if (selectedPiecePosition === selectedChessPiecePosition) { // Клик на ту же фигуру ==> отменяем активность фигуры
            setSelectedPiecePosition('')
            setAvailableSpaces([])

        } else if (currentSelectedPiece && currentColor === currentSelectedPiece.color) { // Выбрана фигура

            selectedPiecePosition === currentSelectedPiece.position
                ? setSelectedPiecePosition('')
                : setSelectedPiecePosition(currentSelectedPiece.position)

            setAvailableSpaces(currentSelectedPiece.getAvailableSpace(reverse))

        } else if (availableSpaces.includes(selectedChessPiecePosition)) { // Делаем ход

            ChessBoardClass.chessBoardObject[selectedPiecePosition].move(selectedChessPiecePosition)

            setSelectedPiecePosition('')
            setAvailableSpaces([])
            setCurrentColor(currentColor === EPieceColors.white ? EPieceColors.black : EPieceColors.white)
            setReverse(! reverse)
        }
    }

    // Стили
    const chessBoardClasses = `chess-board__list ${selectedMainColor === EPieceColors.black ? classes.reverse : ''}`

    return (
        <div className="chess-board">
            <ul className={chessBoardClasses} onClick={onChessPieceListClick}>
                {chessBoard?.map(column => {
                    return column.map(field => (
                        <ChessBoardItem
                            key={field.chessPosition}
                            chessPosition={field.chessPosition}
                            chessPiece={field.chessPiece?.type || EChessBoardPieces.no}
                            chessPieceColor={field.chessPiece?.color || EPieceColors.no}
                            active={selectedPiecePosition === field.chessPosition && currentColor === field.chessPiece?.color}
                            availableSpace={availableSpaces.includes(field.chessPosition)}
                        />
                    ))
                })}
            </ul>

            <ChessBoardFields reverse={selectedMainColor === EPieceColors.black} />
        </div>
    )
}

const classes = {
    active: 'active',
    reverse: 'reverse'
}

export default ChessBoard
