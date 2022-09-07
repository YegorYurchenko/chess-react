/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { EFigureColors } from '../../extends/enums'
import { setBlackColor, setWhiteColor } from '../../redux/slices/colorSlice'
import { activateGame } from '../../redux/slices/gameSlice'
import { RootState } from '../../redux/store'

/** */
const StartPage: React.FC = () => {

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
    const whiteBtnClasses = ['start-page__btn start-page__btn_white']
    const blackBtnClasses = ['start-page__btn start-page__btn_black']

    switch (selectedColor) {
        case EFigureColors.white:
            whiteBtnClasses.push(classes.active)
            break
        case EFigureColors.black:
            blackBtnClasses.push(classes.active)
            break
    }

    // Если цвет выбран, то кнопка Submit активна
    const submitBtnClasses = ['start-page__submit']
    selectedColor && submitBtnClasses.push(classes.active)

    return (
        <div className="start-page">
            <h1 className="start-page__title">Выберите цвет фигур</h1>
            <div className="start-page__color-btns">
                <button
                    type="button"
                    className={whiteBtnClasses.join(' ')}
                    onClick={() => dispatch(setWhiteColor())}>
                    Белые
                </button>
                <button
                    type="button"
                    className={blackBtnClasses.join(' ')}
                    onClick={() => dispatch(setBlackColor())}>
                    Чёрные
                </button>
            </div>
            <button
                className={submitBtnClasses.join(' ')}
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
