/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { EPieceColors } from '../../extends/enums'
import { setMainWhiteColor, setMainBlackColor } from '../../redux/slices/colorSlice'
import { activateGame } from '../../redux/slices/gameSlice'
import { RootState } from '../../redux/store'

/** Начальная страница */
const StartPage: FC = () => {

    const gameIsActive = useSelector((state: RootState) => state.gameSlice.active)
    const selectedColor = useSelector((state: RootState) => state.colorSlice.color)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (gameIsActive) {
            return navigate('/play')
        }
    }, [gameIsActive])

    // Если цвет выбран, то активна соответствующая кнопка
    const whiteBtnClasses = `start-page__btn start-page__btn_white ${selectedColor === EPieceColors.white ? classes.active : ''}`
    const blackBtnClasses = `start-page__btn start-page__btn_black ${selectedColor === EPieceColors.black ? classes.active : ''}`

    // Если цвет выбран, то кнопка Submit активна
    const submitBtnClasses = `start-page__submit ${selectedColor ? classes.active : ''}`

    return (
        <div className="start-page">
            <h1 className="start-page__title">Выберите цвет фигур</h1>
            <div className="start-page__color-btns">
                <button
                    type="button"
                    className={whiteBtnClasses}
                    onClick={() => dispatch(setMainWhiteColor())}>
                    Белые
                </button>
                <button
                    type="button"
                    className={blackBtnClasses}
                    onClick={() => dispatch(setMainBlackColor())}>
                    Чёрные
                </button>
            </div>
            <button
                className={submitBtnClasses}
                onClick={() => dispatch(activateGame())}>
                Подтвердить
            </button>
        </div>
    )
}

const classes = {
    active: 'active'
}

export default StartPage
