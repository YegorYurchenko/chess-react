import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import PlayPage from '../../pages/play/play-page'
import StartPage from '../../pages/start/start-page'
import { RootState } from '../../redux/store'
import { isMobile } from '../../utils'

/** */
const App: React.FC = () => {

    const gameIsActive = useSelector((state: RootState) => state.gameSlice.active)

    if (isMobile()) {
        return (
            <div className="app">
                <h1 className="app__phone-title">К сожалению, на телефоне приложение не работает</h1>
            </div>
        )
    }

    return (
        <div className="app">
            <Router>
                <Routes>
                    <Route path="/" element={<StartPage />} />
                    <Route path="/play" element={gameIsActive ? <PlayPage /> : <Navigate replace to="/" />} />
                    <Route path="*" element={<Navigate replace to="/" />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App
