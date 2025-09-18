// import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useAtom } from 'jotai/index'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter } from 'react-router-dom'
// import {FirstPage} from './Pages/FirstPage'
import { Player } from './components/Bottom'
import { GlobalAudio } from './components/GlobalAudio'
import { Lyrics } from './components/Lyrics'
import { TopList } from './components/TopList'
import { Router } from './Router'
import { ShowLyrics } from './store/store.ts'
import './App.css'

const queryClient = new QueryClient()

function App() {
    const [showLyrics] = useAtom(ShowLyrics)
    return (
        <QueryClientProvider client={queryClient}>
            <GlobalAudio />
            <BrowserRouter>
                <div id="app">
                    <TopList></TopList>
                    <main>
                        <Router></Router>
                    </main>
                    {/* <Player></Player> */}
                    {showLyrics && <Lyrics></Lyrics>}
                </div>
            </BrowserRouter>
            <Player></Player>
            {/* <ReactQueryDevtools /> */}
        </QueryClientProvider>
    )
}

export default App
