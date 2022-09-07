import { createSlice } from '@reduxjs/toolkit'

export interface IGameState {
    active: boolean
}

const initialState: IGameState = {
    active: false
}

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        activateGame: (state) => {
            state.active = true
        },
        deactivateGame: (state) => {
            state.active = false
        }
    }
})

export const { activateGame, deactivateGame } = gameSlice.actions

export default gameSlice.reducer
