import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activateSound, deactivateSound } from '../../redux/slices/gameSlice'
import { RootState } from '../../redux/store'

/** Компонент включения / выключения звука */
const Sound: FC = () => {

    const sound = useSelector((state: RootState) => state.gameSlice.sound)
    const dispatch = useDispatch()

    /** Toggle sound */
    const onSetSoundHandler = (): void => {
        sound
            ? dispatch(deactivateSound())
            : dispatch(activateSound())
    }

    return (
        <button
            className="sound"
            onClick={onSetSoundHandler}
        >
            <img className="sound__img" src={`/svg/sound-${sound ? 'on' : 'off'}.svg`} alt={`Звук ${sound ? 'включён' : 'выключен'}`} />
        </button>
    )
}

export default Sound
