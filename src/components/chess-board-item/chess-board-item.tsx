import { FC, memo } from 'react'
import { ChessPiece } from '../../models/chessPieces'

interface IChessPiece {
    position: string,
    chessPiece: ChessPiece | null,
    active: boolean,
    availableSpace: boolean
}

/** Поле шахматной доски */
const ChessBoardItem: FC<IChessPiece> = ({ position, chessPiece, active, availableSpace }) => {
    return (
        <li className={`chess-board__item ${active ? classes.active : ''}`} data-position={position}>

            {chessPiece?.type &&
                <img src={`/images/${chessPiece.color}/${chessPiece.type}.png`}
                    alt={chessPiece.type}
                    data-position={chessPiece.position}
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
