/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState, MouseEvent, ReactElement } from 'react'
import useSound from 'use-sound'
import { useSelector } from 'react-redux'
import { EPieceColors } from '../../extends/enums'
import { RootState } from '../../redux/store'
import ChessBoardFields from '../chess-board-fields/chess-board-fields'
import ChessBoardItem from '../chess-board-item/chess-board-item'
import { ChessBoardClass, IChessPiecesObject } from '../../models/chessBoard'

/** Шахматная доска */
const ChessBoard: FC = () => {

    const selectedMainColor = useSelector((state: RootState) => state.colorSlice.color)
    const [reverse, setReverse] = useState<boolean>(selectedMainColor === EPieceColors.black)

    const [chessBoard, setChessBoard] = useState<IChessPiecesObject>({})
    const [selectedPiecePosition, setSelectedPiecePosition] = useState<string>('') // Позиция выбранной фигуры
    const [currentColor, setCurrentColor] = useState<EPieceColors>(selectedMainColor) // Цвет активных фигур в текущем ходе
    const [availableSpaces, setAvailableSpaces] = useState<string[]>([]) // Список доступных ходов для выбранной фигуры

    const soundIsActive = useSelector((state: RootState) => state.gameSlice.sound)
    const [chessPieceMoveSound] = useSound(
        '/sounds/chessMove.mp3',
        { volume: 1 }
    )

    useEffect(() => {
        (() => new ChessBoardClass(reverse))()

        setChessBoard(ChessBoardClass.chessBoardObject)
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

            ChessBoardClass.chessBoardObject[selectedPiecePosition]?.move(selectedChessPiecePosition)

            soundIsActive && chessPieceMoveSound()

            setSelectedPiecePosition('')
            setAvailableSpaces([])
            setCurrentColor(currentColor === EPieceColors.white ? EPieceColors.black : EPieceColors.white)
            setReverse(! reverse)
        }
    }

    /** Создание игрового поля */
    const createChessBoard = (): ReactElement[] => {
        const fields: ReactElement[] = []

        for (const position in chessBoard) {
            fields.push(
                <ChessBoardItem
                    key={position}
                    position={position}
                    chessPiece={chessBoard[position]}
                    active={selectedPiecePosition === position && currentColor === chessBoard[position]?.color}
                    availableSpace={availableSpaces.includes(position)}
                />
            )
        }

        return fields
    }

    // Стили
    const chessBoardClasses = `chess-board__list ${selectedMainColor === EPieceColors.black ? classes.reverse : ''}`

    return (
        <div className="chess-board">
            <ul className={chessBoardClasses} onClick={onChessPieceListClick}>
                { createChessBoard() }
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
