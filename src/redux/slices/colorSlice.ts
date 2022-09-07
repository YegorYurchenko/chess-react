import { createSlice } from '@reduxjs/toolkit'
import { EFigureColors } from '../../extends/enums'

export interface IColorState {
    color: EFigureColors,
    currentColor: EFigureColors
}

const initialState: IColorState = {
    color: EFigureColors.no,
    currentColor: EFigureColors.no
}

export const colorSlice = createSlice({
    name: 'color',
    initialState,
    reducers: {
        setMainWhiteColor: (state) => {
            state.color = EFigureColors.white
            state.currentColor = EFigureColors.white
        },
        setMainBlackColor: (state) => {
            state.color = EFigureColors.black
            state.currentColor = EFigureColors.black
        },
        resetColor: (state) => {
            state.color = EFigureColors.no
            state.currentColor = EFigureColors.no
        }
    }
})

export const { setMainWhiteColor, setMainBlackColor, resetColor } = colorSlice.actions

export default colorSlice.reducer
