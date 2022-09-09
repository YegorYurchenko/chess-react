import { FC, memo } from 'react'

interface IChessBoardFields {
    reverse: boolean
}

/** Поля шахматной доски */
const ChessBoardFields: FC<IChessBoardFields> = ({ reverse }) => {

    // Стили
    const chessBoardColumnClasses = `chess-board__column ${reverse ? classes.reverse : ''}`
    const chessBoardRowClasses = `chess-board__row ${reverse ? classes.reverse : ''}`

    return (
        <>
            <span className={chessBoardColumnClasses}>
                {Array.from(Array(8).keys()).map(item => <span key={`column-${item + 1}`} className="chess-board__column-item">{item + 1}</span>)}
            </span>
            <span className={chessBoardRowClasses}>
                {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map(item => <span key={`row-${item}`} className="chess-board__row-item">{item}</span>)}
            </span>
        </>
    )
}

const classes = {
    reverse: 'reverse'
}

export default memo(ChessBoardFields)
