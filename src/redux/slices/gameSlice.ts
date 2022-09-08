import { createSlice } from '@reduxjs/toolkit'

export interface IGameState {
    active: boolean,
    sound: boolean
}

const initialState: IGameState = {
    active: false,
    sound: true
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
        },
        activateSound: (state) => {
            state.sound = true
        },
        deactivateSound: (state) => {
            state.sound = false
        }
    }
})

export const { activateGame, deactivateGame, activateSound, deactivateSound } = gameSlice.actions

export default gameSlice.reducer
