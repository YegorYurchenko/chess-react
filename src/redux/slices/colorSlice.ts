import { createSlice } from '@reduxjs/toolkit'
import { EFigureColors } from '../../extends/enums'

export interface IColorState {
    color: EFigureColors
}

const initialState: IColorState = {
    color: EFigureColors.no
}

export const colorSlice = createSlice({
    name: 'color',
    initialState,
    reducers: {
        setWhiteColor: (state) => {
            state.color = EFigureColors.white
        },
        setBlackColor: (state) => {
            state.color = EFigureColors.black
        }
    }
})

export const { setWhiteColor, setBlackColor } = colorSlice.actions

export default colorSlice.reducer
