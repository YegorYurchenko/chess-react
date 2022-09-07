import { FC } from 'react'
import ChessBoard from '../../components/chess-board/chess-board'
import ExitGame from '../../components/exit-game/exit-game'

/** Страница игры */
const PlayPage: FC = () => {

    return (
        <div className="play-page">
            <ExitGame />
            <ChessBoard />
        </div>
    )
}

export default PlayPage
