import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { deactivateGame } from '../../redux/slices/gameSlice'
import { resetColor } from '../../redux/slices/colorSlice'

/** Выход из игры */
const ExitGame: FC = () => {

    const dispatch = useDispatch()

    /** */
    const onExitGameHandler = (): void => {
        if (confirm('Вы уверены, что хотите выйти из игры?')) {
            dispatch(resetColor())
            dispatch(deactivateGame())
        }
    }

    return (
        <span className="exit-game">
            <button
                className="exit-game__btn"
                onClick={onExitGameHandler}>
                Выйти из игры
            </button>
        </span>
    )
}

export default ExitGame
