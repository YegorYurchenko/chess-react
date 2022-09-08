import { FC } from 'react'
import ChessBoard from '../../components/chess-board/chess-board'
import ExitGame from '../../components/exit-game/exit-game'
import Sound from '../../components/sound/sound'

/** Страница игры */
const PlayPage: FC = () => {

    return (
        <div className="play-page">
            <ExitGame />
            <Sound />
            <ChessBoard />
        </div>
    )
}

export default PlayPage
