import { FC, memo } from 'react'

interface IChessBoardItem {
    field: string
}

/** Поле шахматной доски */
const ChessBoardItem: FC<IChessBoardItem> = ({ field }) => {
    return (
        <li className="chess-board__item" data-position={field}>
            {field}
        </li>
    )
}

export default memo(ChessBoardItem)
