import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './i18n'
import './index.css'

// 导入mocks
import './src/mocks/mockFetch.js'
// import './src/mocks/mockAxios.js'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>,
)
