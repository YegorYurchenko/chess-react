import { configureStore } from '@reduxjs/toolkit'
import colorSlice from './slices/colorSlice'
import gameSlice from './slices/gameSlice'

export const store = configureStore({
    reducer: {
        colorSlice,
        gameSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
