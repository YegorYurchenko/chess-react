import { createSlice } from '@reduxjs/toolkit'
import { EPieceColors } from '../../extends/enums'

export interface IColorState {
    color: EPieceColors,
    currentColor: EPieceColors
}

const initialState: IColorState = {
    color: EPieceColors.no,
    currentColor: EPieceColors.no
}

export const colorSlice = createSlice({
    name: 'color',
    initialState,
    reducers: {
        setMainWhiteColor: (state) => {
            state.color = EPieceColors.white
            state.currentColor = EPieceColors.white
        },
        setMainBlackColor: (state) => {
            state.color = EPieceColors.black
            state.currentColor = EPieceColors.black
        },
        resetColor: (state) => {
            state.color = EPieceColors.no
            state.currentColor = EPieceColors.no
        }
    }
})

export const { setMainWhiteColor, setMainBlackColor, resetColor } = colorSlice.actions

export default colorSlice.reducer
